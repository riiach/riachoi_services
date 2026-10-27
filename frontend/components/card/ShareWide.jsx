"use client";

import React from "react";
import { toast } from "sonner";

const ShareWide = ({ title = "Check out this post", slug }) => {
  // Returns current page URL and encoded values for sharing
  const getShareData = () => {
    const url = window.location.href;

    return {
      url,
      encodedUrl: encodeURIComponent(url),
      encodedTitle: encodeURIComponent(title),
    };
  };

  // Opens social share popup window
  const openPopup = (shareUrl) => {
    window.open(
      shareUrl,
      "_blank",
      "width=600,height=700,noreferrer"
    );
  };

  // Shares post to X / Twitter
  const handleXShare = () => {
    const { encodedUrl, encodedTitle } = getShareData();

    openPopup(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    );
  };

  // Shares post to LinkedIn
  const handleLinkedInShare = () => {
    const { encodedUrl } = getShareData();

    openPopup(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    );
  };

  // Opens the Threads composer with the post title and article link.
  const handleThreadsShare = () => {
    const { encodedUrl, encodedTitle } = getShareData();
    openPopup(
      `https://www.threads.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`
    );
  };

  // Shares post to Reddit
  const handleRedditShare = () => {
    const { encodedUrl, encodedTitle } = getShareData();

    openPopup(
      `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    );
  };

  // Copies current page URL to clipboard
  const handleCopyLink = async () => {
    const { url } = getShareData();

    await navigator.clipboard.writeText(url);

    // Shows success toast notification
    toast.success("Link copied to clipboard!");
  };

  const handleDownloadImage = async () => {
    if (!slug) return;
    try {
      const response = await fetch(`/api/embedded/${encodeURIComponent(slug)}?format=card`);
      if (!response.ok) throw new Error("Could not generate image");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${slug}-social-card.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      toast.success("Image downloaded!");
    } catch {
      toast.error("Image download failed");
    }
  };

  return (
    <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/45 bg-white/25 backdrop-blur-xl dark:bg-white/10 px-6 py-4 shadow-[0_2px_2px_rgba(0,0,0,0.08)]">
      <p className="font-semibold">Share</p>

      {/* X Share */}
      <button
        type="button"
        aria-label="Share on X"
        onClick={handleXShare}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black p-1 transition-all duration-300 ease-out hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="fill-white h-5 w-5 shrink-0">
          <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
        </svg>
      </button>

      {/* LinkedIn Share */}
      <button
        type="button"
        aria-label="Share on LinkedIn"
        onClick={handleLinkedInShare}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black p-1 transition-all duration-300 ease-out hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white h-5 w-5 shrink-0">
          <circle fill="white" cx="4.983" cy="5.009" r="2.188" />
          <path fill="#ffffff" d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118c1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783c-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z" />
        </svg>
      </button>

      {/* Threads Share */}
      <button
        type="button"
        aria-label="Share on Threads"
        title="Share on Threads"
        onClick={handleThreadsShare}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black p-1 text-white transition-all duration-300 ease-out hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M16.21 11.37c-.11-.05-.22-.1-.33-.14-.19-3.5-2.1-5.51-5.31-5.53-1.81-.01-3.38.68-4.41 1.95l1.7 1.17c.69-.85 1.61-1.25 2.72-1.24 1.69.01 2.69.81 2.95 2.36-.87-.16-1.82-.23-2.84-.2-2.7.07-4.43 1.65-4.32 3.95.1 2.27 1.88 3.79 4.44 3.79 1.99 0 3.43-.95 4.31-2.81.36-.76.59-1.67.7-2.72.59.38.98.84 1.19 1.39.36.93.23 2.14-.37 3.29-.97 1.86-2.91 2.85-5.61 2.86-4.02-.03-6.45-2.71-6.47-7.16-.02-4.47 2.42-7.17 6.48-7.19 4.08-.02 6.52 2.7 6.54 7.29h2.02C20.04 5.8 16.99 2 12 2 7 2 3 5.82 3 12s3.96 10 8.95 10c3.47 0 5.98-1.35 7.27-3.91 1.04-2.04 1.12-4.28.25-6.14-.58-1.25-1.68-2.18-3.26-2.76zM10.9 15.6c-1.38 0-2.22-.66-2.27-1.78-.05-1.13.77-1.87 2.19-1.91 1.05-.03 2.02.07 2.87.3-.32 2.32-1.24 3.39-2.79 3.39z" />
        </svg>
      </button>

      {/* Reddit Share */}
      <button
        type="button"
        aria-label="Share on Reddit"
        onClick={handleRedditShare}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black transition-all duration-300 ease-out hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" className="fill-white h-7 w-7 shrink-0">
          <path d="M17.01 7.74c.83 0 1.5.67 1.5 1.5 0 .5-.25.95-.63 1.22.08.34.12.7.12 1.06 0 2.7-2.69 4.89-6 4.89s-6-2.19-6-4.89c0-.36.04-.72.12-1.06a1.5 1.5 0 1 1 1.67-2.44 7.2 7.2 0 0 1 3.72-1.13l.7-3.29 2.47.52a1.25 1.25 0 1 1-.08.4l-2.08-.44-.6 2.82a7.3 7.3 0 0 1 3.29 1.12c.28-.18.62-.28.99-.28ZM9.5 10.75a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm5 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm-5.25 3.1a.35.35 0 0 0-.25.6c.78.78 1.87 1.05 3 1.05s2.22-.27 3-1.05a.35.35 0 0 0-.5-.5c-.57.57-1.45.85-2.5.85s-1.93-.28-2.5-.85a.35.35 0 0 0-.25-.1Z" />
        </svg>
      </button>

      {/* Social card image */}
      {slug && (
        <button
          type="button"
          aria-label="Download social card image"
          title="Download social card"
          onClick={handleDownloadImage}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black p-1 text-white transition-all duration-300 ease-out hover:-translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Copy Link */}
      <button
        type="button"
        aria-label="Copy post link"
        onClick={handleCopyLink}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black p-1 transition-all duration-300 ease-out hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-white h-5 w-5 shrink-0">
          <g fill="#ffffff">
            <path d="M12.243 3.757a2 2 0 0 0-2.829 0L7.293 5.88L5.879 4.464L8 2.344a4 4 0 0 1 5.657 0l.707.706l-.09.09A4 4 0 0 1 13.658 8l-2.121 2.121l-1.415-1.414l2.122-2.121a2 2 0 0 0 0-2.829Zm-8.486 8.486a2 2 0 0 0 2.829 0l2.121-2.122l1.414 1.415L8 13.655a4 4 0 0 1-5.657 0l-.707-.706l.09-.09A4 4 0 0 1 2.342 8l2.121-2.121L5.88 7.293L3.757 9.414a2 2 0 0 0 0 2.829" />
            <path d="M10.828 6.586L9.414 5.172L5.172 9.414l1.414 1.414z" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default ShareWide;