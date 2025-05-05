import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogRandomPrint() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Random Print</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="countBill" className="text-right">
              Số lượng hóa đơn
            </Label>
            <Input id="name" defaultValue="5" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="valueBill" className="text-right">
              Giá trị hóa đơn
            </Label>
            <Input id="username" defaultValue="500000" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Printer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
