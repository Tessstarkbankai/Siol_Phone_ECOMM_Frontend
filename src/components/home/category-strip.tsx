import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Footprints,
  Grid2X2,
  Package,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { CustomerHomeCategory } from "@/features/customer/home/types";

type CategoryStripProps = {
  categories: CustomerHomeCategory[];
};

function getCategoryIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("shoe") || lower.includes("footwear") || lower.includes("sneaker")) {
    return Footprints;
  }
  if (lower.includes("hoodie") || lower.includes("streetwear") || lower.includes("apparel") || lower.includes("clothing")) {
    return Shirt;
  }
  if (lower.includes("watch") || lower.includes("time")) {
    return Clock;
  }
  if (lower.includes("bag") || lower.includes("backpack") || lower.includes("accessory")) {
    return Package;
  }
  return Grid2X2;
}

export function CategoryStrip({ categories }: CategoryStripProps) {
  if (!categories.length) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Explore Departments</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.name);

            return (
              <Link
                key={cat._id}
                to={`/collections?category=${cat._id}`}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Browse Collection →
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
