"use client";

import { useEffect, useState } from "react";

export default function ShimmerQuote({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

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

  return (
    <div className="text-center max-w-4xl">
      <div className="accent-bar mx-auto mb-8" />
      <p className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${done ? "shimmer-text" : "typing-text"}`}>
        &bdquo;{displayed}<span className={`typing-cursor ${done ? "hidden" : ""}`}>|</span>&ldquo;
      </p>
      <div className="accent-bar mx-auto mt-8" />
    </div>
  );
}
