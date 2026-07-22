"use client";

import { useState } from "react";

type Labels = { email: string; password: string; submit: string; error: string };

export default function LoginForm({ locale, labels }: { locale: string; labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      window.location.href = `/${locale}/portal`;
    } else {
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-xl border border-royal-200 p-3 outline-none focus:border-royal-600 focus:ring-2 focus:ring-royal-200";

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <input name="email" type="email" required placeholder={labels.email} className={input} />
      <input name="password" type="password" required placeholder={labels.password} className={input} />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-gold-500 px-6 py-3 font-bold text-royal-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
      >
        {status === "loading" ? "…" : labels.submit}
      </button>
      {status === "error" && <p className="text-center text-sm text-red-600">{labels.error}</p>}
    </form>
  );
}
