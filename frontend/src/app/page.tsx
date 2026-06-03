'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGlobalContext } from "./GlobalContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useGlobalContext();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/mesas");
    }
  }, [router, isAuthenticated]);

  return null;
}
