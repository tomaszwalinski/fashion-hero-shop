import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Seller PRO - FashionHero",
  description:
    "Sales analytics & AI-powered campaign creator. Beta pricing for early adopters.",
};

const features = [
  {
    label: "SALES ANALYTICS",
    title: "Know What Sells — Before It Sells Out",
    description:
      "Track revenue trends, discover seasonal patterns, and benchmark your store against category averages. Dashboards built for sellers, not data scientists.",
  },
  {
    label: "CAMPAIGN CREATOR",
    title: "AI That Plans Your Next Drop",
    description:
      "Tell us what's in your inventory. Our AI suggests what to list, when to list it, and at what price — based on real demand signals from across the marketplace.",
  },
];

export default function SellerProPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/hero/hero-3.jpg"
          alt="Seller PRO"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-[11px] font-medium uppercase tracking-[1px] mb-4 text-white/60">
            COMING SOON
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight max-w-2xl mb-4">
            Seller PRO
          </h1>
          <p className="text-lg font-light text-white/80 max-w-xl">
            Sales analytics &amp; AI-powered campaign creator.
            <br />
            Beta pricing for early adopters.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-12 text-center">
            WHAT YOU GET
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((f) => (
              <div key={f.label} className="text-center md:text-left">
                <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray mb-2">
                  {f.label}
                </p>
                <h3 className="text-xl font-normal text-charcoal mb-3">{f.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-cream-light py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-4">
            BETA PRICING
          </p>
          <h2 className="text-3xl font-light text-charcoal mb-6">
            Locked-in beta pricing for year one.
            <br />
            Final price TBD.
          </h2>
          <ul className="text-sm text-warm-gray space-y-2 mb-10 inline-block text-left">
            <li>✓ Early access before public launch</li>
            <li>✓ Lowest price we&apos;ll ever offer — locked in for 12 months</li>
            <li>✓ Direct line to the product team</li>
            <li>✓ Your feedback shapes the roadmap</li>
          </ul>
        </div>
      </section>

      {/* Signup form */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-4">
            JOIN THE BETA
          </p>
          <h2 className="text-3xl font-light text-charcoal mb-4">
            Be first in line.
          </h2>
          <p className="text-sm text-warm-gray">
            Leave your email and we&apos;ll reach out with details as soon as the beta opens.
          </p>
        </div>
        <SignupForm />
      </section>
    </div>
  );
}
