"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/users';

export default function ProtectedRoute({ children, adminRequired = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const tokenAccess = localStorage.getItem('tokenAccess');

      // If user is not logged in, redirect to login
      if (!tokenAccess) {
        router.push('/');
        return;
      }

      try {
        const userRes = await getUserProfile(tokenAccess);
        const user = userRes.data;

        // Redirect if admin access is required but user is not admin
        if (adminRequired && !user.is_staff) {
          router.push('/portfolios');
          return;
        }

        // All checks passed, stop loading
        setIsLoading(false);
      } catch {
        // Token invalid or other error
        localStorage.removeItem('tokenAccess');
        localStorage.removeItem('tokenRefresh');
        router.push('/');
      }
    };

    checkAuth();
  }, [router, adminRequired]);

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return children;
}
