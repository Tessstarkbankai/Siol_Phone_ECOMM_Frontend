export type RepairStatusStage =
  | "received"
  | "diagnostics"
  | "repairing"
  | "quality_check"
  | "ready";

export type RepairRecord = {
  requestId: string;
  imei: string;
  customerName: string;
  deviceModel: string;
  issueReported: string;
  status: RepairStatusStage;
  serviceCenter: string;
  estimatedCompletion: string;
  technicianNotes: string;
  createdAt: string;
  updatedAt: string;
  timeline: Array<{
    stage: RepairStatusStage;
    label: string;
    description: string;
    timestamp?: string;
    completed: boolean;
    current: boolean;
  }>;
};

export type ServiceCenter = {
  id: string;
  name: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  landmark?: string;
  phone: string;
  email: string;
  timing: string;
  openDays: string;
  mapsUrl: string;
  services: string[];
  isFlagshipLounge?: boolean;
};

export type SupportTopic = {
  id: string;
  title: string;
  category: "battery" | "screen" | "charging" | "camera" | "software" | "system" | "network";
  keywords: string[];
  summary: string;
  steps: string[];
  estimatedFixTime?: string;
  recommendedAction?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
  category: "Getting Started" | "Battery & Power" | "Display & Repairs" | "Warranty & Coverage" | "Software & Security";
};

export type DownloadableManual = {
  id: string;
  title: string;
  category: "User Guide" | "Quick Start" | "Safety & SAR" | "Warranty Terms";
  fileSize: string;
  language: string;
  updatedAt: string;
  downloadUrl: string;
};
