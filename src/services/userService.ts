import { fsClient } from "./api";
import { User } from "@/types/user";
import { DefaultFuncResponse, DefaultFunctionParams } from "@/types/api";
import { parseAxiosError } from "@/lib/utils";


type GetUsersResponse = DefaultFuncResponse<User[] | undefined>;

type GetUserDetailsParams = DefaultFunctionParams<User> & { id: string };
type GetUserDetailsResponse = DefaultFuncResponse<User | undefined>;


type CreateNewUserParams = DefaultFunctionParams<User> & { username: string, email: string, password: string };
type CreateNewUserResponse = DefaultFuncResponse<User>;

type UpdateUserParams = DefaultFunctionParams<User> & { id: string; username: string; email: string; password: string };
type UpdateUserResponse = DefaultFuncResponse<User>;


class UserService {
   
    constructor(){}

    // Handler for get all users
    async getUsers({ onSuccess, onFailure }: DefaultFunctionParams<User[]>): Promise<GetUsersResponse>{
        try {

         const response = await fsClient.get<User[]>("/users");


         if(!response.data){

             const message = "Users data not found"; 
             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "User fetched successfully",
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

    // Handler for get single user/or user details
    async getUserDetails({ id, onSuccess, onFailure }: GetUserDetailsParams): Promise<GetUserDetailsResponse>{
        try {

         const response = await fsClient.get<User>(`/users/${id}`);

         if(!response.data){
            const message = "User details not found"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "User fetched successfully",
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

    // Handler for creating new user
    async createNewUser({ username, email, password, onSuccess, onFailure }: CreateNewUserParams): Promise<CreateNewUserResponse>{
        try {

         const response = await fsClient.post<User>(`/users`, {
             username, 
             email,
             password
         });

         if(!response.data){
            const message = "Error while creating new user"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "User created successfully!",
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

    // Handler for updating user details
    async UpdateUserDetails({ id, username, email, password, onSuccess, onFailure }: UpdateUserParams): Promise<UpdateUserResponse>{
        try {

         const response = await fsClient.put<User>(`/users/${id}`, {
             id,
             username, 
             email,
             password
         });

         if(!response.data){
            const message = "Error while updating user details"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }

          onSuccess?.(response.data);
        
          return {
            success: true,
            message: "User details updated successfully!",
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



    // Handler for deleting user by user id
    async deleteUserById({ id, onFailure, onSuccess }: DefaultFunctionParams & { id: number | string }): Promise<DefaultFuncResponse>{
        try {

         const response = await fsClient.delete<User>(`/users/${id}`);

         if(response.status != 200){
            const message = "Error while deleting user"; 

             onFailure?.(message);
             return {
                success: false,
                message,
             }
         }


         onSuccess?.(true)
          return {
            success: true,
            message: "User deleted successfully",
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


// User Service Initialized Instance
export const userService = new UserService();
