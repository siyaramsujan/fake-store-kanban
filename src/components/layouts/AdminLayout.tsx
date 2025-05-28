import { Outlet } from "react-router-dom";
import { AppSidebar } from "../dashboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import ProtectedRoute from "../ProtectedRoute";

export default function AdminLayout(){

   return (
       <ProtectedRoute>
         <SidebarProvider>
            <AppSidebar />
           <SidebarTrigger className="sm:hidden fixed right-0 z-50" />
            <Outlet /> 
         </SidebarProvider>
       </ProtectedRoute>
   )
}
