import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";

export function DeleteProductModal({ refetch, children, product }: {
    refetch: () => void;
    children: React.ReactNode;
    product: Product 
}) {

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
      
      setLoading(true);

      await productService.deleteProductById({
        id: product.id,
        onSuccess: () => toast.success("Product deleted successfully!"),
        onFailure: (err) => toast.error(err)
      });

      setLoading(false);

      refetch();

      closeRef.current?.click();
  }



  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
          {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this product from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} ref={closeRef}>
             Cancel
           </AlertDialogCancel>
          <Button onClick={handleSubmit} disabled={loading}>
               {
                  loading ? (
                   <Loader className="animate-spin" />
                  ): "Continue"
              }
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
