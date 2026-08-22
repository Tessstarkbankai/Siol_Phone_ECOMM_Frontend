import { useState } from "react";
import { Headphones, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! Our support team will get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-[#09090b] text-white py-14 border-b border-white/10 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Get In Touch</p>
          <h1 className="text-3xl font-black sm:text-5xl text-white">Contact Customer Support</h1>
          <p className="text-sm text-neutral-300">We're here to assist you 7 days a week.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Contact Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-foreground">How Can We Help You?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Have a question regarding your order, delivery status, or warranty? Reach out to our priority team.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone & WhatsApp Support</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">+91 98765 43210</p>
                  <p className="text-xs text-muted-foreground">Mon - Sat: 9:00 AM - 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Inquiries</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">support@eshopify-official.com</p>
                  <p className="text-xs text-muted-foreground">Response time: within 4 to 12 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registered Office</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">E-Shopify Technologies India Pvt Ltd</p>
                  <p className="text-xs text-muted-foreground">DLF Cyber City, Sector 24, Gurugram, Haryana - 122002</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-lg font-black text-foreground">Send Us a Direct Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Full Name *</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="rounded-lg h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Email Address *</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="rounded-lg h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="rounded-lg h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Your Message *</label>
                <Textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can our support team assist you today?"
                  className="rounded-lg"
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-lg gap-2">
                <Send className="h-4 w-4" />
                <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
