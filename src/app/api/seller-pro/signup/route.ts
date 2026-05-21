import { recordSignup } from "@/lib/seller-pro-store";
import { getPostHogClient } from "@/lib/posthog-server";

const VALID_INTERESTS = ["analytics", "campaigns"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email, interests } = body as { email?: unknown; interests?: unknown };

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Invalid email address" }, { status: 400 });
  }

  if (!Array.isArray(interests) || !interests.every((i) => VALID_INTERESTS.includes(i))) {
    return Response.json({ ok: false, error: "Invalid interests" }, { status: 400 });
  }

  recordSignup(email, interests as string[]);

  const posthog = getPostHogClient();
  posthog.identify({ distinctId: email, properties: { email } });
  posthog.capture({
    distinctId: email,
    event: "seller_pro_signup_submitted",
    properties: { email, interests },
  });

  return Response.json({ ok: true });
}
