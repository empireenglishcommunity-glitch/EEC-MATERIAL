"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type FormDict = Dictionary["waitlist"]["form"];

export default function WaitlistForm({ form, guideHref }: { form: FormDict; guideHref: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-royal-50 p-8 text-center">
        <p className="text-lg font-semibold text-royal-900">{form.success}</p>
        <a
          href={guideHref}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-gold-500 px-6 py-3 font-bold text-royal-950 transition-colors hover:bg-gold-400"
        >
          {form.getGuide}
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-royal-200 bg-white p-3 text-ink outline-none focus:border-royal-600 focus:ring-2 focus:ring-royal-200";
  const labelClass = "mb-1.5 block text-sm font-bold text-royal-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>{form.name}</label>
        <input name="name" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>{form.contact}</label>
        <input name="contact" required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>{form.country}</label>
        <input name="country" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>{form.goal}</label>
        <select name="goal" defaultValue="" className={inputClass}>
          <option value="" disabled>
            —
          </option>
          {form.goalOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>{form.level}</label>
        <select name="level" defaultValue="" className={inputClass}>
          <option value="" disabled>
            —
          </option>
          {form.levelOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gold-500 px-6 py-3.5 text-base font-bold text-royal-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
      >
        {status === "loading" ? "…" : form.submit}
      </button>
      {status === "error" && <p className="text-center text-sm text-red-600">{form.error}</p>}
      <p className="text-center text-xs text-ink/60">{form.reassurance}</p>
    </form>
  );
}
