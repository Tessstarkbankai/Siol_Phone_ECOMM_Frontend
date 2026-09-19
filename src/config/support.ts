import type {
  ServiceCenter,
  RepairRecord,
  SupportTopic,
  FAQItem,
  DownloadableManual,
  DeviceServiceCategory,
  PopularCityItem,
} from "@/types/support";

/**
 * Official Brand Support Details
 */
export const SUPPORT_CONFIG = {
  brandName: "SiOL",
  tagline: "Official Flagship Service & Support",
  helpline: "+91 1800 123 4567",
  helplineFormatted: "1800-123-4567 (Toll Free)",
  whatsappNumber: "+91 98765 43210",
  whatsappUrl: "https://wa.me/919876543210?text=Hi%20SiOL%20Support,%20I%20need%20help%20with%20my%20device",
  supportEmail: "support@siol.in",
  businessHours: "Monday to Saturday, 9:00 AM – 8:00 PM IST",
  headquarters: "Cyber Galleria Mall, Lower Parel, Mumbai, Maharashtra 400013",
};

/**
 * Determines whether live human support is active right now based on IST business hours
 * (Monday - Saturday, 09:00 AM to 08:00 PM IST)
 */
export function isSupportLiveNow(): { isLive: boolean; message: string } {
  // Convert current time to Indian Standard Time (UTC+5:30)
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utcTime + 5.5 * 3600000);

  const dayOfWeek = istTime.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
  const hour = istTime.getHours();

  const isSunday = dayOfWeek === 0;
  const isWithinHours = hour >= 9 && hour < 20;

  if (isSunday) {
    return {
      isLive: false,
      message: "Closed today (Sunday). Reopens Monday at 9:00 AM IST.",
    };
  }

  if (isWithinHours) {
    return {
      isLive: true,
      message: "Support Desk Open Now • Typical response < 5 mins",
    };
  }

  if (hour < 9) {
    return {
      isLive: false,
      message: "Desk opens today at 9:00 AM IST.",
    };
  }

  return {
    isLive: false,
    message: "Desk closed for the day. Reopens tomorrow at 9:00 AM IST.",
  };
}

/**
 * Authorized Service Center Directory (Real major metro hubs across India)
 */
export const AUTHORIZED_SERVICE_CENTERS: ServiceCenter[] = [
  {
    id: "sc-mum-1",
    name: "SiOL Flagship Experience Lounge & Service Hub",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400013",
    address: "Unit 102-104, Cyber Galleria Mall, High Street Phoenix, Lower Parel",
    landmark: "Opposite Palladium Courtyard",
    phone: "+91 1800 123 4567",
    email: "mumbai.service@siol.in",
    timing: "10:00 AM – 8:30 PM",
    openDays: "Open All 7 Days",
    mapsUrl: "https://maps.google.com/?q=Lower+Parel+Mumbai",
    isFlagshipLounge: true,
    services: [
      "1-Hour Genuine Screen Replacement",
      "Official Battery Health Calibration",
      "Motherboard Micro-Soldering",
      "Camera & Optical Alignment",
      "Factory Water-Resistance Re-Sealing",
    ],
  },
  {
    id: "sc-del-1",
    name: "SiOL Central Delhi Authorized Service Pavilion",
    city: "New Delhi",
    state: "Delhi NCR",
    pincode: "110001",
    address: "B-24, Inner Circle, Connaught Place",
    landmark: "Near Rajiv Chowk Metro Gate 3",
    phone: "+91 1800 123 4567",
    email: "delhi.service@siol.in",
    timing: "10:00 AM – 7:30 PM",
    openDays: "Mon – Sat (Closed Sunday)",
    mapsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
    isFlagshipLounge: true,
    services: [
      "Same-Day Display Service",
      "Battery & Thermal Diagnostics",
      "OS Flashing & Firmware Recovery",
      "Trade-in Valuation Check",
    ],
  },
  {
    id: "sc-blr-1",
    name: "SiOL Tech Lounge & Authorized Care Center",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    address: "742, 100 Feet Road, HAL 2nd Stage, Indiranagar",
    landmark: "Beside 12th Main Junction",
    phone: "+91 1800 123 4567",
    email: "bengaluru.service@siol.in",
    timing: "10:00 AM – 8:00 PM",
    openDays: "Open All 7 Days",
    mapsUrl: "https://maps.google.com/?q=100+Feet+Road+Indiranagar+Bengaluru",
    isFlagshipLounge: true,
    services: [
      "Foldable Display Care & Hinge Tuning",
      "Express Battery Replacement",
      "Laser Back Glass Replacement",
      "Microphone & Speaker Cleaning",
    ],
  },
  {
    id: "sc-hyd-1",
    name: "SiOL Cyber Towers Authorized Service Center",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    address: "Ground Floor, Cyber Gateway, Hitec City, Madhapur",
    landmark: "Near Hitec City Metro Station",
    phone: "+91 1800 123 4567",
    email: "hyderabad.service@siol.in",
    timing: "10:00 AM – 7:30 PM",
    openDays: "Mon – Sat (Closed Sunday)",
    mapsUrl: "https://maps.google.com/?q=Hitec+City+Hyderabad",
    isFlagshipLounge: false,
    services: [
      "Hardware Diagnostics",
      "Display & Touch Sensor Replacement",
      "Warranty Claims & Paperwork",
      "Fast Charging Port Service",
    ],
  },
  {
    id: "sc-chn-1",
    name: "SiOL Anna Nagar Authorized Care Point",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600040",
    address: "Plot 311, 2nd Avenue, Anna Nagar",
    landmark: "Near Roundtana",
    phone: "+91 1800 123 4567",
    email: "chennai.service@siol.in",
    timing: "10:00 AM – 7:00 PM",
    openDays: "Mon – Sat (Closed Sunday)",
    mapsUrl: "https://maps.google.com/?q=Anna+Nagar+Chennai",
    isFlagshipLounge: false,
    services: [
      "Screen & Digitizer Replacement",
      "Battery Life Optimization",
      "Component-Level Inspection",
      "Accessories Testing",
    ],
  },
  {
    id: "sc-kol-1",
    name: "SiOL Park Street Authorized Care Facility",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700016",
    address: "48 Park Street, 2nd Floor, Camac Street Crossing",
    landmark: "Above Standard Chartered Bank",
    phone: "+91 1800 123 4567",
    email: "kolkata.service@siol.in",
    timing: "10:00 AM – 7:00 PM",
    openDays: "Mon – Sat (Closed Sunday)",
    mapsUrl: "https://maps.google.com/?q=Park+Street+Kolkata",
    isFlagshipLounge: false,
    services: [
      "Express Inspection",
      "Genuine Display Modules",
      "Battery Pack Replacement",
      "Factory Calibration",
    ],
  },
  {
    id: "sc-pun-1",
    name: "SiOL Koregaon Park Premier Care Lounge",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    address: "Lane 5, Koregaon Park North Main Road",
    landmark: "Opposite Starbucks",
    phone: "+91 1800 123 4567",
    email: "pune.service@siol.in",
    timing: "10:00 AM – 8:00 PM",
    openDays: "Open All 7 Days",
    mapsUrl: "https://maps.google.com/?q=Koregaon+Park+Pune",
    isFlagshipLounge: true,
    services: [
      "Foldable & Curved Screen Service",
      "High-Precision Thermal Gel Refresh",
      "Genuine Battery Installation",
      "Data Transfer & Device Setup",
    ],
  },
];

/**
 * Sample Demo Repair Tracking Record
 */
export const SAMPLE_REPAIR_RECORDS: Record<string, RepairRecord> = {
  "SR-89214": {
    requestId: "SR-89214",
    imei: "864209051839211",
    customerName: "Aakash Sharma",
    deviceModel: "SiOL Find X Ultra 5G (Titanium Black, 512GB)",
    issueReported: "Curved AMOLED display hairline crack after drop & fast-charging thermal calibration",
    status: "repairing",
    serviceCenter: "SiOL Flagship Experience Lounge, Lower Parel, Mumbai",
    estimatedCompletion: "Tomorrow by 5:00 PM",
    technicianNotes: "Original 120Hz LTPO AMOLED assembly installed. Currently applying OEM adhesive gasket and conducting 40-point water-resistance pressure seal verification.",
    createdAt: "Yesterday, 11:30 AM",
    updatedAt: "Today, 02:15 PM",
    timeline: [
      {
        stage: "received",
        label: "Request Received & Checked In",
        description: "Device handed over at Lower Parel Service Hub. Intake diagnostic checklist completed with customer.",
        timestamp: "Yesterday, 11:30 AM",
        completed: true,
        current: false,
      },
      {
        stage: "diagnostics",
        label: "Hardware Inspection & Diagnostic Scan",
        description: "Motherboard, battery integrity, and periscope camera passed all stress tests. Display module approved for warranty-grade replacement.",
        timestamp: "Yesterday, 03:45 PM",
        completed: true,
        current: false,
      },
      {
        stage: "repairing",
        label: "Genuine Component Replacement",
        description: "Official factory AMOLED panel and vibration motor installed in an ESD-protected cleanroom environment.",
        timestamp: "Today, 02:15 PM",
        completed: false,
        current: true,
      },
      {
        stage: "quality_check",
        label: "40-Point Quality Testing & Calibration",
        description: "Touch latency, biometric fingerprint sensor optical recalibration, and waterproof pressure chamber test.",
        timestamp: "Scheduled: Tomorrow, 11:00 AM",
        completed: false,
        current: false,
      },
      {
        stage: "ready",
        label: "Ready for Customer Pickup / Dispatch",
        description: "Device sealed in anti-static pouch with official 90-day repair warranty card ready for handover.",
        timestamp: "Estimated: Tomorrow, 05:00 PM",
        completed: false,
        current: false,
      },
    ],
  },
};

/**
 * Common Smartphone Troubleshooting Topics
 */
export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    id: "battery-drain",
    title: "Battery draining faster than expected",
    category: "battery",
    keywords: ["battery", "drain", "power", "screen on time", "overheating", "discharge"],
    summary: "Identify high background power usage, recalibrate battery statistics, and optimize 120Hz display refresh settings.",
    steps: [
      "Open Settings > Battery > Battery Usage to check for background apps consuming excess power.",
      "Enable 'Adaptive Battery' to automatically throttle power for rarely used apps.",
      "Check if 5G mode is set to 'Auto / Smart 5G' instead of 'Always On' in weak network zones.",
      "Run a battery health diagnostic scan or visit an authorized center if health drops below 80%.",
    ],
    estimatedFixTime: "5 mins",
    recommendedAction: "Self Diagnostic",
  },
  {
    id: "charging-issues",
    title: "Phone not fast-charging or charging slowly",
    category: "charging",
    keywords: ["charge", "fast charging", "supervooc", "charger", "cable", "port", "slow"],
    summary: "Check USB-C port for lint, verify power adapter wattage, and toggle Optimized Night Charging.",
    steps: [
      "Ensure you are using the original SiOL GaN power adapter and official 6A rated USB-C cable.",
      "Carefully inspect the USB-C port under bright light with a wooden toothpick to dislodge accumulated pocket lint.",
      "Check Settings > Battery > More Battery Settings > ensure 'Fast Charging' is toggled ON.",
      "Avoid charging in extreme ambient heat (>35°C), as battery safety governors automatically reduce current.",
    ],
    estimatedFixTime: "3 mins",
    recommendedAction: "Cable & Port Check",
  },
  {
    id: "screen-flicker",
    title: "Screen flickering or unresponsive touch",
    category: "screen",
    keywords: ["screen", "display", "flicker", "touch", "glass", "amoled", "ghost touch"],
    summary: "Differentiate between third-party tempered glass issues, static build-up, or physical hardware panel defects.",
    steps: [
      "Force restart the device: Press and hold Power + Volume Up buttons for 10 seconds until the SiOL logo appears.",
      "Remove thick non-certified screen protectors that may interfere with ultrasonic touch sensors.",
      "Turn off 'Developer Options > Show Pointer Location / Show Surface Updates' if previously toggled.",
      "If vertical lines or green tint persist, book a genuine display replacement at an authorized hub.",
    ],
    estimatedFixTime: "10 mins",
    recommendedAction: "Force Restart",
  },
  {
    id: "camera-blur",
    title: "Camera out of focus or blurry photos",
    category: "camera",
    keywords: ["camera", "blur", "focus", "macro", "periscope", "lens", "hasselblad"],
    summary: "Clean periscope optics, test laser autofocus sensor, and reset camera preferences to factory defaults.",
    steps: [
      "Gently wipe the camera island glass with a clean microfiber cloth. Ensure no oil film obscures the laser autofocus emitter.",
      "Open Camera > Settings > Reset Camera Settings to restore default focal presets.",
      "Tap and hold on the viewfinder to lock AF/AE and test manual slider control.",
      "Ensure protective cases do not block the secondary laser distance sensor located near the flash.",
    ],
    estimatedFixTime: "4 mins",
    recommendedAction: "Sensor Cleaning",
  },
  {
    id: "system-update",
    title: "Software update failed or stuck during download",
    category: "software",
    keywords: ["update", "ota", "software", "install", "android", "firmware", "stuck"],
    summary: "Resolve storage space bottlenecks, clear system update cache, and ensure secure Wi-Fi verification.",
    steps: [
      "Ensure your device has at least 15GB of free internal storage for uncompressed installation packages.",
      "Connect to a stable Wi-Fi network and maintain battery level above 50% or keep connected to charger.",
      "Go to Settings > Apps > App Management > Show System > Software Update > Storage Usage > Clear Cache.",
      "Restart device and re-check Settings > About Device > System Version.",
    ],
    estimatedFixTime: "15 mins",
    recommendedAction: "Clear Update Cache",
  },
  {
    id: "data-backup",
    title: "Back up your data before service or repair",
    category: "system",
    keywords: ["backup", "data", "photos", "cloud", "transfer", "repair prep", "restore"],
    summary: "Safeguard contacts, photos, and messages before handing your smartphone over to technicians.",
    steps: [
      "Go to Settings > System Settings > Back up and Reset > Local Backup to copy to USB storage or PC.",
      "Enable Google One backup in Settings > Google > Backup to safeguard photos and app credentials.",
      "Enable 'Maintenance Mode' in Settings > Device Security to lock photos and messages while keeping device diagnostic-ready.",
      "Remove SIM card, micro-SD card, and magnetic phone cases before handing over the device.",
    ],
    estimatedFixTime: "15 mins",
    recommendedAction: "Essential Pre-Repair Step",
  },
];

/**
 * Frequently Asked Questions (Categorized, clear, and authentic)
 */
export const SUPPORT_FAQS: FAQItem[] = [
  {
    category: "Getting Started",
    question: "How do I transfer my data from my old phone to my new SiOL device?",
    answer: "You can use our built-in 'SiOL Phone Clone' tool during the initial setup wizard. It seamlessly transfers photos, contacts, WhatsApp chats, call history, and applications wirelessly from any Android or iOS device in under 15 minutes without consuming cellular data.",
  },
  {
    category: "Getting Started",
    question: "Where do I find my device's IMEI and Serial Number?",
    answer: "Dial *#06# on your phone's keypad to display both IMEI 1, IMEI 2, and the Serial Number instantly on your screen. Alternatively, check Settings > About Device > Status > IMEI, or locate the barcode sticker on the original brand-sealed retail packaging.",
  },
  {
    category: "Battery & Power",
    question: "What is covered under the official battery warranty?",
    answer: "All SiOL smartphones include a 12-month standard warranty on the battery. If your battery capacity degrades below 80% of its original rated capacity within the first year through normal usage, our authorized service centers will replace it with a genuine factory battery free of charge.",
  },
  {
    category: "Battery & Power",
    question: "Does using a non-SiOL charger void my warranty?",
    answer: "Using standard USB-PD compliant chargers will not void your warranty. However, using counterfeit or uncertified fast chargers that supply unstable voltage resulting in physical motherboard or battery swelling will be classified as customer-induced damage and will not be covered under warranty.",
  },
  {
    category: "Display & Repairs",
    question: "How long does a genuine display replacement take?",
    answer: "At our Flagship Experience Centers in Mumbai, Delhi, Bengaluru, and Pune, display replacements are typically completed within 60 to 90 minutes. For standard service centers, repairs are completed same-day or within 24 hours subject to parts inventory.",
  },
  {
    category: "Display & Repairs",
    question: "Will my phone still be water-resistant after repair?",
    answer: "Yes. Our authorized service hubs use official factory pressure-sealing chambers and genuine liquid-repellent gaskets to restore IP68/IP69 water and dust resistance ratings post-repair, which is confirmed via automated vacuum pressure verification.",
  },
  {
    category: "Warranty & Coverage",
    question: "What does the 1-Year Limited Hardware Warranty cover?",
    answer: "The warranty covers manufacturing defects in materials and workmanship, including display panel failures (excluding physical cracks), motherboard issues, camera sensor malfunctions, charging port defects, and cellular modem failures occurring under normal, recommended operating conditions.",
  },
  {
    category: "Warranty & Coverage",
    question: "What is excluded from warranty coverage?",
    answer: "The warranty does not cover: physical accidental drops, liquid corrosion or immersion beyond rated specs, unauthorized third-party repairs or unapproved rooting/bootloader tampering, cracked glass, cosmetic cosmetic wear-and-tear, or damage caused by voltage spikes from uncertified chargers.",
  },
  {
    category: "Software & Security",
    question: "How many Android OS updates will my SiOL smartphone receive?",
    answer: "Our flagship series (Ultra and Pro tier) receives 4 major Android OS upgrades and 5 years of bi-monthly security patches. Standard series devices receive 3 major Android OS updates and 4 years of security maintenance from the original commercial launch date.",
  },
  {
    category: "Software & Security",
    question: "How do I activate 'Maintenance Mode' before sending my device for repair?",
    answer: "Navigate to Settings > Privacy & Security > Maintenance Mode > tap 'Turn On' and authenticate with your lockscreen PIN. This creates an isolated sandbox environment that allows technicians to run hardware diagnostic tools without having access to your photos, contacts, WhatsApp chats, or stored passwords.",
  },
];

/**
 * Downloadable Official Manuals & Policies
 */
export const DOWNLOADABLE_MANUALS: DownloadableManual[] = [
  {
    id: "doc-1",
    title: "SiOL Flagship Series Official User Manual (2025/2026 Edition)",
    category: "User Guide",
    fileSize: "8.4 MB",
    language: "English (Universal)",
    updatedAt: "January 2026",
    downloadUrl: "#",
  },
  {
    id: "doc-2",
    title: "Quick Start & First-Time Phone Setup Guide",
    category: "Quick Start",
    fileSize: "2.1 MB",
    language: "English / Hindi",
    updatedAt: "February 2026",
    downloadUrl: "#",
  },
  {
    id: "doc-3",
    title: "Official 1-Year Limited Warranty & Service Terms Booklet",
    category: "Warranty Terms",
    fileSize: "1.2 MB",
    language: "English",
    updatedAt: "2026",
    downloadUrl: "#",
  },
  {
    id: "doc-4",
    title: "Safety Information, RF Exposure & SAR Compliance Declarations",
    category: "Safety & SAR",
    fileSize: "950 KB",
    language: "English",
    updatedAt: "2026",
    downloadUrl: "#",
  },
];

/**
 * Popular Cities for Authorized Service Centers (Image-first cards)
 *
 * NOTE: These image URLs are currently loaded from high-resolution online sources.
 * To replace with Google Drive URLs or direct CDN links, simply replace the `imageUrl` field:
 * Example Google Drive Direct Link format:
 * "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"
 */
export const POPULAR_CITIES_DATA: PopularCityItem[] = [
  {
    id: "city-mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    tagline: "Flagship Experience Lounge • Lower Parel",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
    centerIds: ["sc-mum-1"],
  },
  {
    id: "city-delhi",
    cityName: "New Delhi",
    state: "Delhi NCR",
    tagline: "Central Care Pavilion • Connaught Place",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    centerIds: ["sc-del-1"],
  },
  {
    id: "city-bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    tagline: "Tech Lounge & Care Center • Indiranagar",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop",
    centerIds: ["sc-blr-1"],
  },
  {
    id: "city-hyderabad",
    cityName: "Hyderabad",
    state: "Telangana",
    tagline: "Cyber Gateway Service Point • Hitec City",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1696941515998-d83f24967aca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SHlkZXJhYmFkfGVufDB8fDB8fHww",
    centerIds: ["sc-hyd-1"],
  },
  {
    id: "city-chennai",
    cityName: "Chennai",
    state: "Tamil Nadu",
    tagline: "Authorized Care Point • Anna Nagar",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop",
    centerIds: ["sc-chn-1"],
  },
  {
    id: "city-kolkata",
    cityName: "Kolkata",
    state: "West Bengal",
    tagline: "Authorized Care Facility • Park Street",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
    centerIds: ["sc-kol-1"],
  },
  {
    id: "city-pune",
    cityName: "Pune",
    state: "Maharashtra",
    tagline: "Premier Care Lounge • Koregaon Park",
    // Can be replaced with Google Drive or CDN image URL:
    imageUrl: "https://images.unsplash.com/photo-1686543918113-69f8a94b3b67?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    centerIds: ["sc-pun-1"],
  },
];

/**
 * Image-Centric Device Service Journeys (Smartphone vs Feature Phone)
 *
 * NOTE: These image URLs can be replaced with Google Drive URLs or direct CDN links.
 */
export const DEVICE_SERVICE_JOURNEYS: Record<"smartphone" | "feature_phone", DeviceServiceCategory> = {
  smartphone: {
    id: "smartphone",
    name: "Smartphone Repair & Service",
    badge: "Certified Hardware & Display",
    tagline: "Certified repairs with genuine parts, precision calibration, and factory water-seal reconditioning.",
    // Main Banner Image (Replace with Google Drive or CDN link anytime)
    bannerImage: "./three.png",
    steps: [
      {
        stepNumber: "01",
        title: "Start Your Service Request",
        subtitle: "Tell us what's happening",
        description: "Tell us what’s happening with your device to explore troubleshooting steps or schedule service.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Fast Diagnostic",
      },
      {
        stepNumber: "02",
        title: "Bring It In or Send It In",
        subtitle: "Choose a service option",
        description: "Schedule a visit at an Authorized Service Provider or arrange an express mail-in repair.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1597424214717-38f325608d4b?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Flexible Options",
      },
      {
        stepNumber: "03",
        title: "Certified Repair with Genuine Parts",
        subtitle: "Factory precision",
        description: "Trained technicians use genuine parts and specialized tools to restore your device to original factory specifications.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Genuine Parts",
      },
      {
        stepNumber: "04",
        title: "Fully Tested, Backed by Warranty",
        subtitle: "Ready for you",
        description: "Your device is thoroughly tested, sanitized, and returned backed by our comprehensive service warranty.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Service Warranty",
      },
    ],
  },
  feature_phone: {
    id: "feature_phone",
    name: "Feature Phone Repair & Service",
    badge: "Keypad, Battery & Audio",
    tagline: "Rapid counter diagnostics, genuine tactile keypads, high-decibel speakers, and VoLTE antenna tuning.",
    // Main Banner Image (Replace with Google Drive or CDN link anytime)
    bannerImage: "./feature.png",
    steps: [
      {
        stepNumber: "01",
        title: "Quick Counter Inspection",
        subtitle: "Immediate intake",
        description: "Immediate physical evaluation of ports, tactile keypad responsiveness, and battery health on the spot.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Immediate Intake",
      },
      {
        stepNumber: "02",
        title: "Power & Circuit Diagnostics",
        subtitle: "Testing and verification",
        description: "Specialized analysis of battery discharge curves, charging circuitry, and loudspeaker acoustic output.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Diagnostic Scan",
      },
      {
        stepNumber: "03",
        title: "Genuine Part Replacement",
        subtitle: "Authentic components",
        description: "Replacement with genuine tactile keypad membranes, high-density cells, and reinforced housing.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Genuine Parts",
      },
      {
        stepNumber: "04",
        title: "Same-Day Return & Warranty",
        subtitle: "Ready in 45 mins",
        description: "Comprehensive cellular test, microphone check, and same-day handover backed by official repair warranty.",
        // Step Image (Replace with Google Drive or CDN link anytime)
        imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
        highlightBadge: "Same-Day Service",
      },
    ],
  },
};

