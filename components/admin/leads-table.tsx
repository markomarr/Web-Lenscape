"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/validation/lead";

const LEADS_QUERY_KEY = ["admin", "leads"] as const;

const statusLabels: Record<LeadStatus, string> = {
  baru: "Baru",
  ditinjau: "Ditinjau",
  disetujui: "Disetujui",
};

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

async function fetchLeads(): Promise<Lead[]> {
  const response = await fetch("/api/admin/leads");
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Gagal memuat data pengajuan.");
  }
  const body = (await response.json()) as { leads: Lead[] };
  return body.leads;
}

async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const response = await fetch(`/api/admin/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Gagal memperbarui status.");
  }
}

export function LeadsTable() {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({
    queryKey: LEADS_QUERY_KEY,
    queryFn: fetchLeads,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      updateLeadStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEADS_QUERY_KEY });
    },
  });

  if (leadsQuery.isLoading) {
    return <p className="text-sm text-muted">Memuat data pengajuan…</p>;
  }

  if (leadsQuery.isError) {
    return (
      <p role="alert" className="text-sm text-red-600">
        {leadsQuery.error instanceof Error
          ? leadsQuery.error.message
          : "Gagal memuat data pengajuan."}
      </p>
    );
  }

  const leads = leadsQuery.data ?? [];

  if (leads.length === 0) {
    return (
      <p className="text-sm text-muted">Belum ada pengajuan yang masuk.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">Nama</th>
            <th scope="col" className="px-5 py-3 font-medium">Email</th>
            <th scope="col" className="px-5 py-3 font-medium">Kategori</th>
            <th scope="col" className="px-5 py-3 font-medium">Tanggal submit</th>
            <th scope="col" className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-5 py-4 align-top text-foreground">{lead.name}</td>
              <td className="px-5 py-4 align-top text-muted">{lead.email}</td>
              <td className="px-5 py-4 align-top text-muted">{lead.category}</td>
              <td className="px-5 py-4 align-top text-muted">
                {dateFormatter.format(new Date(lead.createdAt))}
              </td>
              <td className="px-5 py-4 align-top">
                <select
                  value={lead.status}
                  disabled={statusMutation.isPending}
                  onChange={(event) =>
                    statusMutation.mutate({
                      id: lead.id,
                      status: event.target.value as LeadStatus,
                    })
                  }
                  aria-label={`Ubah status pengajuan dari ${lead.name}`}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60"
                >
                  {LEAD_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {statusMutation.isError && (
        <p role="alert" className="border-t border-border px-5 py-3 text-sm text-red-600">
          {statusMutation.error instanceof Error
            ? statusMutation.error.message
            : "Gagal memperbarui status."}
        </p>
      )}
    </div>
  );
}
