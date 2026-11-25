"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type MouseEvent as RMouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------- scroll progress ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-soft to-sun"
    />
  );
}

/* ---------------- generic reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- staggered word reveal (descender-safe) ---------------- */
export function RevealWords({
  text,
  className,
  delay = 0,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "div";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;
  if (reduce) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: delay + i * 0.055, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- image with mask reveal ---------------- */
export function MaskImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  parallax = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, ease: EASE }}
    >
      <motion.div style={reduce || !parallax ? undefined : { y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={84}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- magnetic button (desktop only) ---------------- */
export function MagneticLink({
  href,
  children,
  className = "",
  external = false,
  strength = 14,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  strength?: number;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: RMouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: mx, y: my }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ---------------- section heading ---------------- */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  light = false,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          {index ? (
            <span className="eyebrow text-brand">{index}</span>
          ) : null}
          <span className={`h-px w-8 ${light ? "bg-sun/50" : "bg-brand/40"}`} />
          <span className={`eyebrow ${light ? "text-sun" : "text-ink-soft"}`}>{eyebrow}</span>
        </div>
      </Reveal>
      <h2
        className={`mt-5 text-[clamp(1.85rem,4.6vw,3.4rem)] leading-[1.08] font-bold ${
          light ? "text-white" : "text-ink"
        }`}
      >
        <RevealWords text={title} />
      </h2>
      {lede ? (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-[clamp(0.95rem,1.4vw,1.075rem)] leading-relaxed ${
              light ? "text-white/75" : "text-ink-soft"
            }`}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------------- marquee ---------------- */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-[clamp(0.9rem,1.6vw,1.15rem)] font-semibold tracking-tight text-white/90">
            {t}
          </span>
          <span className="text-sun" aria-hidden>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/15 bg-brand py-3.5" aria-hidden>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ---------------- brand logo ---------------- */
export function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-2 ring-brand/15 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/logo-mark.png"
        alt="Logo UMAHKUDIMSUM"
        fill
        sizes={`${size}px`}
        priority
        className="object-cover"
      />
    </span>
  );
}

/* ---------------- cinematic intro ---------------- */
export function IntroOverlay() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem("uk-intro-v2") === "1") return;
    } catch {
      return;
    }
    setShow(true);
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("uk-intro-v2", "1");
      } catch {}
      setShow(false);
    }, 1750);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key={id}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="wave drift absolute inset-0 opacity-40" aria-hidden />
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative flex flex-col items-center gap-4"
          >
            <span className="relative block h-20 w-20 overflow-hidden rounded-full ring-4 ring-white/25">
              <Image src="/brand/logo-mark.png" alt="" fill sizes="80px" priority className="object-cover" />
            </span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
              className="font-display text-sm font-semibold tracking-[0.3em] text-white uppercase"
            >
              UMAHKUDIMSUM
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
