"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import ContactForm from "../forms/ContactForm";

export default function ContactOverlay({ onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocusElement = returnFocusRef?.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    function handleTab(event) {
      if (event.key !== "Tab") return;
      const controls = dialog.querySelectorAll("button:not([disabled]), input:not([disabled]), textarea:not([disabled])");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", handleTab);
    return () => {
      document.removeEventListener("keydown", handleTab);
      dialog.close();
      returnFocusElement?.focus();
      document.body.style.overflow = previousOverflow;
    };
  }, [returnFocusRef]);

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-background/10 p-0 text-foreground backdrop-blur-sm backdrop:bg-transparent">
      <div className="mx-auto mt-24 mb-6 w-[90%] max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#111111]">
        <div className="flex items-center justify-end px-6 py-5">
          <button type="button" onClick={onClose} aria-label="Close contact form" className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"><X aria-hidden="true" className="size-5 text-black dark:text-white" /></button>
        </div>
        <div className="mt-6 flex justify-center">
          <Image src="/new_logo_beige.png" alt="cat logo" width={200} height={200} unoptimized className="h-auto w-[140px] rounded-full md:w-[200px]" />
        </div>
        <div className="mt-6 text-center">
          <p className="font-logo text-4xl font-medium">Ria Choi</p>
          <h2 id={titleId} className="mt-3 text-lg font-medium">Send me a message</h2>
        </div>
        <ContactForm overlay />
      </div>
    </dialog>,
    document.body,
  );
}
