import { fsClient } from "./api";
import { DefaultFunctionParams, DefaultFuncResponse } from "@/types/api";
import { parseAxiosError } from "@/lib/utils";

type LoginPayload = {
   username: string;
   password: string;
}

type LoginFuncParams = {
  creds: LoginPayload;
} & DefaultFunctionParams<string>;


type LoginResponse = DefaultFuncResponse & { token?: string }

class AuthService {
   
    constructor(){}

    async login({ creds, onFailure, onSuccess  }: LoginFuncParams): Promise<LoginResponse>{
        try {
         const response = await fsClient.post<{ token: string }>('/auth/login', creds);
        
         if(!response.data.token){
            onFailure?.("Token not found");
            throw new Error("Token not found") 
         }
  
          onSuccess?.(response.data.token);
           return {
              success: true,
              token: response.data.token,
              message: "Successfully logged in!"
           };         
        } catch (error: unknown) {

          onFailure?.(parseAxiosError(error));
      
          return {
             message: parseAxiosError(error),
             success: false,
          }
        }

    }   
}


export const authService = new AuthService();
