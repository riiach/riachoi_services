"use client"

import React, { useState } from "react";
import { toast } from "sonner";
import AnimatedButton from "./AnimatedButton";

const SubscribeBar = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.error || "Failed to subscribe.");
      }
    } catch (error) {
        toast.error("Something went wrong.")
    }

  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center rounded-full bg-primary p-2 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
    >
      <input
        type="email"
        value={email}
        placeholder="Your email address"
        className="w-2/3 min-w-0 bg-transparent px-5 py-3 text-gray-700 outline-none placeholder:text-gray-500 rounded-full"
        onChange={(e) => setEmail(e.target.value)}
      />

      <AnimatedButton
        type="submit"
        text="Subscribe"
        w="w-1/3"
        h="py-4"
      />
    </form>
  );
};
export default SubscribeBar;
