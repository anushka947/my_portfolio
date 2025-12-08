import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDevice);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.interactive === "true" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handlePointerOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [isVisible, isTouchDevice, prefersReducedMotion]);

  if (typeof window === "undefined" || isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-neon-pink pointer-events-none z-[9999] mix-blend-difference transition-all duration-100 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isPointer ? "scale-150" : "scale-100"}`}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-pink pointer-events-none z-[9999] transition-opacity duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
