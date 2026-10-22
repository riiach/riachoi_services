"use client";

import { useRef, useState } from "react";
import GradientAction from "../ui/GradientAction";
import { toast } from "sonner";
import { contactSchema } from "../../lib/validations/contact";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const result = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      form.elements.email.focus();
      return;
    }

    sendingRef.current = true;
    setSending(true);
    const toastId = toast.loading("Sending your message…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to send your message. Please try again.");
      }
      toast.success("Your message has been sent!", { id: toastId });
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send your message. Please try again.", { id: toastId });
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={sending} className="flex h-full w-full flex-col gap-1.5 text-black">
      <label className="block text-xs" htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={sending} placeholder="you@example.com" className="min-w-0 rounded-none border-0 border-b border-black/40 bg-transparent px-0 pb-1 text-sm outline-none placeholder:text-black/50 focus:border-black disabled:opacity-60" />
      <label className="block text-xs" htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" maxLength={4000} rows={5} disabled={sending} placeholder="Tell me what you have in mind" className="min-h-[95px] flex-1 resize-none rounded-none border-0 border-b border-black/40 bg-transparent px-0 pb-1 text-sm leading-[18px] outline-none placeholder:text-black/50 focus:border-black disabled:opacity-60" />
      <div className="flex justify-end">
        <GradientAction type="submit" disabled={sending}>{sending ? "Sending…" : "Send"}</GradientAction>
      </div>
    </form>
  );
}
