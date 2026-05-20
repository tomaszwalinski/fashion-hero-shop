import { getStats } from "@/lib/seller-pro-store";

export async function GET() {
  return Response.json(getStats());
}
