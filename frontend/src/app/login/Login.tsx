import { UserServices } from "@/services/UserServices";
import { User } from "@/models/user";
import React, { useState } from "react";

interface LoginProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (boolean: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUsername: (name: string) => void;
  setRole: (name: string) => void;
  role: string;
};

const Login = ({isAuthenticated, setIsAuthenticated, setIsLoading, setUsername, setRole, role}: LoginProps) => {
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  async function handleLoginButton(): Promise<void>{
    setIsLoading(true);
    try{
      let response = await UserServices.logIn(new User(loginUsername, loginPassword));
      
      setUsername(response.userName);
      setRole(response.role);
      setIsAuthenticated(true);
    }catch(error){
      // Silently handle or show a proper UI error message
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center bg-primary p-4 relative overflow-hidden`}
    >
      {/* Background radial glows for atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#22007c] rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#140152] rounded-full blur-[120px] opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-dark-100/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10">
        <div className="flex flex-col items-center mb-12">
          <img
            className="w-52 mb-8 drop-shadow-2xl"
            src="/logoipsum.png"
            alt="Restaurant CRM"
          />
          <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
            Bienvenido
          </h2>
          <p className="text-gray-400 text-center">
            Gestiona tu restaurante con eficiencia
          </p>
        </div>

        <div className="space-y-8">
          {/* Input Usuario */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-light-200/80 ml-1 uppercase tracking-wider">
              Usuario
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 invert">
                <img
                  src="/person_icon.png"
                  className="size-5 invert opacity-40 group-focus-within:opacity-100 transition-opacity"
                  alt=""
                />
              </div>
              <input
                type="text"
                value={loginUsername}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#22007c] focus:bg-white/10 transition-all"
                placeholder="Nombre de usuario"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-light-200/80 ml-1 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 text-white/40 group-focus-within:text-white transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={loginPassword}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#22007c] focus:bg-white/10 transition-all"
                placeholder="••••••••"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            className="w-full bg-[#22007c] hover:bg-[#2a0096] text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(34,0,124,0.3)] hover:shadow-[0_0_30px_rgba(34,0,124,0.5)] active:scale-[0.98] transform"
            onClick={handleLoginButton}
          >
            Acceder al Sistema
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Restaurant CRM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
  

export default Login;
