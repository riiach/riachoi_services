"use client";

import { useEffect, useRef, useState } from "react";
import { X, Mail } from "lucide-react";
import { toast } from "sonner";
import AnimatedButton from "../../components/ui/AnimatedButton";
import Image from "next/image";

export default function SubscribeOverlay({ children }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeSubscribe = () => {
    setOpen(false);

    setForm({
      name: "",
      email: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Subscribed successfully!");
        closeSubscribe();
        return;
      }

      toast.error(data.error || "Failed to subscribe.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeSubscribe();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        closeSubscribe();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/10 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="mx-auto mt-24 w-[90%] max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />

                <h2 className="text-xl font-semibold text-black">
                  Subscribe
                </h2>
              </div>

              <button
                type="button"
                onClick={closeSubscribe}
                aria-label="Close subscribe form"
                className="cursor-pointer"
              >
                <X className="h-5 w-5 text-black" />
              </button>
            </div>

            <div className="flex w-full items-center justify-center mt-6">
              <Image
                src="/catLogo.png"
                alt="cat logo"
                width={200}
                height={200}
                unoptimized
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 px-6 py-6"
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-full border border-gray-200 px-5 py-3 text-black outline-none placeholder:text-gray-400 focus:border-accent"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-full border border-gray-200 px-5 py-3 text-black outline-none placeholder:text-gray-400 focus:border-accent"
              />

              <AnimatedButton
                type="submit"
                w="w-full"
                text={isSubmitting ? "Subscribing..." : "Subscribe"}
              />

              <p className="text-center text-xs text-gray-400">
                No spam. Just new posts, projects, and updates.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}