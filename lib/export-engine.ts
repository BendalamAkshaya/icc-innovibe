/**
 * Task Management System (TMS) - Export Engine Layer
 * Formats report objects and triggers browser downloads for CSV, Excel (.xls), and Printable PDF formats.
 */

import { GeneratedReportData, ExportFormat } from './report-models';

export class ExportEngine {
  static exportReport(report: GeneratedReportData, format: ExportFormat): void {
    const reportTypeSlug = report.reportType ? report.reportType.toLowerCase() : 'report';
    const filenameStr = `${reportTypeSlug}_${report.startDateStr}_to_${report.endDateStr}`;

    switch (format) {
      case 'CSV':
        this.downloadCSV(filenameStr, report);
        break;
      case 'EXCEL':
        this.downloadExcel(filenameStr, report);
        break;
      case 'PDF':
        this.downloadPDF(filenameStr, report);
        break;
      default:
        this.downloadExcel(filenameStr, report);
    }
  }

  private static downloadCSV(filenameStr: string, report: GeneratedReportData): void {
    const csvLines: string[] = [];

    // Header Metadata
    csvLines.push(`"INNOVIBE MOBILITY INDIA PVT LTD - CORPORATE REPORT"`);
    csvLines.push(`"Report Title","${report.reportTitle}"`);
    csvLines.push(`"Employee","${report.employeeInfo?.name} (${report.employeeInfo?.id})"` );
    csvLines.push(`"Department","${report.employeeInfo?.department} - ${report.employeeInfo?.designation}"`);
    csvLines.push(`"Date Range","${report.dateRangeText}"`);
    csvLines.push(`"Generated At","${report.generatedAt}"`);
    csvLines.push(``);

    // Summary Section
    if (report.summaryMetrics && report.summaryMetrics.length > 0) {
      csvLines.push(`"SUMMARY METRICS"`);
      report.summaryMetrics.forEach((m) => {
        csvLines.push(`"${m.label}","${m.value}"`);
      });
      csvLines.push(``);
    }

    // Data Table
    csvLines.push(report.headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','));
    report.rows.forEach((row) => {
      csvLines.push(row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','));
    });

    const csvString = csvLines.join('\n');
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    this.triggerBlobDownload(blob, `${filenameStr}.csv`);
  }

  private static downloadExcel(filenameStr: string, report: GeneratedReportData): void {
    let xml = `<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>\n`;
    xml += `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n`;
    xml += ` xmlns:o="urn:schemas-microsoft-com:office:office"\n`;
    xml += ` xmlns:x="urn:schemas-microsoft-com:office:excel"\n`;
    xml += ` xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n`;
    xml += `<Worksheet ss:Name="${report.reportTitle.slice(0, 30)}">\n<Table>\n`;

    // Company Header
    xml += `<Row><Cell><Data ss:Type="String">INNOVIBE MOBILITY INDIA PVT LTD</Data></Cell></Row>\n`;
    xml += `<Row><Cell><Data ss:Type="String">${this.escapeXml(report.reportTitle)}</Data></Cell></Row>\n`;
    xml += `<Row><Cell><Data ss:Type="String">Employee: ${this.escapeXml(report.employeeInfo?.name)} (${this.escapeXml(report.employeeInfo?.id)})</Data></Cell></Row>\n`;
    xml += `<Row><Cell><Data ss:Type="String">Department: ${this.escapeXml(report.employeeInfo?.department)} | ${this.escapeXml(report.employeeInfo?.designation)}</Data></Cell></Row>\n`;
    xml += `<Row><Cell><Data ss:Type="String">Period: ${this.escapeXml(report.dateRangeText)} | Generated: ${this.escapeXml(report.generatedAt)}</Data></Cell></Row>\n`;
    xml += `<Row></Row>\n`;

    // Summary Section
    if (report.summaryMetrics && report.summaryMetrics.length > 0) {
      xml += `<Row><Cell><Data ss:Type="String">REPORT SUMMARY</Data></Cell></Row>\n`;
      report.summaryMetrics.forEach((m) => {
        xml += `<Row><Cell><Data ss:Type="String">${this.escapeXml(m.label)}</Data></Cell><Cell><Data ss:Type="String">${this.escapeXml(String(m.value))}</Data></Cell></Row>\n`;
      });
      xml += `<Row></Row>\n`;
    }

    // Table Header Row
    xml += `<Row>\n`;
    report.headers.forEach((h) => {
      xml += `<Cell><Data ss:Type="String">${this.escapeXml(h)}</Data></Cell>\n`;
    });
    xml += `</Row>\n`;

    // Data Rows
    report.rows.forEach((row) => {
      xml += `<Row>\n`;
      row.forEach((cell) => {
        const val = String(cell);
        const isNum = !isNaN(Number(val)) && val.trim() !== '';
        xml += `<Cell><Data ss:Type="${isNum ? 'Number' : 'String'}">${this.escapeXml(val)}</Data></Cell>\n`;
      });
      xml += `</Row>\n`;
    });

    xml += `</Table>\n</Worksheet>\n</Workbook>`;

    const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
    this.triggerBlobDownload(blob, `${filenameStr}.xlsx`);
  }

  private static downloadPDF(filenameStr: string, report: GeneratedReportData): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow pop-ups to view & print PDF reports.');
      return;
    }

    let html = `<!DOCTYPE html><html><head><title>${report.reportTitle} - ${report.employeeInfo?.name}</title>`;
    html += `<style>
      @page { size: A4 portrait; margin: 16mm; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; background-color: #ffffff; }
      
      .brand-bar { display: flex; align-items: center; justify-between; border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px; }
      .company-name { font-size: 18px; font-weight: 900; color: #1e3a8a; letter-spacing: 0.5px; margin: 0; }
      .company-tagline { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-top: 2px; }
      .report-badge { background-color: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 20px; border: 1px solid #bfdbfe; text-transform: uppercase; }
      
      .title-section { margin-bottom: 20px; }
      .report-title { font-size: 22px; font-weight: 900; color: #0f172a; margin: 0 0 6px 0; }
      .report-meta { font-size: 11px; color: #64748b; font-weight: 600; }
      
      .emp-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      .emp-item span { font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 2px; }
      .emp-item strong { font-size: 12px; font-weight: 700; color: #1e293b; }
      
      .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
      .summary-box { background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; text-align: center; }
      .summary-label { font-size: 9px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
      .summary-val { font-size: 18px; font-weight: 900; color: #1d4ed8; }
      
      table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
      th { background-color: #1e293b; color: #ffffff; font-weight: 800; text-align: left; padding: 10px 12px; border: 1px solid #1e293b; text-transform: uppercase; font-size: 10px; }
      td { padding: 9px 12px; border: 1px solid #e2e8f0; font-weight: 500; color: #334155; }
      tr:nth-child(even) { background-color: #f8fafc; }
      
      .status-badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 9.5px; font-weight: 800; text-transform: uppercase; }
      .status-present { background-color: #dcfce7; color: #15803d; }
      .status-completed { background-color: #dcfce7; color: #15803d; }
      .status-pending { background-color: #fef3c7; color: #b45309; }
      
      .footer { margin-top: 36px; pt: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-between; align-items: center; font-size: 10px; color: #94a3b8; font-weight: 600; }
    </style></head><body>`;

    // Header & Company Logo/Title
    html += `<div class="brand-bar">
      <div>
        <h1 class="company-name">INNOVIBE MOBILITY INDIA PVT LTD</h1>
        <div class="company-tagline">Building India's Zero Back-Office EV Company • Official Executive Portal</div>
      </div>
      <div class="report-badge">CONFIDENTIAL AUDIT REPORT</div>
    </div>`;

    // Report Title
    html += `<div class="title-section">
      <h2 class="report-title">${this.escapeXml(report.reportTitle)}</h2>
      <div class="report-meta">Period Range: <strong>${this.escapeXml(report.dateRangeText)}</strong> • Generated: <strong>${this.escapeXml(report.generatedAt)}</strong></div>
    </div>`;

    // Employee Meta Details Card
    html += `<div class="emp-card">
      <div class="emp-item"><span>EMPLOYEE NAME</span><strong>${this.escapeXml(report.employeeInfo?.name || 'Sri Varun Tej')}</strong></div>
      <div class="emp-item"><span>EMPLOYEE ID</span><strong>${this.escapeXml(report.employeeInfo?.id || 'EMP-102')}</strong></div>
      <div class="emp-item"><span>DEPARTMENT</span><strong>${this.escapeXml(report.employeeInfo?.department || 'Technology')}</strong></div>
      <div class="emp-item"><span>DESIGNATION</span><strong>${this.escapeXml(report.employeeInfo?.designation || 'Senior Systems Engineer')}</strong></div>
    </div>`;

    // Summary Metrics
    if (report.summaryMetrics && report.summaryMetrics.length > 0) {
      html += `<div class="summary-grid">`;
      report.summaryMetrics.forEach((m) => {
        html += `<div class="summary-box">
          <div class="summary-label">${this.escapeXml(m.label)}</div>
          <div class="summary-val">${this.escapeXml(String(m.value))}</div>
        </div>`;
      });
      html += `</div>`;
    }

    // Detailed Records Table
    html += `<table><thead><tr>`;
    report.headers.forEach((h) => {
      html += `<th>${this.escapeXml(h)}</th>`;
    });
    html += `</tr></thead><tbody>`;

    report.rows.forEach((row) => {
      html += `<tr>`;
      row.forEach((cell) => {
        const valStr = String(cell);
        if (valStr === 'PRESENT' || valStr === 'COMPLETED' || valStr === 'EXCELLENT') {
          html += `<td><span class="status-badge status-present">${this.escapeXml(valStr)}</span></td>`;
        } else if (valStr === 'PENDING' || valStr === 'IN PROGRESS') {
          html += `<td><span class="status-badge status-pending">${this.escapeXml(valStr)}</span></td>`;
        } else {
          html += `<td>${this.escapeXml(valStr)}</td>`;
        }
      });
      html += `</tr>`;
    });

    html += `</tbody></table>`;

    // Footer Signature Notice
    html += `<div class="footer">
      <div>This is an official system-generated report from InnoVibe Enterprise Command Center.</div>
      <div>Page 1 of 1</div>
    </div>`;

    html += `<script>window.onload = function() { window.print(); };</script></body></html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  }

  private static triggerBlobDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private static escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

