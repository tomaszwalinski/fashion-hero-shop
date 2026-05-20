import { recordBannerClick } from "@/lib/seller-pro-store";

export async function POST(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  recordBannerClick(userAgent);
  return Response.json({ ok: true });
}
