'use client';

import React from 'react';
import { RouteGuard } from '@/components/rbac/RouteGuard';

export default function ForbiddenPage() {
  return (
    <RouteGuard module="devops">
      <div className="p-6">
        <h1 className="text-[20px]">System Config</h1>
      </div>
    </RouteGuard>
  );
}
