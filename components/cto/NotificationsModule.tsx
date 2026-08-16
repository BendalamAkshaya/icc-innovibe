import React, { useState, useEffect } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckSquare,
  Clock,
  ArrowUpRight,
  Sliders,
  Brain,
  Ticket,
  User,
} from 'lucide-react';
import {
  getNotificationsForRole,
  markTicketNotificationAsRead,
  CrossRoleNotification,
} from '@/lib/ticketNotifications';

export function NotificationsModule() {
  const [ctoTickets, setCtoTickets] = useState<CrossRoleNotification[]>([]);

  useEffect(() => {
    const load = () => {
      setCtoTickets(getNotificationsForRole('CTO'));
    };
    load();

    window.addEventListener('icc_ticket_notifications_updated', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('icc_ticket_notifications_updated', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* PAGE HEADER & ACTIONS TOOLBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notifications & Priority Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Provide the CTO with intelligent technology alerts, incoming staff helpdesk tickets, important communications, and priority actions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => alert('Opening Pending CTO Approval Queue...')} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-purple-700">
            <CheckSquare className="h-4 w-4" /> Approval Queue ({ctoTickets.filter((t) => t.unread).length + 3})
          </button>
          <button 
            onClick={() => setCtoTickets((prev) => prev.map((t) => ({ ...t, unread: false })))} 
            className="px-3 py-1.5 rounded-xl bg-white text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
          >
            Clear Read Alerts
          </button>
        </div>
      </div>

      {/* INCOMING EMPLOYEE HELPDESK TICKETS SECTION */}
      {ctoTickets.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Incoming Staff Helpdesk & IT Tickets</h2>
                <p className="text-xs text-slate-500">Live requests submitted by staff and routed to CTO, Admin & Operations</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {ctoTickets.length} Active Tickets
            </span>
          </div>

          <div className="space-y-3">
            {ctoTickets.map((tkt) => (
              <div
                key={tkt.id}
                onClick={() => {
                  markTicketNotificationAsRead(tkt.id);
                  setCtoTickets((prev) => prev.map((item) => (item.id === tkt.id ? { ...item, unread: false } : item)));
                }}
                className={`p-4 rounded-2xl border transition-all ${
                  tkt.unread ? tkt.colorScheme.bg + ' ' + tkt.colorScheme.border : 'bg-slate-50 border-slate-200 opacity-90'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${tkt.colorScheme.badgeBg} ${tkt.colorScheme.badgeText}`}>
                        {tkt.priority} PRIORITY
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">{tkt.ticketId}</span>
                      <span className="text-[10px] text-slate-500 font-bold">• {tkt.category}</span>
                    </div>
                    <strong className="text-sm font-bold text-slate-900 block">{tkt.subject}</strong>
                    <p className="text-xs text-slate-600 leading-relaxed">{tkt.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                      <span>Submitted by: <strong className="text-slate-700">{tkt.submittedBy}</strong></span>
                      <span>•</span>
                      <span>Department: <strong className="text-slate-700">{tkt.department}</strong></span>
                      <span>•</span>
                      <span>Time: {tkt.timeAgo}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Acknowledged ticket ${tkt.ticketId} by CTO.`);
                      }}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 1: CTO PRIORITY CENTER */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">CTO Priority Center</h2>
              <p className="text-xs text-slate-500">High-priority attention area for critical alerts, pending decisions, and system information</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">3 Items Requiring Attention</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-slate-200 border-l-4 border-l-red-600 bg-white flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase">CRITICAL ATTENTION</span>
                <strong className="text-sm font-bold text-slate-900">"Production API performance degraded (+140ms latency)"</strong>
              </div>
              <p className="text-xs text-slate-500">Impact: Vehicle key pairing delay • Source: <code>API Gateway</code> • Time: 5 mins ago</p>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                ⚠️ <strong>Required Action:</strong> Enforce automatic autoscale pod expansion on REST Gateway nodes.
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => alert('Reviewing API Gateway metrics...')} className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">Review</button>
              <button onClick={() => alert('Approved REST Gateway autoscale...')} className="px-2.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700">Approve</button>
              <button onClick={() => alert('Escalated alert priority to P1...')} className="px-2.5 py-1.5 rounded-lg border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50">Escalate</button>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 bg-white flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">REQUIRES DECISION</span>
                <strong className="text-sm font-bold text-slate-900">"Cloud scaling approval pending for AWS Kafka cluster"</strong>
              </div>
              <p className="text-xs text-slate-500">Impact: Q4 buffer capacity requirement • Source: <code>CloudOps</code> • Time: 18 mins ago</p>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                💡 <strong>Required Action:</strong> Approve 4 reserved Kafka broker node instances.
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => alert('Reviewing Kafka proposal...')} className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">Review</button>
              <button onClick={() => alert('Approved AWS Kafka cluster scaling.')} className="px-2.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700">Approve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
