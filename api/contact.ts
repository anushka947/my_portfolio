import { randomUUID } from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { contactMessageSchema } from "../shared/schema";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const payload = contactMessageSchema.parse(req.body ?? {});
    // In a serverless environment we can't persist reliably, so acknowledge receipt.
    const id = randomUUID();

    return res.status(200).json({
      success: true,
      message: "Message received",
      id,
      data: payload,
    });
  } catch (err: any) {
    if (err?.errors) {
      return res.status(400).json({ success: false, errors: err.errors });
    }

    return res
      .status(500)
      .json({ success: false, message: "Failed to process message" });
  }
}

