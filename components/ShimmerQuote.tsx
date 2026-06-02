"use client";

import { useEffect, useRef, useState } from "react";

export default function ShimmerQuote({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!done) return;
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 450);
    }, 4000);
    return () => clearInterval(interval);
  }, [done]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 18, y: (0.5 - x) * 18 });
    setGlare({ x: x * 100, y: y * 100 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  }

  const fullText = `„${displayed}“`;

  return (
    <div
      ref={cardRef}
      className="tilt-card text-center max-w-4xl px-10 py-12 rounded-2xl"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.6s ease" : "transform 0.08s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="tilt-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25) 0%, transparent 65%)`,
        }}
      />

      <div className="accent-bar mx-auto mb-8" />
      <p
        data-text={fullText}
        className={`relative text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${done ? "shimmer-text" : "typing-text"} ${glitching ? "glitch-active" : ""}`}
      >
        &bdquo;{displayed}<span className={`typing-cursor ${done ? "hidden" : ""}`}>|</span>&ldquo;
      </p>
      <div className="accent-bar mx-auto mt-8" />
    </div>
  );
}
