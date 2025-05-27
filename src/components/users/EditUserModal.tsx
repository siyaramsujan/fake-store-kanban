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
import { userService } from "@/services/userService"
import { User } from "@/types/user"
import { Loader } from "lucide-react"
import { FormEvent, ReactNode, useRef, useState } from "react"
import toast from "react-hot-toast"

export function EditUserModal({ refetch, user, children }: {
    refetch: () => void;
    user: User;
    children: ReactNode;
}) {

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password
  });

  const handleOnChange = (key: string, value: string) => {
       setData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
      
      e.preventDefault();
      setLoading(true);

      await userService.UpdateUserDetails({
        id: data.id,
        password: data.password,
        username: data.username,
        email: data.email,
        onSuccess: () => toast.success("User details edited successfully!"),
        onFailure: (err) => toast.error(err)
      });

      setLoading(false);

      refetch();
      closeRef.current?.click();
  }

   

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>


        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">

          <div className="grid items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email 
            </Label>
            <Input onChange={(e) => handleOnChange("email", e.target.value)} id="email" type="email" value={data.email} className="" />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input onChange={(e) => handleOnChange("username", e.target.value)} id="username" value={data.username} className="" />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password 
            </Label>
            <Input onChange={(e) => handleOnChange("password", e.target.value)} id="password" value={data.password} className="" />
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
