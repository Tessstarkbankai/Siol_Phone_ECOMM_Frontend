import { Link } from "react-router-dom";
import { ArrowLeft, Home, ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6 shadow-sm">
        <Store className="h-10 w-10" />
      </div>

      <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">404 Error</p>
      <h1 className="text-3xl font-bold text-foreground sm:text-5xl tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-base text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg" className="bg-primary text-white font-semibold h-12 px-7 rounded-xl shadow-md gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Back to Homepage
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="border-border font-bold h-12 px-6 rounded-xl gap-2">
          <Link to="/collections">
            <ShoppingBag className="h-4 w-4" />
            Browse Collections
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
