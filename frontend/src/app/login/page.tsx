'use client';
import Login from './Login';
import { useGlobalContext } from '../GlobalContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated, setIsAuthenticated, setIsLoading, setUsername, setRole, role } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/mesas');
    }
  }, [isAuthenticated, router]);

  return (
    <Login
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
      setIsLoading={setIsLoading}
      setUsername={setUsername}
      setRole={setRole}
      role={role}
    />
  );
}
