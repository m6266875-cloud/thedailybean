import { db } from "@/db";
import { pickupOrders } from "@/db/schema";

const validItems = new Set([
  "Field Notes Latte",
  "Honey Sea Salt Latte",
  "Almond Croissant",
  "Drip Coffee",
]);

const validPickupTimes = new Set([
  "asap",
  "30-minutes",
  "1-hour",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { item?: unknown; customerName?: unknown; pickupTime?: unknown };
    const item = typeof body.item === "string" ? body.item.trim() : "";
    const customerName = typeof body.customerName === "string" ? body.customerName.trim() : "";
    const pickupTime = typeof body.pickupTime === "string" ? body.pickupTime : "";

    if (!validItems.has(item) || !validPickupTimes.has(pickupTime) || customerName.length < 2 || customerName.length > 80) {
      return Response.json({ error: "Please complete the pickup form before placing your order." }, { status: 400 });
    }

    const [order] = await db.insert(pickupOrders).values({ item, customerName, pickupTime }).returning({ id: pickupOrders.id });
    return Response.json({ ok: true, orderId: order.id }, { status: 201 });
  } catch {
    return Response.json({ error: "We couldn’t place that order just now. Please try again." }, { status: 500 });
  }
}
