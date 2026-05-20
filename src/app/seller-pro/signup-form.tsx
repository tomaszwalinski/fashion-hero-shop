"use client";

import { useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/seller-pro/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interests }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? "Something went wrong");
      } else {
        localStorage.setItem("seller-pro-signed-up", "true");
        setSubmitted(true);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-center text-lg font-light text-charcoal py-6">
        Thanks — we&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
      {error && (
        <p className="text-red-600 text-[13px] text-center">{error}</p>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] font-medium uppercase tracking-[0.8px] text-charcoal mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-black/15 rounded px-3 py-2.5 text-[14px] text-charcoal outline-none focus:border-charcoal transition-colors"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <p className="block text-[11px] font-medium uppercase tracking-[0.8px] text-charcoal mb-3">
          Which features interest you most?
        </p>
        <div className="space-y-2">
          {[
            { value: "analytics", label: "Sales Analytics" },
            { value: "campaigns", label: "Campaign Creator" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={interests.includes(value)}
                onChange={() => toggleInterest(value)}
                className="w-4 h-4 accent-charcoal"
              />
              <span className="text-[14px] text-charcoal">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="btn-cta w-full text-[12px] disabled:opacity-50"
      >
        {submitting ? "SENDING..." : "REQUEST BETA ACCESS"}
      </button>
    </form>
  );
}
