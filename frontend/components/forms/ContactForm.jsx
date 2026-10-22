"use client";

import { useRef, useState } from "react";
import TextAction from "../ui/TextAction";
import { toast } from "sonner";
import { contactSchema } from "../../lib/validations/contact";
import DotArrow from "../../components/ui/DotArrowProps"

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
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
      className="text-foreground flex h-full w-full flex-col gap-1.5"
    >
      <div className="mb-5 flex w-full flex-row items-center justify-between gap-3">
        <h2 id="contact-heading" className="font-doto text-lg font-bold">
          SEND ME A MESSAGE
        </h2>
        <div className="flex justify-end">
          <TextAction type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send"}
          </TextAction>
        </div>
      </div>
      <input
        id="contact-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        disabled={sending}
        aria-label="Email"
        placeholder="Email"
        className="border-foreground/40 placeholder:text-foreground focus:border-foreground mb-3 min-w-0 rounded-lg border-0 bg-white dark:bg-gray-300 p-2 pl-3 outline-none disabled:opacity-60"
      />
      <textarea
        id="contact-message"
        name="message"
        maxLength={4000}
        rows={3}
        disabled={sending}
        aria-label="Message"
        placeholder="Message"
        className="border-foreground/40 placeholder:text-foreground focus:border-foreground min-h-16 flex-1 resize-none rounded-lg border-0 bg-white dark:bg-gray-300 px-0 pt-2 pb-1 pl-3 leading-[18px] outline-none disabled:opacity-60"
      />
    </form>
  );
}
