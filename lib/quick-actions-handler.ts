/**
 * Executive Quick Actions Handler Utility
 * Utility functions for client-side file exports, filter preservation, and deep routing.
 */

export function downloadClientExportFile(filename: string, content: string, mimeType: string = 'text/csv;charset=utf-8;') {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateReportCsv(title: string, headers: string[], rows: (string | number)[][]): string {
  const timestamp = new Date().toLocaleString();
  let csv = `# INOVIBE EXECUTIVE REPORT: ${title.toUpperCase()}\n`;
  csv += `# Generated At: ${timestamp}\n`;
  csv += `# Single Source of Truth: InnoVibe Enterprise Proxy Gateway\n\n`;
  csv += headers.join(',') + '\n';
  rows.forEach((row) => {
    csv += row.map((val) => `"${val}"`).join(',') + '\n';
  });
  return csv;
}
