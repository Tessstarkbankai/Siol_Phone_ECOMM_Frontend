import { CheckCircle2, Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components/ui/rating-stars";

const testimonials = [
  {
    id: 1,
    name: "Dr. Ananya Roy",
    city: "Mumbai",
    rating: 5,
    product: "Crimson Edge 4.5L Air Fryer",
    quote:
      "The best air fryer I've ever owned. French fries and paneer tikka come out crispy on the outside and tender inside with just a spray of oil. Super easy to clean!",
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    city: "Bengaluru",
    rating: 5,
    product: "Royal Velvet 4-Pc Cookware Set",
    quote:
      "MetaTuff coating is truly durable. Even without butter or oil, dosas and omelettes slide right off without sticking. Exceptional quality and induction compatibility.",
  },
  {
    id: 3,
    name: "Pooja Hegde",
    city: "Hyderabad",
    rating: 5,
    product: "Nutri-blend 500W High Speed Blender",
    quote:
      "Grinds soaked chutneys, dry spices, and protein smoothies in less than 30 seconds. Compact, powerful, and looks gorgeous on my kitchen countertop!",
  },
  {
    id: 4,
    name: "Siddharth Sen",
    city: "Delhi NCR",
    rating: 5,
    product: "Regalia 15-Bar Espresso Machine",
    quote:
      "The coffee aroma and crema density match high-end European espresso bars. The steam wand creates velvety micro-foam for lattes effortlessly.",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="py-14 bg-neutral-50 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            <Quote className="h-3.5 w-3.5" />
            <span>Customer Stories</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
            Trusted by 50,000+ Home Chefs
          </h2>
          <p className="text-sm text-neutral-600">
            Real feedback from verified buyers across India on performance, ease of use, and durability.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="bg-white border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow rounded-2xl p-1"
            >
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <RatingStars rating={item.rating} showCount={false} size="sm" />
                  <p className="text-sm text-neutral-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
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
