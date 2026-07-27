# ⚡ InnoVibe Command Center (ICC) | Office Portal

> **Target Domain**: `office.innovibemobility.com`  
> **Tech Stack**: Next.js 15 (App Router), React 19, Tailwind CSS, Recharts, Lucide Icons, TypeScript.

---

## 🌟 Executive Summary

**InnoVibe Command Center (ICC)** is the unified office portal designed for InnoVibe Mobility Technology Company. It features strict **Role-Based Access Control (RBAC)** across executive designation portals:

* 👑 **CEO Dashboard (Super Admin)**: Complete system control, live vehicle tracking telematics matrix, real revenue streams, and dynamic role permission manager.
* ⚙️ **COO Dashboard (Operations)**: Live dispatch matrix, service ticket bottlenecks, and **Vendor EV Fleet Live Ingestion Feed**.
* ⚡ **CTO Dashboard (AI & Telematics)**: Real-time **EV Health Score (0–100)** telemetry breakdown (Battery, Motor, Controller, Brakes), system latency, and live AI log terminal.
* 🛠️ **Service Manager Dashboard**: Ticket queue workbench, **AI Service Advisor** (suggested fault codes, cost/time estimates), and **AI Dispatcher** (ranked technician recommendations by proximity and skill).
* 👥 **HR Dashboard (Human Resources)**: Technician productivity index, customer rating scores, SLA compliance metrics, and staff rosters.
* 🤖 **AI Command Suite & WhatsApp Automation**: Multi-agent support chatbot sandbox and WhatsApp Cloud API notification triggers.

---

## 🏃 Quick Start Guide for Teammates & Friends

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd innovibe-office-portal
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit **`http://localhost:3000`** in your browser.

---

## 🔑 Login Credentials (Single Login Screen)

When accessing `http://localhost:3000`, click any **1-Click Quick Selector** on screen or use:

| Designation Role | Email Address | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **CEO (Super Admin)** | `ceo@innovibemobility.com` | `admin123` | **Unrestricted Super Admin Full Access** |
| **COO (Operations)** | `coo@innovibemobility.com` | `coo123` | Operations & Vendor Fleet Sync |
| **CTO (Technology)** | `cto@innovibemobility.com` | `cto123` | EV Telematics & Health Engine |
| **Service Manager** | `sm@innovibemobility.com` | `sm123` | Ticket Queue & AI Advisor |
| **HR Head** | `hr@innovibemobility.com` | `hr123` | Staff Analytics & Productivity |

---

## 🔌 Live Backend API Connection

To connect this portal to your live Laravel API server (`innovibe-backend-main`), set `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.innovibemobility.cloud/api
# Or local server:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Or click **"Configure API Server URL"** inside the CEO Dashboard to set and test the backend URL live via Next.js Server Proxy!
