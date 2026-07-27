'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '../../components/RoleContext';

export default function DashboardIndex() {
  const router = useRouter();
  const { activeRole } = useRole();

  useEffect(() => {
    const roleRoutes: Record<string, string> = {
      CEO: '/dashboard/ceo',
      COO: '/dashboard/coo',
      CTO: '/dashboard/cto',
      SERVICE_MANAGER: '/dashboard/service-manager',
      HR: '/dashboard/hr',
    };

    const targetRoute = roleRoutes[activeRole] || '/dashboard/ceo';
    router.replace(targetRoute);
  }, [router, activeRole]);

  return null;
}
