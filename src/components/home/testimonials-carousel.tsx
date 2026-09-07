import { CheckCircle2, Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/ui/rating-stars";

const testimonials = [
  {
    id: 1,
    name: "Dr. Ananya Roy",
    city: "Mumbai",
    rating: 5,
    product: "iPhone 16 Pro Max (Desert Titanium)",
    quote:
      "The 4K 120fps Dolby Vision and Camera Control button are game changers for travel vlogging. Battery easily lasts 1.5 full days. Delivered in 24 hours with sealed official warranty!",
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    city: "Bengaluru",
    rating: 5,
    product: "Galaxy S25 Ultra (Titanium Gray)",
    quote:
      "Galaxy AI Live Translate and 100x Space Zoom blew me away during concert shooting. The anti-reflective Gorilla Armor screen is unmatched under bright sunlight.",
  },
  {
    id: 3,
    name: "Pooja Hegde",
    city: "Hyderabad",
    rating: 5,
    product: "Galaxy Z Fold6 5G (Silver Shadow)",
    quote:
      "Multitasking on the 7.6-inch inner screen feels like holding an ultra-light laptop. Split screen trading and video editing run butter-smooth without any thermal throttling.",
  },
  {
    id: 4,
    name: "Siddharth Sen",
    city: "Delhi NCR",
    rating: 5,
    product: "Pixel 9 Pro XL (Obsidian 256GB)",
    quote:
      "Gemini Live and Magic Editor make photo editing effortless. Best smartphone camera consistency on the market with 7 years of guaranteed Android updates.",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-14 bg-gradient-to-b from-white via-blue-50/20 to-white border-y border-blue-100/70 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Quote className="h-3.5 w-3.5" />
            <span>Buyer Feedback</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Trusted by 50,000+ Tech Enthusiasts
          </h2>
          <p className="text-sm text-slate-600">
            Real feedback from verified buyers across India on camera performance, battery endurance, and same-day dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="bg-white border-blue-100/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all rounded-3xl p-1"
            >
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <RatingStars rating={item.rating} showCount={false} size="sm" />
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-blue-50">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-neutral-900">{item.name}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Buyer
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">{item.city} • {item.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
