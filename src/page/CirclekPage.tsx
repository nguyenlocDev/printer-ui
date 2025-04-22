/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NameStore } from "@/models/components/nameStore";
import ProductDialog from "@/models/components/productDigalog";
import { printReceipt } from "@/api/apiCircleK";

export default function CirclekPage() {
  const [infoStore, setInfoStore] = useState<
    { storeCode: string; nameStore: string; fullname: string; date: string }[]
  >([]);
  const [products, setProducts] = useState<
    {
      articleName: string;
      barcode: string;
      sellingPrice: number;
      quantity: number;
      type: string;
    }[]
  >([]);
  console.log(products);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const removeProduct = (barcode: string) => {
    setProducts(products.filter((product) => product.barcode !== barcode));
  };

  const updateQuantity = (barcode: string, quantity: number) => {
    if (quantity < 1) return;
    setProducts(
      products.map((product) =>
        product.barcode === barcode ? { ...product, quantity } : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce(
      (sum, product) => sum + product?.sellingPrice * product.quantity,
      0
    );
  };

  const printInvoice = () => {
    printReceipt({
      ...infoStore,
      terminal: "02",
      receipt: "115",
      barcode: "20250415-QQT",
      product: products,
      promotion: [],
      discount: [],
    });
  };
  console.log(infoStore);
  return (
    <Card className="w-full max-w-4xl mx-auto my-4 sm:my-6">
      <CardHeader>
        <CardTitle className="text-2xl">Tạo hóa đơn mới</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
        {/* Store, Date, Employee Selection */}
        <NameStore setInfoStore={setInfoStore}></NameStore>

        {/* Add Product Section */}
        <div className="space-y-3 sm:space-y-4 border p-3 sm:p-4 rounded-md">
          <h3 className="font-medium">Thêm sản phẩm</h3>

          <Button
            onClick={() => {
              setIsProductDialogOpen(true);
            }}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Product List */}
        <div className="border rounded-md overflow-hidden">
          <h3 className="font-medium p-3 sm:p-4 border-b">
            Danh sách sản phẩm
          </h3>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.barcode}>
                      <TableCell className="whitespace-nowrap">
                        {product.articleName}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateQuantity(
                                product.barcode,
                                product.quantity - 1
                              )
                            }
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">
                            {product.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateQuantity(
                                product.barcode,
                                product.quantity + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {product?.sellingPrice?.toLocaleString()} VNĐ
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {(
                          product?.sellingPrice * product.quantity
                        ).toLocaleString()}{" "}
                        VNĐ
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProduct(product.barcode)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Chưa có sản phẩm nào được thêm vào
            </div>
          )}
        </div>

        {/* Total */}
        {products.length > 0 && (
          <div className="flex justify-end text-lg font-medium">
            <span>Tổng cộng:</span>
            <span className="ml-2">
              {calculateTotal().toLocaleString()} VNĐ
            </span>
          </div>
        )}
        {/* Payment Method */}
        <div className="space-y-2">
          <Label>Phương thức thanh toán</Label>
          <RadioGroup
            onValueChange={(e) => {
              setInfoStore((prevState: any) => ({
                ...prevState,
                payment: {
                  type: e,
                  totalPay: calculateTotal(),
                  typeCard: "VISA",
                  refernceId: "111111111111",
                  apprCode: "111111",
                  TranID: "111111",
                  changeDue: 0,
                },
              }));
            }}
            // defaultValue="Cash"
            className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Cash" id="cash" />
              <Label htmlFor="cash">Tiền mặt</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Card" id="card" />
              <Label htmlFor="card">Thẻ tín dụng</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="VNPAY" id="transfer" />
              <Label htmlFor="transfer">VnPay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Momo" id="momo" />
              <Label htmlFor="momo">Ví MoMo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MomoQR" id="momoqr" />
              <Label htmlFor="momoqr">Ví MoMo qr</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-3 sm:p-6">
        <Button
          onClick={printInvoice}
          disabled={products.length === 0}
          className="w-full sm:w-auto"
        >
          <Printer className="h-4 w-4 mr-2" />
          In hóa đơn
        </Button>
      </CardFooter>
      <ProductDialog
        products={products}
        setProducts={setProducts}
        isProductDialogOpen={isProductDialogOpen}
        setIsProductDialogOpen={setIsProductDialogOpen}
      ></ProductDialog>
    </Card>
  );
}
