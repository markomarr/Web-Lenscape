import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/validation/lead";

// Admin-only: list leads, newest first. Auth is enforced twice — proxy.ts
// redirects unauthenticated browser navigation, and this inline check (plus
// the RLS policies on `leads`) protects the endpoint itself, since Route
// Handlers are public URLs.

type LeadRow = {
  id: string;
  created_at: string;
  status: Lead["status"];
  name: string;
  email: string;
  phone: string | null;
  category: string;
  event_date: string | null;
  needs: string;
  budget: string | null;
  reference: string | null;
};

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    category: row.category,
    eventDate: row.event_date,
    needs: row.needs,
    budget: row.budget,
    reference: row.reference,
  };
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, created_at, status, name, email, phone, category, event_date, needs, budget, reference"
    )
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data.map(mapLead) });
}
