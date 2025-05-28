import { authService } from '@/services/authService';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string): Promise<boolean> => {

      const response = await authService.login({ creds: {
            username,
            password
      }});


      if(response.success && response.token){
         toast.success(response.message);
         localStorage.setItem('userToken', response.token);
         setAuthenticated(true);
         return response.success;
      }

      toast.error(response.message);
      return response.success;

  };

  const logout = async () => {
      setAuthenticated(false);
      localStorage.removeItem("userToken");
  }

    useEffect(() => {
      const token = localStorage.getItem("userToken");
      
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
     
      setLoading(false);
    }, []);



  const value: AuthContextType = {
      isAuthenticated,
      loading,
      login,
      logout
  }
   
  return (
     <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
