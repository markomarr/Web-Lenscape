import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// On-demand Sanity revalidation (prd.md Section 8 Open Question #7 — decided:
// webhook-based, not time-based ISR).
//
// Auth is a plain shared-secret header comparison (not HMAC payload signing)
// per the build brief: "verify SANITY_WEBHOOK_SECRET di header". Configure the
// Sanity webhook (sanity.io/manage → API → Webhooks) with:
//   URL:     https://<your-domain>/api/revalidate
//   Headers: sanity-webhook-secret: <same value as SANITY_WEBHOOK_SECRET>
//   Filter:  _type in ["project", "category"]
//   Payload: { "_type": _type }

const TAGS_BY_TYPE: Record<string, string[]> = {
  project: ["sanity:project"],
  category: ["sanity:category", "sanity:project"],
};

type WebhookPayload = { _type?: string };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error(
      "SANITY_WEBHOOK_SECRET belum diset. Isi nilainya di .env.local sebelum " +
        "mengaktifkan webhook revalidation di sanity.io/manage."
    );
  }

  const provided = request.headers.get("sanity-webhook-secret");
  if (provided !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const type = payload._type;
  const tags = type ? TAGS_BY_TYPE[type] : undefined;
  if (!tags) {
    return NextResponse.json(
      { message: `Tidak ada tag untuk _type "${type ?? "(kosong)"}"` },
      { status: 400 }
    );
  }

  // Next.js 16 requires an explicit cache-life profile when revalidating a
  // tag — 'max' is the recommended stale-while-revalidate choice for
  // webhook-triggered, on-demand purges (see node_modules/next/dist/docs
  // .../09-revalidating.md).
  tags.forEach((tag) => revalidateTag(tag, "max"));
  return NextResponse.json({ revalidated: true, tags });
}
