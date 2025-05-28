import { UserTable } from "../users/user-table";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";
import { useFetchService } from "@/hooks/useService";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { AddUserModal } from "../users/AddUserModal";

export default function UsersPage() {

  const { loading, data, refetch } = useFetchService({
    fetchFunction: () =>
      userService.getUsers({
        onFailure: (message) => toast.error(message),
      }),
  });

  return (
    <div className="h-full w-full p-6 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Users
        </h1>

        <div className="flex gap-3">

           <AddUserModal refetch={refetch} />

          <Button variant="outline" onClick={refetch} disabled={loading}>
            {loading ? (
              <Loader className="animate-spin" />
            ) : "Refresh"}
          </Button>
        </div>
      </header>

      <section>
        <UserTable refetch={refetch} loading={loading} users={data?.data || []} />
      </section>
    </div>
  );
}

