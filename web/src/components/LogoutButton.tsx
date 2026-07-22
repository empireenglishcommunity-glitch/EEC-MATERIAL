"use client";

export default function LogoutButton({ locale, label }: { locale: string; label: string }) {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = `/${locale}/login`;
  }
  return (
    <button onClick={logout} className="text-royal-700 transition-colors hover:underline">
      {label}
    </button>
  );
}
