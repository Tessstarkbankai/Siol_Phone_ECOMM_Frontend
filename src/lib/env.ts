const LIVE_BACKEND_URL = "https://siol-phone-ecomm-backend.onrender.com";
const LOCAL_BACKEND_URL = "http://localhost:5000";

function cleanUrl(url?: string | null): string {
  if (!url) return "";
  return url.trim().replace(/\/+$/, "");
}

function resolveBackendUrl(): string {
  // 1. Runtime override via localStorage (handy for testing live vs localhost in browser)
  if (typeof window !== "undefined") {
    try {
      const override = window.localStorage.getItem("SIOL_BACKEND_URL");
      if (override && override.trim()) {
        return cleanUrl(override);
      }
    } catch {
      // ignore storage access errors
    }
  }

  // 2. Read Vite environment variable
  const envUrl = cleanUrl(import.meta.env.VITE_BACKEND_URL);

  // 3. If running on a live hosted domain (Vercel, Netlify, Render, custom domain),
  // always route to the live backend rather than failing on localhost
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]";

    if (!isLocalhost) {
      if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
        return LIVE_BACKEND_URL;
      }
      return envUrl;
    }
  }

  // 4. In production builds (vite build), default to live backend if localhost was configured
  if (import.meta.env.PROD) {
    if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
      return LIVE_BACKEND_URL;
    }
  }

  // 5. Localhost in development mode
  return envUrl || LOCAL_BACKEND_URL;
}

const currentBackendUrl = resolveBackendUrl();

export const env = {
  backendUrl: currentBackendUrl,
  liveBackendUrl: LIVE_BACKEND_URL,
  localBackendUrl: LOCAL_BACKEND_URL,
  isLive: currentBackendUrl.includes("onrender.com"),
};
