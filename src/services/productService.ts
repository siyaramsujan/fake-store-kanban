import { fsClient } from "./api";
import { DefaultFuncResponse, DefaultFunctionParams } from "@/types/api";
import { parseAxiosError } from "@/lib/utils";
import { Product } from "@/types/product";

type GetProductsResponse = DefaultFuncResponse<Product[] | undefined>;

type GetProductDetailsParams = DefaultFunctionParams<Product> & { id: string };
type GetProductDetailsResponse = DefaultFuncResponse<Product | undefined>;


type CreateNewProductParams = DefaultFunctionParams<Product> & { title: string; price: number; description: string; category: string; image: string };
type CreateNewProductResponse = DefaultFuncResponse<Product>;

type UpdateProductParams = DefaultFunctionParams<Product> & { id: string; title: string; price: number; description: string; category: string; image: string };
type UpdateProductResponse = DefaultFuncResponse<Product>;

class ProductService {
   
    constructor(){}

    // Handler for get all products 
    async getProducts({ onSuccess, onFailure }: DefaultFunctionParams<Product[]>): Promise<GetProductsResponse>{
        try {

         const response = await fsClient.get<Product[]>("/products");

         if(!response.data){

             const message = "Products data not found"; 
             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "Products fetched successfully",
            data: response.data
          }

        } catch (error) {

           onFailure?.(parseAxiosError(error));
           return {
              success: false,
              message: parseAxiosError(error),
           }
        }

    }

    // Handler for get single product/or product details
    async getProductDetails({ id, onSuccess, onFailure }: GetProductDetailsParams): Promise<GetProductDetailsResponse>{
        try {

         const response = await fsClient.get<Product>(`/products/${id}`);

         if(!response.data){
            const message = "Product details not found"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "Product fetched successfully",
            data: response.data
          }

        } catch (error) {

           onFailure?.(parseAxiosError(error));
           return {
              success: false,
              message: parseAxiosError(error),
           }
        }
    }

    // Handler for creating new product 
    async createNewProduct({ image, price, title, category, description, onSuccess, onFailure }: CreateNewProductParams): Promise<CreateNewProductResponse>{
        try {

         const response = await fsClient.post<Product>(`/products`, {
              image,
              price,
              title,
              category,
              description
         });

         if(!response.data){
            const message = "Error while creating new product"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "Product created successfully!",
            data: response.data
          }

        } catch (error) {

           onFailure?.(parseAxiosError(error));
           return {
              success: false,
              message: parseAxiosError(error),
           }
        }
    }

    // Handler for updating product details
    async updateProductDetails({ id, image, price, title, category, description, onSuccess, onFailure }: UpdateProductParams): Promise<UpdateProductResponse>{
        try {

         const response = await fsClient.put<Product>(`/products/${id}`, {
              id,
              image,
              price,
              title,
              category,
              description
         });

         if(!response.data){
            const message = "Error while updating product details"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "Product details updated successfully!",
            data: response.data
          }

        } catch (error) {

           onFailure?.(parseAxiosError(error));
           return {
              success: false,
              message: parseAxiosError(error),
           }
        }
    }



    // Handler for deleting product by product id
    async deleteProductById({ id, onFailure, onSuccess }: DefaultFunctionParams & { id: string }): Promise<DefaultFuncResponse>{
        try {

         const response = await fsClient.delete<Product>(`/products/${id}`);

         if(response.status != 200){
            const message = "Error while deleting product"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }


         onSuccess?.(true)
          return {
            success: true,
            message: "Product deleted successfully",
          }
        } catch (error) {

           onFailure?.(parseAxiosError(error));
           return {
              success: false,
              message: parseAxiosError(error),
           }
        }
    }
}


// Product Service Initialized Instance
export const productService = new ProductService();
