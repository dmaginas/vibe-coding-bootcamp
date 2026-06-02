"use client";

import { useEffect, useState } from "react";

export default function ShimmerQuote({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ text: `„${text}"` });
    } else {
      await navigator.clipboard.writeText(`„${text}"`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="text-center max-w-4xl">
      <div className="accent-bar mx-auto mb-8" />
      <p className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${done ? "shimmer-text" : "typing-text"}`}>
        &bdquo;{displayed}<span className={`typing-cursor ${done ? "hidden" : ""}`}>|</span>&ldquo;
      </p>
      <div className="accent-bar mx-auto mt-8" />

      {done && (
        <button
          onClick={handleShare}
          className="mt-8 px-5 py-2 rounded-full border border-accent text-sm font-medium share-btn"
        >
          {copied ? "Kopiert!" : "Teilen"}
        </button>
      )}
    </div>
  );
}
