import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/service/contact-email";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ success: false, error: result.error.issues[0].message }, { status: 400 });
  }

  try {
    const sent = await sendContactEmail(result.data);
    if (!sent.success) {
      return Response.json({ success: false, error: "Unable to send your message. Please try again later." }, { status: sent.unavailable ? 503 : 502 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "Unable to send your message. Please try again later." }, { status: 502 });
  }
}
