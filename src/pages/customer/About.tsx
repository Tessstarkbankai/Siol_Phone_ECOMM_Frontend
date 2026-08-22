import { Award, CheckCircle2, ShieldCheck, Sparkles, Store, Truck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <section className="bg-[#09090b] text-white py-16 sm:py-20 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/30 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Heritage & Philosophy</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
            Engineered for Modern Everyday Life
          </h1>
          <p className="text-base text-neutral-300 max-w-2xl mx-auto sm:text-lg leading-relaxed">
            We build high-performance essentials, everyday apparel, and lifestyle accessories designed without compromise on build quality, durability, or aesthetics.
          </p>
        </div>
      </section>

      {/* 3 Pillars */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Surgical Precision & Materials</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every sneaker, hoodie, watch, and backpack is crafted using heavy-duty textiles, premium Japanese movements, and reinforced stitching.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">2-Year Comprehensive Warranty</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We stand behind every item we produce with a full 2-year warranty and a dedicated support team ready to assist.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">50,000+ Happy Customers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From metro capitals to every pin code in India, our products have earned a trusted 4.9/5 star satisfaction record.
            </p>
          </div>
        </div>

        {/* Brand Promise Banner */}
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black sm:text-3xl text-white">
              Discover the New Collection Today
            </h3>
            <p className="text-sm text-neutral-300">
              Join thousands of discerning customers upgrading their daily lifestyle essentials.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-xl shrink-0">
            <Link to="/collections">Shop All Collections</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
