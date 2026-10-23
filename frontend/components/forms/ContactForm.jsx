"use client";

import { useId, useRef, useState } from "react";
import TextAction from "../ui/TextAction";
import { toast } from "sonner";
import { contactSchema } from "../../lib/validations/contact";

export default function ContactForm({ overlay = false }) {
  const id = useId();
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const sendingRef = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    setFeedback(null);
    const form = event.currentTarget;
    const result = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!result.success) {
      setFeedback({ error: true, message: result.error.issues[0].message });
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
      setFeedback({ error: false, message: "Your message has been sent!" });
      toast.success("Your message has been sent!", { id: toastId });
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message. Please try again.";
      setFeedback({ error: true, message });
      toast.error(message, { id: toastId });
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
      className={overlay ? "text-foreground flex w-full flex-col gap-5 px-6 py-6" : "text-foreground flex h-full w-full flex-col gap-1.5"}
    >
      {!overlay && <div className="mb-5 flex w-full flex-row items-center justify-between gap-3">
        <h2 id="contact-heading" className="font-doto text-lg font-bold">
          SEND ME A MESSAGE
        </h2>
        <div className="flex justify-end">
          <TextAction type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send"}
          </TextAction>
        </div>
      </div>}
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        disabled={sending}
        aria-label="Email"
        placeholder="Email"
        className={overlay ? "w-full rounded-full border border-gray-200 px-5 py-3 text-foreground outline-none placeholder:text-gray-400 focus:border-accent disabled:opacity-60 dark:border-white/25" : "border-foreground/40 placeholder:text-foreground dark:placeholder:text-black focus:border-foreground mb-3 min-w-0 rounded-lg border-0 bg-white p-2 pl-3 outline-none disabled:opacity-60 dark:bg-[#eeeeee] dark:text-black"}
      />
      <textarea
        id={`${id}-message`}
        name="message"
        maxLength={4000}
        rows={3}
        disabled={sending}
        aria-label="Message"
        placeholder="Hi, Ria! I'm interested in your work..."
        className={overlay ? "min-h-32 w-full resize-y rounded-2xl border border-gray-200 px-5 py-3 text-foreground outline-none placeholder:text-gray-400 focus:border-accent disabled:opacity-60 dark:border-white/25" : "border-foreground/40 placeholder:text-foreground dark:placehoder:text-black focus:border-foreground min-h-16 min-w-0 w-full flex-1 resize-none rounded-lg border-0 bg-white px-0 pt-2 pb-1 pl-3 leading-[18px] outline-none disabled:opacity-60 dark:bg-[#eeeeee] dark:text-black dark:placeholder:text-black"}
      />
      {overlay && feedback && <p role={feedback.error ? "alert" : "status"} className="text-center text-sm">{feedback.message}</p>}
      {overlay && <button type="submit" disabled={sending} className="button-3d w-full cursor-pointer rounded-full px-6 py-4 disabled:cursor-wait disabled:opacity-50">{sending ? "Sending…" : "Send Message"}</button>}
    </form>
  );
}
