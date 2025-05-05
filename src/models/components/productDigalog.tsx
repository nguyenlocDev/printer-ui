/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProduct, searchProduct } from "@/api/apiCircleK";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const ProductDialog = ({
  products,
  setProducts,
  isProductDialogOpen,
  setIsProductDialogOpen,
}: any) => {
  const [listproduct, setListproduct] = useState<
    {
      _id: string;
      articleName: string;
      barcode: string;
      actualPrice: number;
    }[]
  >([]);

  const addProduct = (product: {
    _id: string;
    articleName: string;
    barcode: string;
    actualPrice: number;
  }) => {
    // Check if product already exists in the list
    const existingProduct = products.find(
      (p: any) => p.barcode === product.barcode
    );

    if (existingProduct) {
      // If product exists, increase quantity
      setProducts(
        products.map((p: any) =>
          p.barcode === product.barcode ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      // If product doesn't exist, add it with quantity 1
      setProducts([...products, { ...product, type: "product", quantity: 1 }]);
    }
  };

  const handleGetProduct = async () => {
    const data = await getProduct();
    setListproduct(data);
  };
  const debouncedSearch = debounce(async (searchTerm: string) => {
    const data = await searchProduct(searchTerm);
    setListproduct(data);
  }, 300);

  const handleSearchproduct = async (e: any) => {
    if (!e.target.value) {
      handleGetProduct();
      return;
    }

    debouncedSearch(e.target.value);
  };

  // Call handleGetProduct when the component moun
  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chọn sản phẩm</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={handleSearchproduct}
            placeholder="Tìm kiếm sản phẩm..."
            className="pl-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {listproduct.length > 0 ? (
            listproduct.map((product) => (
              <div
                key={product._id}
                className="flex items-center border rounded-md p-3"
              >
                <div className="flex-1">
                  <div className="font-medium">{product.articleName}</div>
                  <div className="text-sm text-muted-foreground">
                    {product?.actualPrice?.toLocaleString()} VNĐ
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    addProduct(product);
                    setIsProductDialogOpen(false);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm
                </Button>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              Không tìm thấy sản phẩm nào
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
