'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  hrPayrollRecords,
  PayrollRecord,
  hrEmployees,
} from './hr-mock-data';
import {
  CreditCard,
  CheckCircle,
  FileText,
  IndianRupee,
  Activity,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

interface PayrollViewProps {
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export function PayrollView({ showToast }: PayrollViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [records, setRecords] = useState<PayrollRecord[]>(hrPayrollRecords);

  // CTC Calculator interactive state (yearly CTC in Lakhs)
  const [ctcLakhs, setCtcLakhs] = useState(8.5);

  // Payslip generator selector state
  const [selectedEmpId, setSelectedEmpId] = useState('emp_01');
  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  const [showPayslipStub, setShowPayslipStub] = useState(false);

  // Quick Action triggers
  useEffect(() => {
    if (searchParams.get('process') === 'true') {
      executePayrollProcess();
    }
  }, [searchParams]);

  // Execute Monthly Payroll Process
  const executePayrollProcess = () => {
    setRecords((prev) =>
      prev.map((r) => (r.status === 'PROCESSING' ? { ...r, status: 'PAID', payoutDate: '31 Jul 2026' } : r))
    );
    router.push('/dashboard/hr?view=payroll');
    showToast('Monthly payroll cycle executed successfully. Bank API notified.', 'success');
  };

  // Calculations for CTC interactive slider
  const yearlyCtc = ctcLakhs * 100000;
  const monthlyCtc = Math.round(yearlyCtc / 12);
  const basic = Math.round(monthlyCtc * 0.45); // 45% Basic
  const hra = Math.round(monthlyCtc * 0.20);  // 20% HRA
  const allowances = Math.round(monthlyCtc * 0.15); // 15% allowances
  const pf = Math.round(basic * 0.12); // 12% of basic
  const tax = Math.round(monthlyCtc * 0.08); // 8% avg tax bracket deduction
  const netPay = monthlyCtc - pf - tax;

  const currentPayslipEmployee = records.find((e) => e.employeeId === selectedEmpId) || records[0];

  const empInfo = hrEmployees.find((e) => e.id === currentPayslipEmployee.employeeId);
  const employeeName = currentPayslipEmployee.name;
  const employeeIdCode = empInfo?.id === 'emp_01' ? 'IVM00021' : 
                         empInfo?.id === 'emp_02' ? 'IVM00022' :
                         empInfo?.id === 'emp_03' ? 'IVM00023' :
                         empInfo?.id === 'emp_04' ? 'IVM00024' : `IVM000${currentPayslipEmployee.employeeId.slice(-2)}`;
  const department = empInfo?.department || 'Operations';
  const designation = empInfo?.role || currentPayslipEmployee.role;
  const reportingManager = empInfo?.reportingManager || 'Vikram Singh (Service Manager)';
  const employmentType = empInfo?.employmentType || 'Full-Time';
  const dateOfJoining = empInfo?.joinedDate || '12-Jul-2026';
  const location = empInfo?.location || 'Kakinada, Andhra Pradesh';
  const bankName = empInfo?.bankDetails?.bankName || 'State Bank of India';
  const bankAccount = empInfo?.bankDetails?.accountNo ? `XXXX XXXX ${empInfo.bankDetails.accountNo.slice(-4)}` : 'XXXX XXXX 4930';
  const ifscCode = empInfo?.bankDetails?.ifsc || 'SBIN0003456';
  const uan = '100874928501';
  const esic = '00-00-000000-000-0000';
  const aadhaar = 'XXXX XXXX 8847';
  const payPeriod = selectedMonth;
  const payDate = currentPayslipEmployee.payoutDate || '30-Jun-2026';

  // Calculate detailed values dynamically
  const isIntern = currentPayslipEmployee.role.toLowerCase().includes('intern');
  const isTech = currentPayslipEmployee.role.toLowerCase().includes('technician') || currentPayslipEmployee.role.toLowerCase().includes('mechanic');
  const isSales = currentPayslipEmployee.role.toLowerCase().includes('sales');
  
  const basicSalaryVal = currentPayslipEmployee.basic;
  const hraVal = currentPayslipEmployee.hra;
  const pfVal = currentPayslipEmployee.pf;
  const taxVal = currentPayslipEmployee.tax;
  const bonusVal = currentPayslipEmployee.bonus;
  const deductionsVal = currentPayslipEmployee.deductions;

  // Define other earnings dynamically
  const conveyanceVal = isIntern ? 0 : 2500;
  const telephoneVal = isIntern ? 0 : 1000;
  const medicalVal = isIntern ? 0 : 1250;
  const internetVal = isIntern ? 0 : 1000;
  const fuelVal = isIntern ? 0 : 2000;
  const mealVal = isIntern ? 0 : 1500;
  const shiftAllowanceVal = isIntern ? 0 : 1500;
  const travelReimbursementVal = isIntern ? 0 : 1500;
  
  const performanceIncentiveVal = bonusVal;
  const salesIncentiveVal = isSales ? 12500 : 0;
  const technicianIncentiveVal = isTech ? 3500 : 0;
  const attendanceBonusVal = isTech ? 1000 : 0;
  const overtimePayVal = isTech ? 2500 : 0;
  const holidayPayVal = 0;
  const otherReimbursementsVal = 0;

  // Set the "Special Allowance" dynamically
  const baseSpecialAllowanceVal = currentPayslipEmployee.allowances; 

  const earningsList = [
    { name: 'Basic Salary', current: basicSalaryVal },
    { name: 'House Rent Allowance (HRA)', current: hraVal },
    { name: 'Special Allowance', current: baseSpecialAllowanceVal },
    { name: 'Conveyance Allowance', current: conveyanceVal },
    { name: 'Telephone Allowance', current: telephoneVal },
    { name: 'Medical Allowance', current: medicalVal },
    { name: 'Internet Allowance', current: internetVal },
    { name: 'Fuel Allowance', current: fuelVal },
    { name: 'Meal Allowance', current: mealVal },
    { name: 'Performance Incentive', current: performanceIncentiveVal },
    { name: 'Sales Incentive', current: salesIncentiveVal },
    { name: 'Technician Incentive', current: technicianIncentiveVal },
    { name: 'Attendance Bonus', current: attendanceBonusVal },
    { name: 'Shift Allowance', current: shiftAllowanceVal },
    { name: 'Overtime Pay', current: overtimePayVal },
    { name: 'Holiday Pay', current: holidayPayVal },
    { name: 'Travel Reimbursement', current: travelReimbursementVal },
    { name: 'Other Reimbursements', current: otherReimbursementsVal },
  ];

  const grossPay = earningsList.reduce((sum, item) => sum + item.current, 0);

  // Deductions
  const employeePf = pfVal;
  const esiVal = isIntern ? 0 : (basicSalaryVal < 21000 ? Math.round(basicSalaryVal * 0.0075) : 350);
  const profTaxVal = isIntern ? 0 : 200;
  const tdsVal = taxVal;
  const advanceRecoveryVal = 0;
  const loanEmiVal = 0;
  const noticePayRecoveryVal = 0;
  const foodDeductionVal = isIntern ? 0 : 500;

  const deductionsList = [
    { name: 'Employee PF', current: employeePf },
    { name: 'ESI', current: esiVal },
    { name: 'Professional Tax', current: profTaxVal },
    { name: 'TDS', current: tdsVal },
    { name: 'Advance Recovery', current: advanceRecoveryVal },
    { name: 'Loan EMI', current: loanEmiVal },
    { name: 'Notice Pay Recovery', current: noticePayRecoveryVal },
    { name: 'Food Deduction', current: foodDeductionVal },
    { name: 'Other Deductions', current: deductionsVal },
  ];

  const totalDeductions = deductionsList.reduce((sum, item) => sum + item.current, 0);
  const payslipNetPay = grossPay - totalDeductions;

  // Employer Contributions
  const employerPf = pfVal;
  const employerEsi = isIntern ? 0 : (basicSalaryVal < 21000 ? Math.round(basicSalaryVal * 0.0325) : 1200);
  const gratuityVal = isIntern ? 0 : Math.round(basicSalaryVal * 0.0481); // 4.81% gratuity
  
  const employerContributionsList = [
    { name: 'Employer PF Contribution', current: employerPf },
    { name: 'Employer ESI Contribution', current: employerEsi },
    { name: 'Gratuity (accrued)', current: gratuityVal },
  ];
  
  const totalEmployerContributions = employerContributionsList.reduce((sum, item) => sum + item.current, 0);
  const totalCtc = grossPay + totalEmployerContributions;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-payslip');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Payslip_${employeeIdCode}_${selectedMonth.replace(' ', '_')}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              body {
                font-family: 'Inter', sans-serif;
                background-color: white;
                color: #1e293b;
                padding: 20px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                border: 1px solid #cbd5e1;
                padding: 4px 6px;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div style="max-width: 800px; margin: 0 auto;">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Payroll Administration Suite</h2>
          <p className="text-xs text-slate-500 font-medium">Process monthly employee payouts and simulate custom compensation plans.</p>
        </div>
        <button
          onClick={executePayrollProcess}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 self-start transition-all"
        >
          <CreditCard className="h-4 w-4" />
          <span>Process Monthly Payouts</span>
        </button>
      </div>

      {/* Interactive Salary / CTC Slider workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Salary Calculator Slider */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 space-y-6">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-blue-500" />
              <span>Compensation Simulator</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Adjust compensation brackets dynamically to simulate payslip structures.</p>
          </div>

          {/* Slider input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Target Annual CTC Bracket</span>
              <span className="text-lg font-black text-blue-600 font-mono">₹{ctcLakhs.toFixed(2)} LPA</span>
            </div>
            <input
              type="range"
              min="2"
              max="30"
              step="0.5"
              value={ctcLakhs}
              onChange={(e) => setCtcLakhs(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold font-mono">
              <span>₹2.0 LPA</span>
              <span>₹15.0 LPA</span>
              <span>₹30.0 LPA</span>
            </div>
          </div>

          {/* Simulated Breakdown grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Monthly Basic</p>
              <p className="text-sm font-black text-slate-800 mt-1">₹{basic.toLocaleString('en-IN')}</p>
              <span className="text-[8px] text-slate-400 font-semibold mt-0.5 block">45% of total</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Monthly HRA</p>
              <p className="text-sm font-black text-slate-800 mt-1">₹{hra.toLocaleString('en-IN')}</p>
              <span className="text-[8px] text-slate-400 font-semibold mt-0.5 block">20% of total</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Allowances</p>
              <p className="text-sm font-black text-slate-800 mt-1">₹{allowances.toLocaleString('en-IN')}</p>
              <span className="text-[8px] text-slate-400 font-semibold mt-0.5 block">Special perks</span>
            </div>
            <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
              <p className="text-[9px] font-bold text-rose-500 uppercase">PF Deduction</p>
              <p className="text-sm font-black text-rose-700 mt-1">-₹{pf.toLocaleString('en-IN')}</p>
              <span className="text-[8px] text-rose-400 font-semibold mt-0.5 block">12% basic contribution</span>
            </div>
            <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
              <p className="text-[9px] font-bold text-rose-500 uppercase">Income Tax (Avg)</p>
              <p className="text-sm font-black text-rose-700 mt-1">-₹{tax.toLocaleString('en-IN')}</p>
              <span className="text-[8px] text-rose-400 font-semibold mt-0.5 block">Simulated slab deduction</span>
            </div>
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <p className="text-[9px] font-bold text-emerald-600 uppercase">Simulated Take Home</p>
              <p className="text-sm font-black text-emerald-800 mt-1">₹{netPay.toLocaleString('en-IN')}</p>
              <span className="text-[8px] text-emerald-500 font-bold mt-0.5 block">Monthly net take home</span>
            </div>
          </div>
        </div>

        {/* Payslip Generator Sidebar Tool */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Payslip Document Generator</h3>
          
          <div className="space-y-3 text-xs font-bold text-slate-600 text-left">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1">Select Employee</label>
              <select
                value={selectedEmpId}
                onChange={(e) => {
                  setSelectedEmpId(e.target.value);
                  setShowPayslipStub(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-slate-800 bg-white"
              >
                {records.map((r) => (
                  <option key={r.employeeId} value={r.employeeId}>
                    {r.name} ({r.role.split(' ').slice(-1)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1">Month Period</label>
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setShowPayslipStub(false);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 outline-none text-slate-800 bg-white"
              >
                <option>June 2026</option>
                <option>May 2026</option>
                <option>April 2026</option>
              </select>
            </div>

            <button
              onClick={() => {
                setShowPayslipStub(true);
                showToast(`Payslip generated for ${currentPayslipEmployee.name}`, 'success');
              }}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-[11px] font-black text-blue-600 hover:text-blue-700 transition-all uppercase"
            >
              Generate Payslip View
            </button>
          </div>
        </div>

      </div>

      {/* Payout Registry Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Payroll Processing Registry</h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-150 font-mono">
            JUNE - JULY
          </span>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[9px] tracking-wider font-black">
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4">Earnings Breakdown (Monthly)</th>
              <th className="py-3.5 px-4">Deductions</th>
              <th className="py-3.5 px-4">Net Payout</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50 transition-all">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="h-8 w-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <p className="font-extrabold text-slate-800">{r.name}</p>
                      <p className="text-[9px] text-slate-400 font-medium">{r.role}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 font-semibold leading-relaxed">
                  Basic: ₹{r.basic.toLocaleString('en-IN')} <br />
                  HRA: ₹{r.hra.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 text-rose-600 font-semibold leading-relaxed">
                  PF: ₹{r.pf.toLocaleString('en-IN')} <br />
                  Tax: ₹{r.tax.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 font-mono font-black text-slate-900">
                  ₹{(r.netPay + r.bonus).toLocaleString('en-IN')}
                  {r.bonus > 0 && <span className="block text-[8px] text-emerald-600 font-extrabold">+₹{r.bonus} Bonus</span>}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black border ${
                    r.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    r.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedEmpId(r.employeeId);
                      setShowPayslipStub(true);
                      showToast(`Payslip loaded for ${r.name}`, 'info');
                    }}
                    className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase"
                  >
                    View Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          PAYSLIP DOCUMENT DRAWER MODAL
          ========================================== */}
      {showPayslipStub && currentPayslipEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full h-[90vh] border border-slate-200 shadow-2xl flex flex-col text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">Generated Pay Stub - {currentPayslipEmployee.name}</h3>
              </div>
              <button
                onClick={() => setShowPayslipStub(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Print area container */}
            <div className="flex-1 overflow-y-auto my-4 pr-2">
              <div id="printable-payslip" className="bg-white p-6 border border-slate-350 shadow-xs mx-auto text-slate-800 font-sans" style={{ maxWidth: '800px' }}>
                
                {/* Header Branding */}
                <div className="border border-slate-400 p-4 grid grid-cols-4 gap-4 mb-4">
                  <div className="col-span-3 flex flex-col gap-3">
                    {/* Brand Logo & Typography */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex-shrink-0">
                        <img src="/logo.jpeg" alt="InnoVibe Logo" className="h-12 w-auto object-contain" />
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="text-left">
                      <h4 className="text-[#2b4c7e] font-extrabold text-xs tracking-tight uppercase">InnoVibe Mobility India Pvt Ltd</h4>
                      <p className="text-[9px] text-slate-500 font-semibold mt-0.5">Registered Office: Survey No. 45, Kakinada IT Park, Kakinada, Andhra Pradesh - 533005</p>
                      <p className="text-[9px] text-slate-500 font-semibold">Corporate Office: Survey No. 45, Kakinada IT Park, Kakinada, Andhra Pradesh - 533005</p>
                      <p className="text-[8px] text-slate-400 mt-1 font-mono">CIN: U34100AP2023PTC123456 | GSTIN: 36AAAAA0000A1Z5</p>
                      <p className="text-[8px] text-slate-400 font-mono">Phone: +91 891 230 0000 | Email: hr@innovibemobility.com | Web: www.innovibemobility.com</p>
                    </div>
                  </div>
                  <div className="col-span-1 border-l border-slate-300 flex items-center justify-center pl-4">
                    <h2 className="text-[#2b4c7e] text-xl font-black tracking-widest uppercase font-serif">PAYSLIP</h2>
                  </div>
                </div>

                {/* Section 1: EMPLOYEE INFORMATION */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    EMPLOYEE INFORMATION (auto-populated from HRMS Employee Profile)
                  </div>
                  <div className="border border-t-0 border-slate-300 p-2 grid grid-cols-2 text-[9px] gap-x-6 gap-y-1.5 bg-slate-50/50">
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Full Name:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{employeeName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Employee ID:</span>
                      <span className="col-span-2 font-mono font-bold text-slate-900">{employeeIdCode}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Department:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{department}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Designation:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{designation}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Reporting Manager:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{reportingManager}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Employment Type:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{employmentType}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Date of Joining:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{dateOfJoining}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Location:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{location}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Bank Name:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{bankName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Bank A/c No. (last 4):</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">{bankAccount}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">IFSC Code:</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">{ifscCode}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">UAN:</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">{uan}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">ESIC Number:</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">{esic}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Aadhaar (last 4):</span>
                      <span className="col-span-2 font-mono font-semibold text-slate-900">{aadhaar}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Pay Period:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{payPeriod}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="font-bold text-slate-600">Pay Date:</span>
                      <span className="col-span-2 font-semibold text-slate-900">{payDate}</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: ATTENDANCE SUMMARY */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    ATTENDANCE SUMMARY
                  </div>
                  <div className="border border-t-0 border-slate-355">
                    <table className="w-full text-left text-[9px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                          <th className="py-1 px-2.5 border-r border-slate-300 w-1/2">Item</th>
                          <th className="py-1 px-2.5">Days / Hours</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Working Days</td>
                          <td className="py-1 px-2.5 font-semibold">30</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Present Days</td>
                          <td className="py-1 px-2.5 font-semibold">{empInfo?.status === 'ON_LEAVE' ? 18 : 26}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Paid Leave</td>
                          <td className="py-1 px-2.5 font-semibold">{empInfo?.status === 'ON_LEAVE' ? 4 : 2}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Weekly Off</td>
                          <td className="py-1 px-2.5 font-semibold">4</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Holidays</td>
                          <td className="py-1 px-2.5 font-semibold">2</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Loss of Pay (LOP)</td>
                          <td className="py-1 px-2.5 font-semibold">{empInfo?.status === 'ON_LEAVE' ? 6 : 0}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Overtime Hours</td>
                          <td className="py-1 px-2.5 font-semibold">{isTech ? '12.0 hrs' : '0.0 hrs'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: SALARY STRUCTURE */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    SALARY STRUCTURE
                  </div>
                  
                  <div className="border border-t-0 border-slate-300 grid grid-cols-2 divide-x divide-slate-300">
                    {/* Earnings */}
                    <div>
                      <table className="w-full text-[8.5px] text-left">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                            <th className="py-1 px-2 border-r border-slate-300">EARNINGS</th>
                            <th className="py-1 px-2 border-r border-slate-300 text-right">CURRENT</th>
                            <th className="py-1 px-2 text-right">YTD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {earningsList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="py-1 px-2 border-r border-slate-300 font-medium">{item.name}</td>
                              <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹{item.current.toLocaleString('en-IN')}</td>
                              <td className="py-1 px-2 text-right font-mono text-slate-500">₹{(item.current * 6).toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                            <td className="py-1 px-2 border-r border-slate-300">GROSS PAY (A)</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono">₹{grossPay.toLocaleString('en-IN')}</td>
                            <td className="py-1 px-2 text-right font-mono">₹{(grossPay * 6).toLocaleString('en-IN')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Deductions */}
                    <div className="flex flex-col justify-between">
                      <table className="w-full text-[8.5px] text-left">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                            <th className="py-1 px-2 border-r border-slate-300">DEDUCTIONS</th>
                            <th className="py-1 px-2 border-r border-slate-300 text-right">CURRENT</th>
                            <th className="py-1 px-2 text-right">YTD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {deductionsList.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="py-1 px-2 border-r border-slate-300 font-medium">{item.name}</td>
                              <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹{item.current.toLocaleString('en-IN')}</td>
                              <td className="py-1 px-2 text-right font-mono text-rose-600">₹{(item.current * 6).toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                          {Array.from({ length: Math.max(0, earningsList.length - deductionsList.length) }).map((_, i) => (
                            <tr key={`pad-${i}`} className="border-none">
                              <td className="py-1 px-2 border-r border-slate-300 text-transparent">-</td>
                              <td className="py-1 px-2 border-r border-slate-300 text-transparent">-</td>
                              <td className="py-1 px-2 text-transparent">-</td>
                            </tr>
                          ))}
                          <tr className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                            <td className="py-1 px-2 border-r border-slate-300">TOTAL DEDUCTIONS (B)</td>
                            <td className="py-1 px-2 border-r border-slate-300 text-right font-mono text-rose-700">₹{totalDeductions.toLocaleString('en-IN')}</td>
                            <td className="py-1 px-2 text-right font-mono text-rose-700">₹{(totalDeductions * 6).toLocaleString('en-IN')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Net Pay */}
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1.5 px-3 flex justify-between uppercase tracking-wider mt-0.5">
                    <span>NET PAY (A - B)</span>
                    <div className="flex gap-12 font-mono">
                      <span>CURRENT: ₹{payslipNetPay.toLocaleString('en-IN')}</span>
                      <span>YTD: ₹{(payslipNetPay * 6).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Section 4: EMPLOYER CONTRIBUTIONS */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    EMPLOYER CONTRIBUTIONS
                  </div>
                  <div className="border border-t-0 border-slate-300">
                    <table className="w-full text-left text-[8.5px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                          <th className="py-1 px-3 border-r border-slate-300 w-2/3">EMPLOYER CONTRIBUTIONS (Not part of take home pay)</th>
                          <th className="py-1 px-3 text-right">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {employerContributionsList.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-1 px-3 border-r border-slate-300 font-medium">{item.name}</td>
                            <td className="py-1 px-3 text-right font-mono font-semibold">₹{item.current.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                        <tr className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                          <td className="py-1.5 px-3 border-r border-slate-300">TOTAL CTC (Cost to Company)</td>
                          <td className="py-1.5 px-3 text-right font-mono text-[#2b4c7e]">₹{totalCtc.toLocaleString('en-IN')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 5: LEAVE BALANCE */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    LEAVE BALANCE
                  </div>
                  <div className="border border-t-0 border-slate-300 grid grid-cols-4 divide-x divide-slate-300 text-center py-1.5 bg-slate-50/50">
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Casual Leave</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">2.0</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Sick Leave</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">4.0</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Earned Leave</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">5.0</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-bold text-slate-500 uppercase">Comp Off</p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">1.0</p>
                    </div>
                  </div>
                </div>

                {/* Section 6: INCENTIVE & PERFORMANCE DETAILS */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    INCENTIVE & PERFORMANCE DETAILS (role-specific — applicable section auto-selected by HRMS)
                  </div>
                  <div className="border border-t-0 border-slate-300 p-2.5 bg-slate-50/50">
                    {isTech && (
                      <div>
                        <h4 className="text-[8px] font-bold text-[#2b4c7e] border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Technician Metrics</h4>
                        <div className="grid grid-cols-4 gap-3 text-center">
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Jobs Completed</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">32</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Customer Rating</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">4.9★</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Revenue Generated</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5 font-mono">₹1,45,000</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Incentive Earned</p>
                            <p className="text-[10px] font-black text-emerald-700 mt-0.5 font-mono">₹3,500</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {isSales && (
                      <div>
                        <h4 className="text-[8px] font-bold text-[#2b4c7e] border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Sales Team Metrics</h4>
                        <div className="grid grid-cols-4 gap-3 text-center">
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Leads Generated</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">120</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Sales Closed</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">45</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Revenue</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5 font-mono">₹8,50,000</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Commission</p>
                            <p className="text-[10px] font-black text-emerald-700 mt-0.5 font-mono">₹12,500</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {!isTech && !isSales && !isIntern && (
                      <div>
                        <h4 className="text-[8px] font-bold text-[#2b4c7e] border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Service Advisor & Office Metrics</h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Job Cards Resolved</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">28</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Customer CSAT</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">96%</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Ops Revenue Handled</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5 font-mono">₹2,10,000</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {isIntern && (
                      <div>
                        <h4 className="text-[8px] font-bold text-[#2b4c7e] border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Intern Performance Metrics</h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">KPI Achievement</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">92%</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Performance Rating</p>
                            <p className="text-[10px] font-black text-slate-800 mt-0.5">4.5 / 5</p>
                          </div>
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Stipend Amount</p>
                            <p className="text-[10px] font-black text-blue-700 mt-0.5 font-mono">₹17,000</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 7: PERFORMANCE SNAPSHOT */}
                <div className="mb-4">
                  <div className="bg-[#2b4c7e] text-white font-extrabold text-[9px] py-1 px-3 uppercase tracking-wider">
                    PERFORMANCE SNAPSHOT
                  </div>
                  <div className="border border-t-0 border-slate-350">
                    <table className="w-full text-left text-[9px]">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                          <th className="py-1 px-2.5 border-r border-slate-300 w-1/2">Monthly KPI</th>
                          <th className="py-1 px-2.5">Result</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Attendance</td>
                          <td className="py-1 px-2.5 font-semibold">{empInfo?.status === 'ON_LEAVE' ? '85%' : '98%'}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Customer Rating</td>
                          <td className="py-1 px-2.5 font-semibold">{empInfo?.id === 'emp_02' ? '4.9/5' : (empInfo?.id === 'emp_01' ? '4.8/5' : 'N/A')}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Productivity</td>
                          <td className="py-1 px-2.5 font-semibold">{isIntern ? '92%' : '95%'}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-1 px-2.5 border-r border-slate-300 font-medium">Performance Grade</td>
                          <td className="py-1 px-2.5 font-bold text-blue-700">{empInfo?.id === 'emp_01' ? 'A+' : (empInfo?.id === 'emp_02' ? 'A' : 'B+')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Box & Disclaimer */}
                <div className="border border-slate-400 p-4 grid grid-cols-2 gap-4 mt-6">
                  <div className="text-left flex items-end">
                  </div>
                  <div className="text-right flex flex-col justify-end items-end space-y-1">
                    <span className="text-[8px] text-slate-400 block font-mono">Generated by InnoVibe HRMS</span>
                    <div className="border-t border-slate-400 pt-1 w-48 text-center mt-6">
                      <span className="text-[10px] font-extrabold text-slate-800 tracking-tight block">Authorized Digital Signature</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6 text-[8px] text-slate-400 space-y-1 leading-relaxed">
                  <p className="font-bold text-slate-500">This is a computer-generated payslip and does not require a physical signature.</p>
                  <p>If you have any questions about this payslip, please contact:</p>
                  <p className="font-semibold text-slate-500">HR Department | hr@innovibemobility.com | Web: www.innovibemobility.com</p>
                  <p className="font-semibold text-[#2b4c7e] mt-1 tracking-wider uppercase">Confidential — InnoVibe Mobility India Pvt Ltd</p>
                </div>

              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <span>Print / Download PDF</span>
              </button>
              <button
                onClick={() => setShowPayslipStub(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
