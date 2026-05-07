import { resend } from "@/lib/resend";
import { saveEmailLog } from "@/lib/repository/email-log";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { EstimateEmail } from "@/emails/EstimateEmail";
import { AdminEstimateNotificationEmail } from "@/emails/AdminEstimateNotificationEmail.jsx";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL; // Sender email address
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Admin email address

export async function sendWelcomeEmail({ to }) {
  const subject = "Welcome to Ria Choi Portfolio Blog";

  try {
    const { data, error } = await resend.emails.send({
      // .send() sends an email through Resend
      from: FROM_EMAIL,
      to: [to],
      subject,
      react: WelcomeEmail({ email: to }),
    });

    if (error) {
      await saveEmailLog({
        type: "WELCOME",
        recipient: to,
        subject,
        status: "FAILED",
        error: JSON.stringify(error),
      });

      return { success: false, error };
    }

    await saveEmailLog({
      type: "WELCOME",
      recipient: to,
      subject,
      status: "SENT",
      resendId: data?.id,
    });

    return { success: true, data };
  } catch (error) {
    await saveEmailLog({
      type: "WELCOME",
      recipient: to,
      subject,
      status: "FAILED",
      error: error.message,
    });

    return { success: false, error };
  }
}

export async function sendEstimateEmail({
  to,
  name,
  selectedFeatures,
  subtotal,
  total,
}) {
  const subject = "Your Estimate Request Summary";

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      react: EstimateEmail({
        name,
        selectedFeatures,
        subtotal,
        total,
      }),
    });

    if (error) {
      await saveEmailLog({
        type: "ESTIMATE",
        recipient: to,
        subject,
        status: "FAILED",
        error: JSON.stringify(error),
      });

      return { success: false, error };
    }

    await saveEmailLog({
      type: "ESTIMATE",
      recipient: to,
      subject,
      status: "SENT",
      resendId: data?.id,
    });

    return { success: true, data };
  } catch (error) {
    await saveEmailLog({
      type: "ESTIMATE",
      recipient: to,
      subject,
      status: "FAILED",
      error: error.message,
    });

    return { success: false, error };
  }
}

export async function sendAdminEstimateNotification({
  name,
  email,
  selectedFeatures,
  subtotal,
  total,
}) {
  const subject = "New Estimate Request Received";

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject,
      react: AdminEstimateNotificationEmail({
        name,
        email,
        selectedFeatures,
        subtotal,
        total,
      }),
    });

    if (error) {
      await saveEmailLog({
        type: "ADMIN_ESTIMATE_NOTIFICATION",
        recipient: ADMIN_EMAIL,
        subject,
        status: "FAILED",
        error: JSON.stringify(error),
      });

      return { success: false, error };
    }

    await saveEmailLog({
      type: "ADMIN_ESTIMATE_NOTIFICATION",
      recipient: ADMIN_EMAIL,
      subject,
      status: "SENT",
      resendId: data?.id,
    });

    return { success: true, data };
  } catch (error) {
    await saveEmailLog({
      type: "ADMIN_ESTIMATE_NOTIFICATION",
      recipient: ADMIN_EMAIL,
      subject,
      status: "FAILED",
      error: error.message,
    });

    return { success: false, error };
  }
}