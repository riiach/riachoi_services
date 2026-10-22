"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();
    if (!message) {
      event.currentTarget.elements.message.setCustomValidity("Please enter a message.");
      event.currentTarget.elements.message.reportValidity();
      return;
    }
    const subject = encodeURIComponent("Website enquiry");
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.location.href = `mailto:riiachoii@gmail.com?subject=${subject}&body=${body}`;
    setStatus("Continue sending in your email app.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full w-full flex-col gap-2 text-black">
      <label className="block text-xs" htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="min-w-0 rounded-none border-0 border-b border-black/40 bg-transparent px-0 pb-1 text-sm outline-none placeholder:text-black/50 focus:border-black" />
      <label className="block text-xs" htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" required maxLength={4000} rows={2} placeholder="Tell me what you have in mind" onChange={(event) => event.currentTarget.setCustomValidity("")} className="min-h-0 flex-1 resize-none rounded-none border-0 border-b border-black/40 bg-transparent px-0 pb-1 text-sm outline-none placeholder:text-black/50 focus:border-black" />
      <div className="flex items-center justify-between gap-2">
        <p aria-live="polite" className="text-[10px] leading-tight text-black/65">{status || "Opens your email app"}</p>
        <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-white to-neutral-200 px-4 py-1.5 text-xs font-medium text-black shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Send <ArrowUpRight aria-hidden="true" className="size-3.5" /></button>
      </div>
    </form>
  );
}
