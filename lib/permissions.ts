export type ActionType = 'view' | 'create' | 'edit' | 'delete';

export const COO_ROLE_PERMISSIONS: Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }> = {
  // FULL ACCESS
  dashboard: { view: true, create: true, edit: true, delete: true },
  operations: { view: true, create: true, edit: true, delete: true },
  fleet: { view: true, create: true, edit: true, delete: true },
  vehicles: { view: true, create: true, edit: true, delete: true },
  rsa: { view: true, create: true, edit: true, delete: true },
  workshop: { view: true, create: true, edit: true, delete: true },
  technicians: { view: true, create: true, edit: true, delete: true },
  inventory: { view: true, create: true, edit: true, delete: true },
  procurement: { view: true, create: true, edit: true, delete: true },
  customers: { view: true, create: true, edit: true, delete: true },
  business: { view: true, create: true, edit: true, delete: true },
  workforce: { view: true, create: true, edit: true, delete: true },
  'ev-intelligence': { view: true, create: true, edit: true, delete: true },
  projects: { view: true, create: true, edit: true, delete: true },
  reports: { view: true, create: true, edit: true, delete: true },
  collaboration: { view: true, create: true, edit: true, delete: true },
  settings: { view: true, create: true, edit: true, delete: true },

  // READ ONLY
  financials: { view: true, create: false, edit: false, delete: false },
  finance: { view: true, create: false, edit: false, delete: false },
  billing: { view: true, create: false, edit: false, delete: false },
  revenue: { view: true, create: false, edit: false, delete: false },

  // NO ACCESS (FORBIDDEN)
  'user-management': { view: false, create: false, edit: false, delete: false },
  'roles-and-permissions': { view: false, create: false, edit: false, delete: false },
  'system-config': { view: false, create: false, edit: false, delete: false },
  devops: { view: false, create: false, edit: false, delete: false },
};

export function canView(module: string): boolean {
  return COO_ROLE_PERMISSIONS[module]?.view ?? false;
}

export function canCreate(module: string): boolean {
  return COO_ROLE_PERMISSIONS[module]?.create ?? false;
}

export function canEdit(module: string): boolean {
  return COO_ROLE_PERMISSIONS[module]?.edit ?? false;
}

export function canDelete(module: string): boolean {
  return COO_ROLE_PERMISSIONS[module]?.delete ?? false;
}
