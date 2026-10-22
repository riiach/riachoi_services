// Reuse the site's configured Resend account and verified sender.
export async function sendContactEmail({ email, message }) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ADMIN_EMAIL;
  if (!process.env.RESEND_API_KEY || !from || !to) {
    return { success: false, unavailable: true };
  }

  const { resend } = await import("@/lib/resend");
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: "New website enquiry",
    text: `From: ${email}\n\n${message}`,
  });
  return { success: !error && Boolean(data?.id) };
}
