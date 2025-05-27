import { Eye } from "lucide-react"
import { Product } from "@/types/product"
import ProductCard from "./ProductCard";
import { ProductSkeleton } from "../skeleton/ProductSkeleton";

type Props = {
  products: Product[];
  loading: boolean;
  refetch: () => void;
}

export function ProductsListing({ products = [], loading, refetch }: Props) {

  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Eye className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No products found</h3>
      </div>
    )
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

      {loading
        ? Array.from({ length: 10 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))
        : products.map((product) => (
            <ProductCard refetch={refetch} key={product.id} product={product} />
          ))}

    </section>
  )
}

