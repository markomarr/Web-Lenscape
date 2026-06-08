import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/validation/lead";

// Admin-only: update a single lead's status (inline status change in the
// dashboard table). See app/api/admin/leads/route.ts for the auth-layering note.

function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" &&
    (LEAD_STATUSES as readonly string[]).includes(value)
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const status =
    body && typeof body === "object" ? (body as { status?: unknown }).status : undefined;

  if (!isLeadStatus(status)) {
    return NextResponse.json(
      { message: `Status harus salah satu dari: ${LEAD_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("leads").update({ status }).eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ id, status });
}
