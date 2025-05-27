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
import { userService } from "@/services/userService";
import { User } from "@/types/user";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export function DeleteUserModal({ refetch, children, user }: {
    refetch: () => void;
    children: React.ReactNode;
    user: User
}) {

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
      
      setLoading(true);

      await userService.deleteUserById({
        id: user.id,
        onSuccess: () => toast.success("User deleted successfully!"),
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
            This action cannot be undone. This will permanently delete this user from the database.
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
