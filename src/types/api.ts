export type DefaultFuncResponse<T = unknown> = {
  success: boolean
  message: string
  data?: T
}


export type DefaultFunctionParams<T = unknown> = {
    onSuccess?: (data: T) => void;
    onFailure?: (error: string) => void;
}
