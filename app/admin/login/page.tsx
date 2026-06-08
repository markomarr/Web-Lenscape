import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login · Lenscape",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface/60 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1 className="mt-3 font-display text-2xl font-medium text-foreground">
          Masuk ke dashboard
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Khusus untuk tim Lenscape. Masuk dengan email dan kata sandi yang
          telah didaftarkan.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
