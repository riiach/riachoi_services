import { prisma } from "@/lib/prisma.ts";

export async function saveEmailLog({
  type,
  recipient,
  subject,
  status,
  resendId = null,
  error = null,
                                   }) {
  return prisma.emailLog.create({
    data: {
      type,
      recipientEmail: recipient,
      subject,
      status,
      resendEmailId: resendId,
      error,
    },
  });
}