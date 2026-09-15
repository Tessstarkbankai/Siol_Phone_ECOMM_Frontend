import { CheckCircle2, Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { RatingStars } from "@/components/ui/rating-stars";

const testimonials = [
  {
    id: 1,
    name: "Dr. Ananya Roy",
    city: "Mumbai",
    rating: 5,
    product: "iPhone 16 Pro Max",
    tag: "Desert Titanium",
    quote:
      "The 4K 120fps Dolby Vision and Camera Control button are game changers for travel vlogging. Battery easily lasts 1.5 full days. Delivered in 24 hours with sealed official warranty!",
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    city: "Bengaluru",
    rating: 5,
    product: "Galaxy S25 Ultra",
    tag: "Titanium Gray",
    quote:
      "Galaxy AI Live Translate and 100x Space Zoom blew me away during concert shooting. The anti-reflective Gorilla Armor screen is unmatched under bright sunlight.",
  },
  {
    id: 3,
    name: "Pooja Hegde",
    city: "Hyderabad",
    rating: 5,
    product: "Galaxy Z Fold6",
    tag: "Silver Shadow",
    quote:
      "Multitasking on the 7.6-inch inner screen feels like holding an ultra-light laptop. Split screen trading and video editing run butter-smooth without any thermal throttling.",
  },
  {
    id: 4,
    name: "Siddharth Sen",
    city: "Delhi NCR",
    rating: 5,
    product: "Pixel 9 Pro XL",
    tag: "Obsidian 256GB",
    quote:
      "Gemini Live and Magic Editor make photo editing effortless. Best smartphone camera consistency on the market with 7 years of guaranteed Android updates.",
  },
  {
    id: 5,
    name: "Rohan Kulkarni",
    city: "Pune",
    rating: 5,
    product: "SiOL Alpha 6",
    tag: "Midnight Blue",
    quote:
      "Incredible value for money! The 120Hz AMOLED display and 65W fast charging feel like a ₹50,000 phone for a fraction of the cost. Super smooth software.",
  },
  {
    id: 6,
    name: "Meera Nair",
    city: "Kochi",
    rating: 5,
    product: "Sony WH-1000XM5",
    tag: "Silver Edition",
    quote:
      "Noise cancelling on flights is phenomenal. Battery easily lasts through international round trips. Genuine sealed box with official brand warranty certificate.",
  },
  {
    id: 7,
    name: "Karan Johar",
    city: "Chandigarh",
    rating: 5,
    product: "OnePlus 13",
    tag: "Emerald Green",
    quote:
      "Snapdragon 8 Elite is a gaming powerhouse. 185Hz display responsiveness in BGMI is unreal with zero frame drops during prolonged competitive sessions.",
  },
  {
    id: 8,
    name: "Tanvi Sharma",
    city: "Jaipur",
    rating: 5,
    product: "SiOL Classic 4G",
    tag: "Matte Titanium",
    quote:
      "Bought this as a secondary detox phone for my parents. Crystal clear HD voice calling, loud dual speakers, and the battery lasts almost an entire week!",
  },
];

const firstRow = testimonials.slice(0, 4);
const secondRow = testimonials.slice(4);

function ReviewCard({ item }: { item: (typeof testimonials)[0] }) {
  return (
    <div className="relative w-[280px] sm:w-[320px] md:w-[380px] shrink-0 rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/40 flex flex-col justify-between space-y-3 sm:space-y-4 cursor-pointer">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <RatingStars rating={item.rating} showCount={false} size="sm" />
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="h-3 w-3" />
            Verified Buyer
          </span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
          "{item.quote}"
        </p>
      </div>

      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-left">
        <div>
          <p className="font-bold text-xs sm:text-sm text-neutral-900">{item.name}</p>
          <p className="text-[11px] text-neutral-500">{item.city}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-xs text-primary">{item.product}</p>
          <p className="text-[10px] text-neutral-400">{item.tag}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="relative py-8 sm:py-14 md:py-16 bg-gradient-to-b from-white via-blue-50/25 to-white border-y border-neutral-200/70 overflow-hidden my-4 sm:my-8 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          <Quote className="h-3.5 w-3.5" />
          <span>Verified Buyer Feedback</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900">
          Trusted by 50,000+ Tech Enthusiasts
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto">
          Real feedback from verified buyers across India on camera performance, battery endurance, and same-day dispatch.
        </p>
      </div>

      {/* Marquee Container with Left & Right Gradient Masking */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden gap-4">
        {/* Row 1: Smooth horizontal scroll */}
        <Marquee pauseOnHover className="[--duration:35s] [--gap:1.25rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} item={review} />
          ))}
        </Marquee>

        {/* Row 2: Reverse smooth horizontal scroll */}
        <Marquee reverse pauseOnHover className="[--duration:38s] [--gap:1.25rem]">
          {secondRow.map((review) => (
            <ReviewCard key={review.id} item={review} />
          ))}
        </Marquee>

        {/* Left & Right Edge Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent" />
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
