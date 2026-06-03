'use client';

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import LoadingOverlay from "../components/LoadingOverlay";
import { BodyTabs } from "../models/BodyTabs";
import { useRouter, usePathname } from "next/navigation";
import { useGlobalContext } from "./GlobalContext";

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
    role,
    setRole,
    isLoading,
    setIsLoading,
  } = useGlobalContext();
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to login if not authenticated and not already on the login page
    if (!isLoading && !isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, isLoading, router]);

  const getTabFromPathname = (path: string): BodyTabs => {
    if (path.includes("mesas")) return BodyTabs.mesas;
    if (path.includes("cocina")) return BodyTabs.cocina;
    if (path.includes("ordenes")) return BodyTabs.ordenes;
    if (path.includes("inventario")) return BodyTabs.inventario;
    if (path.includes("admin")) return BodyTabs.admin;
    return BodyTabs.mesas;
  };

  const currentTab = getTabFromPathname(pathname || "");

  const handleTabChange = (tab: BodyTabs) => {
    router.push(`/${tab}`);
  };

  // If we're on the login page, don't show the Navbar
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {!isLoginPage && isAuthenticated && (
        <Navbar
          setIsAuthenticated={setIsAuthenticated}
          username={username}
          setTabChange={handleTabChange}
          currentTab={currentTab}
          setUsername={setUsername}
          setRole={setRole}
          role={role}
        />
      )}

      <section className="flex-1 overflow-hidden">
        <main className="w-full h-full flex flex-row relative">
          {children}
        </main>
      </section>
      
      {isLoading && (
        <LoadingOverlay isVisible={true} message="Cargando..." />
      )}
    </div>
  );
}
