"use client";

import { useRef, useEffect } from "react";
import styles from "./page.module.css";

export default function HeroSlogan() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animId: number;
    // Start glow off-screen so there's no visible glow on load
    let targetX = -9999,
      targetY = -9999;
    let currentX = -9999,
      currentY = -9999;
    let glowOpacity = 0;
    let targetOpacity = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      // Smooth follow with lerp (lower = smoother/slower)
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      glowOpacity = lerp(glowOpacity, targetOpacity, 0.06);

      // Two gradient layers:
      // 1. Green spotlight following the mouse (glows through letter shapes)
      // 2. Fallback dim white layer so text is always faintly visible
      el.style.backgroundImage = `
        radial-gradient(320px circle at ${currentX}px ${currentY}px,
          rgba(119, 255, 60, ${glowOpacity * 0.65}) 0%,
          rgba(119, 255, 60, ${glowOpacity * 0.2}) 35%,
          transparent 65%),
        linear-gradient(rgba(255,255,255,0.06), rgba(255,255,255,0.06))
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
      <span>INSPIRE</span>
      <span>YOUR</span>
      <span>BRAND</span>
    </div>
  );
}
