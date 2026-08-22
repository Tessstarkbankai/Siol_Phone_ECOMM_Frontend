import { Outlet } from "react-router-dom";
import { TopUtilityBar } from "./TopUtilityBar";
import { CustomerNavbar } from "../customer/common/desktop-navbar";
import { Footer } from "./Footer";

export function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Utility Bar */}
      <TopUtilityBar />

      {/* Main Header / Navbar */}
      <CustomerNavbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Multi-Column Footer */}
      <Footer />
    </div>
  );
}
