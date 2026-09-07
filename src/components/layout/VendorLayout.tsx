import { Outlet, Link } from "react-router-dom";
import { VendorSidebar } from "../vendor/common/sidebar";
import { UserButton } from "@clerk/react";
import { Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VendorLayout() {
  return (
    <div className="min-h-screen bg-secondary/35">
      <div className="flex min-h-screen">
        <VendorSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur lg:px-6">
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground">
                <Link to="/">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  Store Home
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <UserButton />
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default VendorLayout;
