import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import { Toaster } from 'react-hot-toast';
import LoginComponent from './components/auth/LoginComponent';
import AdminLayout from "./components/layouts/AdminLayout";
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './components/PublicRoute';
import UsersPage from './components/pages/UsersPage';
import NotFoundPage from './components/NotFoundPage';
import UserDetailsPage from './components/pages/UserDetailsPage';
import ProductsPage from './components/pages/ProductsPage';
import KanbanBoard from './components/kanban/Board';

function App() {
  return (
   <AuthProvider>
   <BrowserRouter>
      <Toaster />

       <Routes>

         {/* AUTH ROUTE */}
        <Route path="/auth/login" element={
             <PublicRoute allowAuthenticated={false}>
                <LoginComponent /> 
             </PublicRoute>
          } />

        <Route path="/" element={<Navigate to="/admin/products" replace />} />

        <Route path="/kanban/board" element={<KanbanBoard />} />

         {/* ADMIN ROUTE */}
        <Route path="/admin" element={<AdminLayout />}>

            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UserDetailsPage />} />
             
            <Route path="products" element={<ProductsPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

   </BrowserRouter>
   </AuthProvider>
  )
}

export default App

