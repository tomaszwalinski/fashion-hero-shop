"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SellerProBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("seller-pro-signed-up") !== "true") {
      setHidden(false);
    }
  }, []);

  if (hidden) return null;

  function handleClick() {
    fetch("/api/seller-pro/banner-click", { method: "POST" });
  }

  return (
    <section className="bg-charcoal text-white px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 mb-2">
            NEW FOR SELLERS
          </p>
          <p className="text-lg md:text-xl font-light leading-snug max-w-xl">
            Introducing Seller PRO — analytics &amp; AI campaign creator.
            Beta pricing locked in for year one.
          </p>
        </div>
        <Link
          href="/seller-pro"
          onClick={handleClick}
          className="btn-cta bg-white text-charcoal hover:bg-white/90 whitespace-nowrap"
        >
          JOIN THE BETA
        </Link>
      </div>
    </section>
  );
}
