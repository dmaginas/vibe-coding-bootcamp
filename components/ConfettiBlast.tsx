"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiBlast() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#E8503E", "#F97066", "#1A1A2E", "#6B7280", "#FFFFFF"],
    });
  }, []);

  return null;
}
