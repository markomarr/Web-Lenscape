import type { Metadata } from "next";
import { LeadsTable } from "@/components/admin/leads-table";

export const metadata: Metadata = {
  title: "Dashboard · Lenscape Admin",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        Daftar pengajuan kerja sama dari formulir kualifikasi, terbaru di
        atas. Ubah status secara langsung dari kolom paling kanan setelah
        meninjau setiap pengajuan.
      </p>
      <div className="mt-6">
        <LeadsTable />
      </div>
    </div>
  );
}
