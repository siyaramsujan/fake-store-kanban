import { Navigate, useParams } from "react-router-dom";
import { UserDetails } from "../users/UserDetails";
import { useFetchService } from "@/hooks/useService";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";
import { UserDetailsSkeleton } from "../skeleton/UserDetailsSkeleton";

export default function UserDetailsPage(){

   const { id } = useParams();

   if(!id) return <Navigate to={"/admin/users"} />;

   const { data, loading, refetch } = useFetchService({
        fetchFunction: () => userService.getUserDetails({ id: id, onFailure: (err) => toast.error(err) }), 
   });


  return (
    <div className="h-full w-full p-6 space-y-6">
       {
         loading ? (
            <UserDetailsSkeleton /> 
         ) : !loading && data?.data ? (
           <UserDetails refetch={refetch} user={data.data}  />
         ) : null
      }
    </div>
  )
}
