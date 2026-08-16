/**
 * Task Management System (TMS) - Announcement Service Layer
 * Enterprise API service abstraction connecting UI components to repository storage / future backend endpoints.
 */

import {
  AnnouncementRecord,
  CreateAnnouncementPayload,
  AnnouncementFilterParams,
  AnnouncementStatistics,
} from './announcement-models';
import { AnnouncementRepository } from './announcement-repository';

export class AnnouncementService {
  static async getAll(filters?: AnnouncementFilterParams): Promise<AnnouncementRecord[]> {
    return AnnouncementRepository.getAnnouncements(filters);
  }

  static async getById(id: string): Promise<AnnouncementRecord | null> {
    return AnnouncementRepository.getAnnouncementById(id);
  }

  static async create(payload: CreateAnnouncementPayload): Promise<AnnouncementRecord> {
    return AnnouncementRepository.createAnnouncement(payload);
  }

  static async update(id: string, patch: Partial<CreateAnnouncementPayload>): Promise<AnnouncementRecord | null> {
    return AnnouncementRepository.updateAnnouncement(id, patch);
  }

  static async delete(id: string): Promise<boolean> {
    return AnnouncementRepository.deleteAnnouncement(id);
  }

  static async togglePin(id: string): Promise<AnnouncementRecord | null> {
    return AnnouncementRepository.togglePin(id);
  }

  static async getStatistics(): Promise<AnnouncementStatistics> {
    return AnnouncementRepository.getStatistics();
  }
}
