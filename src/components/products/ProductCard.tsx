import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { EditProductModal } from "./EditProductModal";
import { DeleteProductModal } from "./DeleteProductModal";

export default function ProductCard({ product, refetch }: { product: Product, refetch: () => void }) {
  return (
    <Card className="w-full h-full flex flex-col relative overflow-hidden transition-all ease-in-out duration-150 hover:shadow-lg">
      {/* Dropdown in top-right corner */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40 flex flex-col items-start space-y-1 p-2"
            align="end"
          >

            <EditProductModal product={product} refetch={refetch}>
              <Button
                variant="ghost"
                className="h-8 w-full justify-start p-2"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit 
              </Button>
             </EditProductModal>

            <DeleteProductModal product={product} refetch={refetch}>
            <Button
              variant="ghost"
              className="h-8 w-full justify-start p-2"
            >
              <Trash2 color="red" className="mr-2 h-4 w-4" />
              Delete 
            </Button>
             </DeleteProductModal>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="flex items-center justify-center max-h-64 min-h-64 overflow-hidden">
        <img
          className="h-full w-full object-contain rounded-md"
          src={product.image}
          alt={product.title}
        />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1">
          <CardTitle className="text-base truncate">{product.title}</CardTitle>
          <CardDescription className="text-sm">
            {product.description.length > 120
              ? `${product.description.slice(0, 120)}...`
              : product.description}
          </CardDescription>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary">{product.category}</Badge>
          <span className="font-bold">${product.price}</span>
        </div>
      </CardContent>
    </Card>
  );
}
