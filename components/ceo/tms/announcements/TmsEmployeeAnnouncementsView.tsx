'use client';

import React, { useState, useEffect } from 'react';
import { AnnouncementRecord } from '../../../../lib/announcement-models';
import { AnnouncementService } from '../../../../lib/announcement-service';
import { useRole } from '../../../../components/RoleContext';
import { Megaphone, Calendar, Download, Image as ImageIcon, FileText, Volume2, User, Building2 } from 'lucide-react';

export function TmsEmployeeAnnouncementsView() {
  const { currentProfile } = useRole();
  const cp = currentProfile as any;
  const activeEmpId = cp?.employeeId || currentProfile?.email || 'EMP-102';
  const activeDept = cp?.department || cp?.departmentName || 'Technology';

  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnnouncements = async () => {
    setIsLoading(true);
    const list = await AnnouncementService.getForUser(activeEmpId, activeDept);
    setAnnouncements(list);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnnouncements();
    const unsubscribe = AnnouncementService.onAnnouncementUpdated(() => {
      loadAnnouncements();
    });
    return () => unsubscribe();
  }, [activeEmpId, activeDept]);

  const handleDownloadAttachment = (dataUrl?: string, filename?: string) => {
    if (!dataUrl || dataUrl === '#') {
      alert(`Downloading ${filename || 'attachment'}...`);
      return;
    }
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename || 'attachment';
    a.click();
  };

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-black text-[#0F172A] tracking-tight">
          Announcements
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Stay updated with the latest news and broadcasts from your company.
        </p>
      </div>

      {/* Announcements Feed */}
      {isLoading ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 font-bold text-xs">
          Loading announcements...
        </div>
      ) : announcements.length === 0 ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-400 font-bold text-xs space-y-2">
          <Megaphone className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No announcements available.</p>
        </div>
      ) : (
        <div className="space-y-5 max-w-5xl">
          {announcements.map((ann) => {
            const isITBadge = ann.fromBadge && ann.fromBadge.toLowerCase().includes('technology');

            return (
              <div
                key={ann.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 hover:border-blue-300 transition"
              >
                {/* Top Section: Megaphone Icon + Title + Meta */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/80 mt-0.5">
                    <Megaphone className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div className="space-y-2 min-w-0 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                      {ann.title}
                    </h2>

                    {/* Meta Row: From Badge | Posted By | Timestamp */}
                    <div className="flex items-center gap-2.5 flex-wrap text-xs">
                      {/* From Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          isITBadge
                            ? 'bg-emerald-100/90 text-emerald-700 border-emerald-200/80'
                            : 'bg-rose-100/90 text-rose-700 border-rose-200/80'
                        }`}
                      >
                        From: {ann.fromBadge || (ann.senderRole.includes('Admin') ? 'Admin' : ann.senderDepartment)}
                      </span>

                      {/* Posted By */}
                      <span className="font-bold text-slate-600">
                        Posted by: <strong className="text-slate-800 font-extrabold">{ann.postedBy || ann.senderName}</strong>
                      </span>

                      {/* Timestamp */}
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ann.timeAgo || ann.createdAt}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="pl-0 sm:pl-15 text-xs text-slate-600 font-medium leading-relaxed whitespace-pre-line space-y-2">
                  <p>{ann.message}</p>

                  {/* Audio Player (if voice record attached) */}
                  {ann.voiceRecord && (
                    <div className="pt-2">
                      <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200/80 inline-flex items-center gap-3 w-full max-w-md">
                        <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <audio
                          controls
                          src={ann.voiceRecord.audioDataUrl}
                          className="w-full h-8 outline-none rounded-xl"
                        />
                      </div>
                    </div>
                  )}

                  {/* Attachments Section */}
                  {ann.attachments && ann.attachments.length > 0 && (
                    <div className="pt-3 space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        ATTACHMENTS
                      </span>

                      <div className="flex flex-wrap gap-3">
                        {ann.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 max-w-sm hover:bg-blue-50/50 hover:border-blue-200 transition"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                                {att.mimeType.includes('image') ? (
                                  <ImageIcon className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                                  {att.filename}
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium block">
                                  {att.size}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadAttachment(att.dataUrl, att.filename)}
                              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-white transition cursor-pointer shrink-0"
                              title="Download Attachment"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
