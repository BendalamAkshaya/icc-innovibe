import { NextRequest, NextResponse } from 'next/server';
import { RealDataEngine } from '../../../lib/real-data-engine';

export async function GET() {
  const systemMetrics = RealDataEngine.getMetrics();
  return NextResponse.json({
    success: true,
    source: 'BUILTIN_SYSTEM_ENGINE',
    data: {
      total_revenue: systemMetrics.totalRevenue,
      total_users: systemMetrics.totalUsers,
      total_service_centers: systemMetrics.totalServiceCenters,
      total_bookings: systemMetrics.totalBookings,
      revenue_overview: systemMetrics.revenueOverview,
    },
  });
}

export async function POST(req: NextRequest) {
  let targetUrl = 'http://localhost:8000/api';

  try {
    const text = await req.text();
    if (text) {
      const body = JSON.parse(text);
      if (body?.url) targetUrl = body.url;
    }
  } catch (e) {
    // ignore JSON parse errors
  }

  // Attempt server-to-server fetch to targetUrl
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${targetUrl}/admin/dashboard`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      return NextResponse.json({
        success: true,
        source: 'REMOTE_LARAVEL_SERVER',
        data: json.data || json,
      });
    }
  } catch (err) {
    // Remote server not listening on targetUrl, fallback to built-in system engine
  }

  const systemMetrics = RealDataEngine.getMetrics();
  return NextResponse.json({
    success: true,
    source: 'BUILTIN_SYSTEM_ENGINE',
    data: {
      total_revenue: systemMetrics.totalRevenue,
      total_users: systemMetrics.totalUsers,
      total_service_centers: systemMetrics.totalServiceCenters,
      total_bookings: systemMetrics.totalBookings,
      revenue_overview: systemMetrics.revenueOverview,
    },
  });
}
