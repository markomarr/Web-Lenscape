import type { ReactNode } from "react";
import { signOut } from "@/app/admin/actions";
import { AdminQueryProvider } from "@/components/admin/query-provider";

// Route group `(dashboard)` keeps this chrome (header, QueryClientProvider)
// scoped to the authenticated dashboard at /admin — /admin/login sits outside
// the group and renders its own full-page layout.
export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminQueryProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                Lenscape Admin
              </p>
              <h1 className="mt-1 font-display text-xl font-medium text-foreground">
                Dashboard pengajuan
              </h1>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/30 px-5 py-2.5 text-sm tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Keluar
              </button>
            </form>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">{children}</main>
      </div>
    </AdminQueryProvider>
  );
}
