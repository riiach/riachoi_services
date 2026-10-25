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
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden md:overflow-y-auto border-0 bg-background/10 p-0 text-foreground backdrop-blur-sm backdrop:bg-transparent">
      <div className="mx-auto mt-6 mb-6 max-h-[calc(100dvh-3rem)] w-[90%] max-w-xl overflow-y-auto overscroll-contain md:mt-24 md:max-h-none md:overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-[#111111]">
        <div className="flex items-center justify-end px-6 py-3 md:py-5">
          <button type="button" onClick={onClose} aria-label="Close contact form" className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"><X aria-hidden="true" className="size-5 text-black dark:text-white" /></button>
        </div>
        <div className="mt-2 flex justify-center md:mt-6">
          <Image src="/new_logo_beige.png" alt="cat logo" width={200} height={200} unoptimized className="h-auto w-24 rounded-full md:w-[200px]" />
        </div>
        <div className="mt-4 text-center md:mt-6">
          <p className="font-logo text-3xl font-medium md:text-4xl">Ria Choi</p>
          <h2 id={titleId} className="mt-2 text-lg font-medium md:mt-3">Send me a message</h2>
        </div>
        <ContactForm overlay />
      </div>
    </dialog>,
    document.body,
  );
}
