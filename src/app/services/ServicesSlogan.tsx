"use client";

import { useRef, useEffect } from "react";
import styles from "./services.module.css";

export default function ServicesSlogan() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animId: number;
    let targetX = -9999,
      targetY = -9999;
    let currentX = -9999,
      currentY = -9999;
    let glowOpacity = 0;
    let targetOpacity = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      glowOpacity = lerp(glowOpacity, targetOpacity, 0.06);

      el.style.backgroundImage = `
        radial-gradient(400px circle at ${currentX}px ${currentY}px,
          rgba(119, 255, 60, ${glowOpacity * 0.5}) 0%,
          rgba(119, 255, 60, ${glowOpacity * 0.15}) 40%,
          transparent 70%),
        linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08))
      `;

      animId = requestAnimationFrame(update);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetOpacity = 1;
    };

    const onMouseLeave = () => {
      targetOpacity = 0;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.bgLargeText}
      style={{
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
    >
      <span>DIGITAL</span>
      <span>EXPERTISE</span>
    </div>
  );
}
