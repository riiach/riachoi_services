"use client";

import dynamic from "next/dynamic";

// Sanity Studio depends on browser globals and cannot be server-rendered.
const Studio = dynamic(() => import("../../../components/SanityStudioClient"), { ssr: false });

export default function StudioPage() {
  return <Studio />;
}