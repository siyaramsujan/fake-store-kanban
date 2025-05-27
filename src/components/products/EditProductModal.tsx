import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { productService } from "@/services/productService"
import { Product } from "@/types/product"
import { Loader } from "lucide-react"
import {  FormEvent, ReactNode, useRef, useState } from "react"
import toast from "react-hot-toast"

export function EditProductModal({ refetch, children, product }: {
    refetch: () => void;
    children: ReactNode;
    product: Product
}) {

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
       title: product.title,
       price: product.price,
       description: product.description,
       category: product.category,
       image: product.image
  });

  const handleOnChange = (key: string, value: string | number) => {
       setData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
      
      e.preventDefault();
      setLoading(true);

      await productService.updateProductDetails({
        id: product.id,
        title: data.title,
        category: data.category,
        description: data.description,
        price: data.price,
        image: data.image,
        onSuccess: () => toast.success("Product updated successfully!"),
        onFailure: (err) => toast.error(err)
      });

      setLoading(false);

      refetch();

      setData({
         title: "",
         price: 0.00,
         description: "",
         category: "",
         image: ""
      })

      closeRef.current?.click();
  }

   

  return (
    <Dialog>
      <DialogTrigger asChild>
          {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              onChange={(e) => handleOnChange("title", e.target.value)}
              id="title"
              value={data.title}
              className=""
            />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              type="number"
              step="0.01"
              onChange={(e) => handleOnChange("price", parseFloat(e.target.value))}
              id="price"
              value={data.price}
              className=""
            />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              onChange={(e) => handleOnChange("description", e.target.value)}
              id="description"
              value={data.description}
              className=""
            />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              onChange={(e) => handleOnChange("category", e.target.value)}
              id="category"
              value={data.category}
              className=""
            />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              onChange={(e) => handleOnChange("image", e.target.value)}
              id="image"
              value={data.image}
              className=""
            />
          </div>
        </div>

        <DialogFooter>
          <Button disabled={loading} type="submit">
            {loading ? (
                <>
               <Loader className="animate-spin" />
                Saving
               </>
            ): "Save changes"}      
          </Button>

         <DialogClose
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:opacity-50 disabled:pointer-events-none  h-10 px-4 py-2"
          ref={closeRef}>
          Cancel changes
         </DialogClose>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
