import { useFetchService } from "@/hooks/useService";
import { ProductsListing } from "../products/ProductsListing";
import { productService } from "@/services/productService";
import toast from "react-hot-toast";
import { AddNewProductModal } from "../products/AddProductModal";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export default function ProductsPage(){

  const { loading, data, refetch } = useFetchService({
    fetchFunction: () =>
     productService.getProducts({
        onFailure: (message) => toast.error(message),
      }),
  });

   return (
    <div className="h-full w-full p-2 md:p-6 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Products 
        </h1>

        <div className="flex gap-3">

           <AddNewProductModal refetch={refetch} />

          <Button variant="outline" onClick={refetch} disabled={loading}>
            {loading ? (
              <Loader className="animate-spin" />
            ) : "Refresh"}
          </Button>
        </div>
      </header>

       <ProductsListing products={data?.data || []} loading={loading} refetch={refetch}  />
    </div>

   )
}
