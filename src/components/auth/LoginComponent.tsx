import { useAuth } from "@/context/AuthContext";
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginComponent() {

   const [creds, setCreds] = useState({
      username: "",
      password: "",
   });

   const [loading, setLoading] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const { login } = useAuth();


   const from = location.state?.from?.pathname || '/dashboard';

  const handleOnChange = (name: string, value: string) => {
     setCreds(prevState => ({
        ...prevState,
        [name]: value,
     }))
  };


  const onFormSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const success = await login(creds.username, creds.password); 

      if(success){
          navigate(from, { replace: true })
      }

      setLoading(false);
  }


  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onFormSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username 
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={creds.username}
                  onChange={(e) => handleOnChange("username", e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={creds.password}
                  onChange={(e) => handleOnChange("password", e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`${loading ? "bg-indigo-600/50" : "bg-indigo-600"} flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
