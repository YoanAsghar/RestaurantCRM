'use client';
import Login from './Login';
import { useGlobalContext } from '../GlobalContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/mesas');
    }
  }, [isAuthenticated, router]);

  return <Login />;
}
