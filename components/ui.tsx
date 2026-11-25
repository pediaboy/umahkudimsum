"use client";

import { useRef, useState, useEffect, type ReactNode, type MouseEvent as RMouseEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Thin reading-progress bar. Cheap: one transform on scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.25 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand"
    />
  );
}

/**
 * Scroll reveal. Purely presentational — the CSS default is visible, so a
 * failed/absent scroll timeline can never leave content hidden.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const Tag = as as "div";
  return (
    <Tag className={`reveal ${className}`} style={{ animationDelay: delay ? `${delay}s` : undefined }}>
      {children}
    </Tag>
  );
}

/** Word-by-word headline entrance. Runs once on load and always ends visible. */
export function RevealWords({
  text,
  className = "",
  wordClassName = "",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
          <span className={`intro-word inline-block ${wordClassName}`} style={{ ["--i" as string]: i }}>
            {w}
          </span>
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/** Image with a scroll-driven mask reveal. Visible by default. */
export function MaskImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 82,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  parallax?: number;
}) {
  return (
    <div className={`reveal-mask relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}

/** Desktop-only magnetic pull. No-ops on touch and reduced motion. */
export function MagneticLink({
  href,
  children,
  className = "",
  strength = 12,
  target,
  rel,
  onClick,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  target?: string;
  rel?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [d, setD] = useState({ x: 0, y: 0 });

  function move(e: RMouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const r = ref.current.getBoundingClientRect();
    setD({
      x: ((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2,
      y: ((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2,
    });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={() => setD({ x: 0, y: 0 })}
      animate={{ x: d.x, y: d.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/** Editorial section header: small label, big display line, optional lede. */
export function SectionHead({
  label,
  title,
  lede,
  align = "left",
  invert = false,
  className = "",
}: {
  label: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  const centred = align === "center";
  return (
    <div className={`${centred ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}>
      <p className={`label ${invert ? "text-sun" : "text-brand"}`}>{label}</p>
      <h2
        className={`mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.06] font-semibold ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-[15px] leading-[1.75] sm:text-base ${
            invert ? "text-white/75" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Animated marquee. Kept for the brand strip; pauses on reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden border-y border-line bg-cream py-4" aria-hidden>
      <div className="uk-marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((t) => (
              <span key={`${k}-${t}`} className="flex items-center whitespace-nowrap">
                <span className="label px-6 text-ink-soft">{t}</span>
                <span className="h-1 w-1 rounded-full bg-brand/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-line ${className}`}
      style={{ width: size, height: size }}
    >
      <Image src="/brand/logo-mark.png" alt="UMAHKUDIMSUM" fill sizes={`${size}px`} className="object-cover" priority />
    </span>
  );
}

/** One-time brand curtain. Short and non-blocking; skipped on reduced motion. */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem("uk-intro") === "1") return;
    } catch {
      return;
    }
    setShow(true);
    const t = setTimeout(() => {
      try { sessionStorage.setItem("uk-intro", "1"); } catch {}
      setShow(false);
    }, 900);
    return () => clearTimeout(t);
  }, [reduce]);

  if (!show) return null;
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-brand"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-full bg-white p-3"
      >
        <Logo size={64} />
      </motion.div>
    </motion.div>
  );
}
