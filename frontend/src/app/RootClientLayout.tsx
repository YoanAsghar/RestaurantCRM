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
    username,
    role,
    isLoading,
    isAuthChecking,
    logout,
  } = useGlobalContext();
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to login if not authenticated and not already on the login page.
    // Wait for the session-restore (/me) check to finish first so a valid cookie
    // doesn't get bounced to /login on refresh.
    if (!isAuthChecking && !isLoading && !isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, isLoading, isAuthChecking, router]);

  const getTabFromPathname = (path: string): BodyTabs => {
    if (path.includes("mesas")) return BodyTabs.mesas;
    if (path.includes("cocina")) return BodyTabs.cocina;
    if (path.includes("ordenes")) return BodyTabs.ordenes;
    if (path.includes("carta")) return BodyTabs.carta;
    if (path.includes("admin")) return BodyTabs.admin;
    return BodyTabs.mesas;
  };

  const currentTab = getTabFromPathname(pathname || "");

  const handleTabChange = (tab: BodyTabs) => {
    router.push(`/${tab}`);
  };

  // If we're on the login page, don't show the Navbar
  const isLoginPage = pathname === "/login";

  // While verifying the persisted session, show nothing to avoid a redirect flash
  // to /login before /me resolves.
  if (isAuthChecking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-primary">
        <LoadingOverlay isVisible={true} message="Cargando..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {!isLoginPage && isAuthenticated && (
        <Navbar
          username={username}
          setTabChange={handleTabChange}
          currentTab={currentTab}
          role={role}
          onLogout={logout}
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
