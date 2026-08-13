'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RouteGuard } from '@/components/rbac/RouteGuard';
import { crossDashboardStore, LiveSpareRequest } from '@/lib/cross-dashboard-store';
import {
  Package,
  WrenchIcon,
  ShoppingBag,
  TruckIcon,
  CreditCard,
  Plus,
  X,
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  Barcode,
  Layers,
  Eye,
  Check,
  AlertCircle,
  Radio,
} from 'lucide-react';
import Link from 'next/link';

function ProcurementInner() {
  const searchParams = useSearchParams();
  const currentTab = searchParams ? searchParams.get('tab') || 'inventory' : 'inventory';

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'single' | 'excel'>('single');
  const [inspectItem, setInspectItem] = useState<any | null>(null);

  // Live Technician Spare Requests from CrossDashboardStore
  const [liveSpares, setLiveSpares] = useState<LiveSpareRequest[]>([]);

  useEffect(() => {
    setLiveSpares(crossDashboardStore.getSpareRequests());
    const unsubscribe = crossDashboardStore.onSparesUpdated((spares) => {
      setLiveSpares(spares);
    });
    return () => unsubscribe();
  }, []);

  const handleApproveSpare = (reqId: string, partCode?: string) => {
    const generatedSerial = `SN-${partCode || 'SPARE'}-${Math.floor(1000 + Math.random() * 9000)}`;
    crossDashboardStore.updateSpareRequestStatus(reqId, 'APPROVED', [generatedSerial]);
    setSuccessMsg(`Approved spare request ${reqId}! Serial ${generatedSerial} assigned & dispatched to field technician.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const handleIssueSpare = (reqId: string) => {
    crossDashboardStore.updateSpareRequestStatus(reqId, 'ISSUED');
    setSuccessMsg(`Marked spare request ${reqId} as ISSUED & handed over to technician.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const [items, setItems] = useState<any[]>([
    {
      id: 'inv_1',
      code: 'BAT-72V-50AH',
      name: '72V 50Ah LFP Battery Pack',
      cat: 'BATTERY',
      qty: 14,
      serials: Array.from({ length: 14 }, (_, i) => `SN-BAT-72V-${1001 + i}`),
      min: 10,
      cost: '₹32,000',
      status: 'NORMAL',
    },
    {
      id: 'inv_2',
      code: 'MOT-5KW-BLDC',
      name: '5kW BLDC Hub Motor',
      cat: 'MOTOR',
      qty: 8,
      serials: Array.from({ length: 8 }, (_, i) => `SN-MOT-5KW-${2001 + i}`),
      min: 12,
      cost: '₹18,500',
      status: 'LOW_STOCK',
    },
    {
      id: 'inv_3',
      code: 'CTL-EV-S1',
      name: 'Sine Wave Intelligent Controller',
      cat: 'CONTROLLER',
      qty: 25,
      serials: Array.from({ length: 25 }, (_, i) => `SN-CTL-S1-${3001 + i}`),
      min: 15,
      cost: '₹6,400',
      status: 'NORMAL',
    },
  ]);

  // Single Item Form State
  const [partName, setPartName] = useState('');
  const [partCode, setPartCode] = useState('');
  const [partQty, setPartQty] = useState('20');
  const [partCost, setPartCost] = useState('12000');

  // Excel Serial Code Manifest State
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [groupedParsedItems, setGroupedParsedItems] = useState<any[]>([]);
  const [totalSerialCount, setTotalSerialCount] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download Sample Excel/CSV Template with Unique Serial Code Rows
  const handleDownloadSampleTemplate = () => {
    const csvContent =
      'Part Name,Unique Serial Code / Unit Barcode,Category,Unit Cost (INR)\n' +
      '72V Fast Charger Module,SN-CHG-72V-FAST-001,CHARGER,12000\n' +
      '72V Fast Charger Module,SN-CHG-72V-FAST-002,CHARGER,12000\n' +
      '72V Fast Charger Module,SN-CHG-72V-FAST-003,CHARGER,12000\n' +
      '72V Fast Charger Module,SN-CHG-72V-FAST-004,CHARGER,12000\n' +
      '72V Fast Charger Module,SN-CHG-72V-FAST-005,CHARGER,12000\n' +
      'LFP Battery Pack 50Ah,SN-BAT-72V-901,BATTERY,32000\n' +
      'LFP Battery Pack 50Ah,SN-BAT-72V-902,BATTERY,32000\n' +
      'LFP Battery Pack 50Ah,SN-BAT-72V-903,BATTERY,32000\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sample_Serial_Manifest_Template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse Uploaded File & Group Unique Serial Codes by Part Name
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;

      const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

      // Map to accumulate serial codes by Part Name
      const groupsMap: { [key: string]: { name: string; category: string; cost: string; serials: string[] } } = {};
      let totalSerialsParsed = 0;

      const startIdx = lines[0].toLowerCase().includes('part') ? 1 : 0;
      for (let i = startIdx; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.replace(/"/g, '').trim());
        if (cols.length >= 2) {
          const pName = cols[0] || 'Imported Spare Part';
          const serialCode = cols[1] || `SN-UNIT-${Math.floor(10000 + Math.random() * 90000)}`;
          const cat = cols[2] || 'GENERAL_SPARE';
          const costVal = cols[3] ? `₹${parseInt(cols[3]).toLocaleString('en-IN')}` : '₹5,000';

          if (!groupsMap[pName]) {
            groupsMap[pName] = { name: pName, category: cat, cost: costVal, serials: [] };
          }
          groupsMap[pName].serials.push(serialCode);
          totalSerialsParsed++;
        }
      }

      // Convert Map to Array where Quantity = serials.length!
      const resultArray = Object.values(groupsMap).map((grp, idx) => ({
        id: `inv_group_${Date.now()}_${idx}`,
        code: grp.serials[0] || `SKU-${idx}`,
        name: grp.name,
        cat: grp.category,
        qty: grp.serials.length, // Quantity equal to number of unique serial codes!
        serials: grp.serials,
        min: 10,
        cost: grp.cost,
        status: 'PO_SERIALIZED',
      }));

      if (resultArray.length === 0) {
        // Fallback demo parsing
        const demoGrouped = [
          {
            id: 'demo_1',
            code: 'SN-CHG-72V-FAST-001',
            name: '72V Fast Charger Module',
            cat: 'CHARGER',
            qty: 5,
            serials: ['SN-CHG-72V-FAST-001', 'SN-CHG-72V-FAST-002', 'SN-CHG-72V-FAST-003', 'SN-CHG-72V-FAST-004', 'SN-CHG-72V-FAST-005'],
            min: 10,
            cost: '₹12,000',
            status: 'PO_SERIALIZED',
          },
          {
            id: 'demo_2',
            code: 'SN-BAT-72V-901',
            name: 'LFP Battery Pack 50Ah',
            cat: 'BATTERY',
            qty: 3,
            serials: ['SN-BAT-72V-901', 'SN-BAT-72V-902', 'SN-BAT-72V-903'],
            min: 10,
            cost: '₹32,000',
            status: 'PO_SERIALIZED',
          },
        ];
        setGroupedParsedItems(demoGrouped);
        setTotalSerialCount(8);
      } else {
        setGroupedParsedItems(resultArray);
        setTotalSerialCount(totalSerialsParsed);
      }
    };

    reader.readAsText(file);
  };

  // Submit Single PO
  const handleIssuePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partName) return;
    const qtyVal = parseInt(partQty) || 1;
    const serialList = Array.from({ length: qtyVal }, (_, i) => `${partCode || 'SN-UNIT'}-${1001 + i}`);

    const newItem = {
      id: `inv_${Date.now()}`,
      code: partCode || `PART-${Math.floor(1000 + Math.random() * 9000)}`,
      name: partName,
      cat: 'GENERAL_SPARE',
      qty: qtyVal,
      serials: serialList,
      min: 10,
      cost: `₹${parseInt(partCost).toLocaleString('en-IN')}`,
      status: 'PO_ISSUED',
    };
    setItems([newItem, ...items]);
    setPartName('');
    setPartCode('');
    setShowModal(false);
    setSuccessMsg(`Issued PO for "${newItem.name}" (${qtyVal} Serialized Units)!`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  // Submit Bulk Serial Manifest Import
  const handleConfirmBulkImport = () => {
    if (groupedParsedItems.length === 0) return;
    setItems([...groupedParsedItems, ...items]);
    setShowModal(false);
    setSuccessMsg(
      `Successfully imported ${totalSerialCount} unique serial codes across ${groupedParsedItems.length} part categories into inventory!`
    );
    setGroupedParsedItems([]);
    setTotalSerialCount(0);
    setExcelFile(null);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <RouteGuard module="inventory">
      <div className="space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-amber-600" />
              Serialized Inventory & Procurement Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Unit Serial Tracking • Quantity Auto-Calculated from Serial Codes • Excel Manifest Import
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setModalMode('excel');
                setShowModal(true);
              }}
              className="btn-emerald-interactive px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-1.5 active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Bulk Serial Manifest Import</span>
            </button>
            <button
              onClick={() => {
                setModalMode('single');
                setShowModal(true);
              }}
              className="btn-interactive px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-1 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Purchase Order</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3 text-xs text-emerald-900 font-bold shadow-xs animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Selection Bar */}
        <div className="flex space-x-2 border-b border-slate-200 bg-white px-4 pt-3 rounded-xl">
          {[
            { id: 'inventory', label: 'Serialized Inventory & Stock', icon: Package },
            { id: 'spares', label: 'Spare Parts', icon: WrenchIcon },
            { id: 'orders', label: 'Procurement Queue', icon: ShoppingBag },
            { id: 'vendors', label: 'Vendor Management', icon: TruckIcon },
            { id: 'po', label: 'Purchase Orders', icon: CreditCard },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <Link
                key={t.id}
                href={`/dashboard/coo/procurement?tab=${t.id}`}
                className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  active
                    ? 'border-amber-600 text-amber-700 bg-amber-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tab Views */}
        {currentTab === 'spares' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-amber-500/10 border border-amber-300/60 p-4 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Live Field Technician Spare Requisitions Stream
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Real-time spare parts requests originating from active technician diagnostic workbenches across all hubs.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                  {liveSpares.filter((s) => s.status === 'PENDING').length} Pending Approval
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Req ID</th>
                    <th className="p-4">Requested Part Name</th>
                    <th className="p-4">Technician & Job</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Issued Serial Codes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">COO Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {liveSpares.map((sp) => (
                    <tr key={sp.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-mono font-bold text-amber-700">{sp.id}</td>
                      <td className="p-4">
                        <span className="font-extrabold text-slate-900 block">{sp.part}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{sp.partCode || 'SPARE-OEM-GEN'}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-800 block">{sp.technicianName}</span>
                        <span className="text-[11px] text-blue-600 font-medium">{sp.jobId} • {sp.vehicleModel || 'EV Unit'}</span>
                      </td>
                      <td className="p-4 font-black text-slate-900 text-sm">{sp.qty}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            sp.priority === 'CRITICAL'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                              : sp.priority === 'HIGH'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sp.priority}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[11px]">
                        {sp.issuedSerials && sp.issuedSerials.length > 0 ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                            {sp.issuedSerials.join(', ')}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            sp.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : sp.status === 'ISSUED'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : sp.status === 'COMPLETED'
                              ? 'bg-slate-100 text-slate-800'
                              : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          }`}
                        >
                          {sp.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {sp.status === 'PENDING' ? (
                          <button
                            onClick={() => handleApproveSpare(sp.id, sp.partCode)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs transition active:scale-95 cursor-pointer flex items-center space-x-1 ml-auto"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Assign Serial</span>
                          </button>
                        ) : sp.status === 'APPROVED' ? (
                          <button
                            onClick={() => handleIssueSpare(sp.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-xs transition active:scale-95 cursor-pointer flex items-center space-x-1 ml-auto"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>Mark Issued</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 font-bold text-[11px]">Dispatched ✔</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(currentTab === 'inventory' || currentTab === 'orders' || currentTab === 'po') && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Part Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Quantity (Auto-Counted)</th>
                  <th className="p-4">Unit Serial Codes</th>
                  <th className="p-4">Unit Cost</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {items.map((i) => (
                  <tr key={i.id} className="hover:bg-slate-50">
                    <td className="p-4 font-extrabold text-slate-900">{i.name}</td>
                    <td className="p-4 text-slate-500">{i.cat}</td>
                    <td className="p-4 font-black text-blue-700 text-sm">
                      {i.qty} Units
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setInspectItem(i)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold rounded-md text-[11px] transition flex items-center space-x-1 cursor-pointer"
                      >
                        <Barcode className="w-3.5 h-3.5 text-blue-600" />
                        <span>View {i.qty} Unique Serials</span>
                      </button>
                    </td>
                    <td className="p-4 font-bold text-emerald-600">{i.cost}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-extrabold ${
                          i.status === 'LOW_STOCK'
                            ? 'bg-amber-100 text-amber-900'
                            : i.status === 'PO_SERIALIZED'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentTab === 'vendors' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Vendor Management Directory</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">Exide EV Battery Technologies</span>
                  <span className="text-slate-500">Contact: Rajiv Shah • Phone: +91 9898989898</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-extrabold">VERIFIED VENDOR ★ 4.9</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">Bosch Mobility Components</span>
                  <span className="text-slate-500">Contact: Anita Roy • Phone: +91 9797979797</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-extrabold">VERIFIED VENDOR ★ 4.95</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Unit Serial Codes List */}
        {inspectItem && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Barcode className="w-5 h-5 text-blue-600" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{inspectItem.name}</h2>
                    <span className="text-[11px] text-slate-500 font-bold">Total Quantity: {inspectItem.qty} Serialized Units</span>
                  </div>
                </div>
                <button onClick={() => setInspectItem(null)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Unit Barcodes / Serial Numbers</span>
                <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs font-mono">
                  {inspectItem.serials?.map((s: string, idx: number) => (
                    <div key={idx} className="p-2.5 bg-slate-50 flex items-center justify-between">
                      <span className="font-bold text-slate-900">Unit #{idx + 1}</span>
                      <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  onClick={() => setInspectItem(null)}
                  className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs cursor-pointer"
                >
                  Close Serial Inspector
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Issue PO & Bulk Serial Manifest Mode Switcher */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Issue Purchase Order (PO)</h2>
                <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Tabs */}
              <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setModalMode('single')}
                  className={`flex-1 py-2 text-center rounded-lg transition cursor-pointer ${
                    modalMode === 'single' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Single Item Form
                </button>
                <button
                  type="button"
                  onClick={() => setModalMode('excel')}
                  className={`flex-1 py-2 text-center rounded-lg transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                    modalMode === 'excel' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Bulk Serial Codes Manifest</span>
                </button>
              </div>

              {/* MODE 1: SINGLE ITEM */}
              {modalMode === 'single' && (
                <form onSubmit={handleIssuePO} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Spare Part Name</label>
                    <input
                      type="text"
                      required
                      value={partName}
                      onChange={(e) => setPartName(e.target.value)}
                      placeholder="e.g. 72V Fast Charger Module"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Part Serial Prefix / Code</label>
                    <input
                      type="text"
                      value={partCode}
                      onChange={(e) => setPartCode(e.target.value)}
                      placeholder="SN-CHG-72V"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Quantity (Units)</label>
                      <input
                        type="number"
                        value={partQty}
                        onChange={(e) => setPartQty(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Unit Cost (INR)</label>
                      <input
                        type="number"
                        value={partCost}
                        onChange={(e) => setPartCost(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs cursor-pointer shadow"
                    >
                      Submit Purchase Order
                    </button>
                  </div>
                </form>
              )}

              {/* MODE 2: BULK SERIAL MANIFEST IMPORT */}
              {modalMode === 'excel' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-900 block">Unique Serial Code Manifest Format</span>
                      <span className="text-[11px] text-emerald-700">Rows with same Part Name are auto-grouped & quantity is auto-counted</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadSampleTemplate}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded-lg transition flex items-center space-x-1 cursor-pointer shrink-0 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Template</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Upload Serial Manifest (.csv, .xlsx)</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200"
                    />
                  </div>

                  {/* Grouped Parsed Inventory Items Preview */}
                  {groupedParsedItems.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Grouped Manifest ({groupedParsedItems.length} Parts • {totalSerialCount} Total Serials)</span>
                        <span className="text-emerald-600">Quantity Auto-Calculated</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                        {groupedParsedItems.map((g) => (
                          <div key={g.id} className="p-3 bg-slate-50 flex items-center justify-between">
                            <div>
                              <span className="font-extrabold text-slate-900 block">{g.name}</span>
                              <span className="text-[11px] text-blue-700 font-bold font-mono">
                                Quantity: {g.qty} Units ({g.serials.length} Serial Codes)
                              </span>
                            </div>
                            <span className="font-bold text-emerald-600">{g.cost} / unit</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={groupedParsedItems.length === 0}
                      onClick={handleConfirmBulkImport}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs cursor-pointer shadow transition flex items-center space-x-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Confirm Import ({totalSerialCount} Units)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </RouteGuard>
  );
}

export default function ProcurementPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500 font-bold">Loading...</div>}>
      <ProcurementInner />
    </Suspense>
  );
}


