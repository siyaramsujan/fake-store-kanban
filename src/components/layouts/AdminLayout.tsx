import { Outlet } from "react-router-dom";
import { AppSidebar } from "../dashboard/Sidebar";
import { SidebarProvider } from "../ui/sidebar";
import ProtectedRoute from "../ProtectedRoute";

export default function AdminLayout(){

   return (
       <ProtectedRoute>
         <SidebarProvider>
            <AppSidebar />
            <Outlet /> 
         </SidebarProvider>
       </ProtectedRoute>
   )
}
