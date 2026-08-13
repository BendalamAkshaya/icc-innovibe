export type TicketPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';

export interface CrossRoleNotification {
  id: string;
  ticketId: string;
  title: string;
  subject: string;
  description: string;
  category: string;
  priority: TicketPriority;
  submittedBy: string;
  department: string;
  timestamp: string;
  timeAgo: string;
  targetRoles: Array<'CEO' | 'COO' | 'CTO' | 'HR' | 'SERVICE_MANAGER' | 'EMPLOYEE' | 'ALL'>;
  unread: boolean;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    dotColor: string;
    iconBg: string;
    iconColor: string;
  };
}

export function getPriorityColorScheme(priority: TicketPriority) {
  switch (priority) {
    case 'URGENT':
      return {
        bg: 'bg-rose-50/90',
        border: 'border-rose-300',
        text: 'text-rose-950',
        badgeBg: 'bg-rose-600',
        badgeText: 'text-white',
        badgeBorder: 'border-rose-700',
        dotColor: 'bg-rose-500',
        iconBg: 'bg-rose-100 text-rose-600',
        iconColor: 'text-rose-600',
      };
    case 'HIGH':
      return {
        bg: 'bg-amber-50/90',
        border: 'border-amber-300',
        text: 'text-amber-950',
        badgeBg: 'bg-amber-500',
        badgeText: 'text-white',
        badgeBorder: 'border-amber-600',
        dotColor: 'bg-amber-500',
        iconBg: 'bg-amber-100 text-amber-600',
        iconColor: 'text-amber-600',
      };
    case 'NORMAL':
      return {
        bg: 'bg-blue-50/80',
        border: 'border-blue-200',
        text: 'text-blue-950',
        badgeBg: 'bg-blue-600',
        badgeText: 'text-white',
        badgeBorder: 'border-blue-700',
        dotColor: 'bg-blue-500',
        iconBg: 'bg-blue-100 text-blue-600',
        iconColor: 'text-blue-600',
      };
    case 'LOW':
    default:
      return {
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        text: 'text-slate-900',
        badgeBg: 'bg-slate-500',
        badgeText: 'text-white',
        badgeBorder: 'border-slate-600',
        dotColor: 'bg-slate-400',
        iconBg: 'bg-slate-100 text-slate-600',
        iconColor: 'text-slate-500',
      };
  }
}

const STORAGE_KEY = 'icc_global_ticket_notifications';

export function getGlobalTicketNotifications(): CrossRoleNotification[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Default initial mock ticket notifications
      const initial: CrossRoleNotification[] = [
        {
          id: 'NOTIF-TKT-8842',
          ticketId: 'TKT-8842',
          title: 'New Helpdesk Request: Dual Monitor Setup for CAD & Telemetry',
          subject: 'Request Dual Monitor Setup for CAD & Telemetry Workspace',
          description: 'Requesting an additional 27-inch 4K monitor for depot fleet dispatch telemetry analysis.',
          category: 'Hardware & Equipment',
          priority: 'NORMAL',
          submittedBy: 'Sneha Patel (Operations Specialist)',
          department: 'EV Fleet Operations & Logistics',
          timestamp: new Date().toISOString(),
          timeAgo: '15 mins ago',
          targetRoles: ['CEO', 'COO', 'CTO', 'SERVICE_MANAGER'],
          unread: true,
          colorScheme: getPriorityColorScheme('NORMAL'),
        },
        {
          id: 'NOTIF-TKT-7910',
          ticketId: 'TKT-7910',
          title: 'High Priority Request: VPN Certificate Renewal for Fleet Telemetry',
          subject: 'VPN Certificate Renewal for Field Fleet Telemetry',
          description: 'Annual SSL VPN security client credentials need to be re-keyed for depot telemetry gateway access.',
          category: 'IT & Access Permissions',
          priority: 'HIGH',
          submittedBy: 'Sneha Patel (Operations Specialist)',
          department: 'EV Fleet Operations & Logistics',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          timeAgo: '1 hour ago',
          targetRoles: ['CEO', 'COO', 'CTO'],
          unread: true,
          colorScheme: getPriorityColorScheme('HIGH'),
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function createCrossRoleTicketNotification(params: {
  ticketId: string;
  subject: string;
  description: string;
  category: string;
  priority: TicketPriority;
  submittedBy?: string;
  department?: string;
}): CrossRoleNotification {
  const targetRoles: Array<'CEO' | 'COO' | 'CTO' | 'HR' | 'SERVICE_MANAGER' | 'EMPLOYEE' | 'ALL'> = [
    'CEO', // Admin (Super Admin)
    'COO', // COO
    'CTO', // CTO
  ];

  // Also route to specific category stakeholders
  if (params.category.includes('IT') || params.category.includes('Access')) {
    if (!targetRoles.includes('CTO')) targetRoles.push('CTO');
  } else if (params.category.includes('Hardware') || params.category.includes('Equipment') || params.category.includes('Facilities')) {
    if (!targetRoles.includes('SERVICE_MANAGER')) targetRoles.push('SERVICE_MANAGER');
    if (!targetRoles.includes('COO')) targetRoles.push('COO');
  } else if (params.category.includes('HR') || params.category.includes('Payroll')) {
    if (!targetRoles.includes('HR')) targetRoles.push('HR');
  }

  const notification: CrossRoleNotification = {
    id: `NOTIF-${params.ticketId}-${Date.now()}`,
    ticketId: params.ticketId,
    title: `${params.priority === 'URGENT' ? '🚨 URGENT Helpdesk Ticket' : params.priority === 'HIGH' ? '⚠️ High Priority Ticket' : '🎫 New Helpdesk Ticket'}: ${params.subject}`,
    subject: params.subject,
    description: params.description,
    category: params.category,
    priority: params.priority,
    submittedBy: params.submittedBy || 'Sneha Patel (Operations Specialist)',
    department: params.department || 'EV Fleet Operations & Logistics',
    timestamp: new Date().toISOString(),
    timeAgo: 'Just now',
    targetRoles,
    unread: true,
    colorScheme: getPriorityColorScheme(params.priority),
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getGlobalTicketNotifications();
      const updated = [notification, ...existing.filter((n) => n.ticketId !== params.ticketId)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('icc_ticket_notifications_updated', { detail: notification }));
    } catch (e) {
      console.error('Failed to save cross-role ticket notification', e);
    }
  }

  return notification;
}

export function getNotificationsForRole(role: string): CrossRoleNotification[] {
  const all = getGlobalTicketNotifications();
  return all.filter((n) => n.targetRoles.includes('ALL') || n.targetRoles.includes(role as any));
}

export function markTicketNotificationAsRead(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getGlobalTicketNotifications();
    const updated = existing.map((n) => (n.id === id ? { ...n, unread: false } : n));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('icc_ticket_notifications_updated'));
  } catch (e) {}
}

export function markAllTicketNotificationsAsRead(role?: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getGlobalTicketNotifications();
    const updated = existing.map((n) => {
      if (!role || n.targetRoles.includes('ALL') || n.targetRoles.includes(role as any)) {
        return { ...n, unread: false };
      }
      return n;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('icc_ticket_notifications_updated'));
  } catch (e) {}
}
