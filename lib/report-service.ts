/**
 * Task Management System (TMS) - Report Service Layer
 * Enterprise API service abstraction connecting UI components to Report and Export engines.
 */

import { ReportConfig, GeneratedReportData } from './report-models';
import { ReportEngine } from './report-engine';
import { ExportEngine } from './export-engine';

export class ReportService {
  static async generate(config: ReportConfig): Promise<GeneratedReportData> {
    return ReportEngine.generateReportData(config);
  }

  static async export(config: ReportConfig): Promise<GeneratedReportData> {
    const reportData = await ReportEngine.generateReportData(config);
    ExportEngine.exportReport(reportData, config.exportFormat);
    return reportData;
  }
}
