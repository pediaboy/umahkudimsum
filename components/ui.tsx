"use client";

import { useId, useRef, useState, useEffect, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Scroll progress indicator                                           */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.25 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold-dim via-gold to-gold-light"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered word-by-word text reveal (used in hero + section titles) */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Wrapper = as === "div" ? motion.div : motion.span;
  if (reduce) {
    return as === "div" ? <div className={className}>{text}</div> : <span className={className}>{text}</span>;
  }
  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}

/* ------------------------------------------------------------------ */
/* Image with clip-path masking reveal                                 */
/* ------------------------------------------------------------------ */
export function MaskImage({
  src,
  alt,
  className,
  imgClassName,
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
  const yRaw = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const y = useSpring(yRaw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.15, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        style={reduce || !parallax ? undefined : { y, scale: 1.12 }}
        className={`grade h-full w-full object-cover ${imgClassName ?? ""}`}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic button / link                                              */
/* ------------------------------------------------------------------ */
function useMagnet(strength: number) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.35 });
  const y = useSpring(my, { stiffness: 260, damping: 20, mass: 0.35 });

  function onMouseMove(e: ReactMouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2);
  }
  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }
  return { style: reduce ? undefined : { x, y }, onMouseMove, onMouseLeave };
}

export function MagneticLink({
  children,
  className,
  strength = 14,
  href,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  href: string;
  ariaLabel?: string;
}) {
  const m = useMagnet(strength);
  const external = href.startsWith("http");
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={className}
      style={m.style}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Emblem / wordmark                                                   */
/* ------------------------------------------------------------------ */
export function Seal({ size = 92, className = "" }: { size?: number; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const topId = `st-${uid}`;
  const botId = `sb-${uid}`;
  const gradId = `sg-${uid}`;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="UMAHKUDIMSUM emblem"
    >
      <defs>
        <path id={topId} d="M 100,100 m -80,0 a 80,80 0 1,1 160,0" fill="none" />
        <path id={botId} d="M 100,100 m -80,0 a 80,80 0 1,0 160,0" fill="none" />
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a7020" />
          <stop offset="42%" stopColor="#e4c877" />
          <stop offset="62%" stopColor="#fff6d9" />
          <stop offset="100%" stopColor="#8a7020" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="none" stroke={`url(#${gradId})`} strokeWidth="0.9" opacity="0.85" />
      <circle cx="100" cy="100" r="68" fill="none" stroke={`url(#${gradId})`} strokeWidth="0.5" opacity="0.5" />
      <text fill="#c9a227" fontSize="10.5" letterSpacing="4.4" fontFamily="var(--font-jost), sans-serif">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          UMAHKUDIMSUM
        </textPath>
      </text>
      <text fill="#8a7020" fontSize="7" letterSpacing="3.6" fontFamily="var(--font-jost), sans-serif">
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          EST. 2014
        </textPath>
      </text>
      <text
        x="100"
        y="113"
        textAnchor="middle"
        fontSize="33"
        fill={`url(#${gradId})`}
        style={{ fontFamily: '"Songti SC","STSong","SimSun",serif', letterSpacing: "1px" }}
      >
        家點心
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */
export function SectionHead({
  index,
  label,
  title,
  lede,
  align = "left",
  className = "",
}: {
  index: string;
  label: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : ""} ${className}`}>
      <Reveal>
        <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
          <span className="font-sans text-[11px] font-medium tracking-[0.3em] text-gold-dim">{index}</span>
          <span className="h-px w-8 bg-gold/35" aria-hidden />
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>
      <h2 className="mt-6 font-display text-[clamp(2rem,5.2vw,3.9rem)] leading-[1.04] text-ivory">
        <RevealWords text={title} />
      </h2>
      {lede ? (
        <Reveal delay={0.12}>
          <p className={`mt-5 max-w-xl text-[15px] leading-relaxed text-ivory-dim ${center ? "mx-auto" : ""}`}>{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
export function Marquee({
  items,
  className = "",
  separator = "·",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] italic text-ivory/25">{t}</span>
          <span className="text-gold/40" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative overflow-hidden border-y border-gold/15 py-5 ${className}`} aria-hidden>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cinematic intro / logo reveal (first visit per session only)         */
/* ------------------------------------------------------------------ */
export function IntroOverlay() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem("uk-intro") === "1") return;
    } catch {
      return;
    }
    setShow(true);
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem("uk-intro", "1");
      } catch {}
      setShow(false);
    }, 2000);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="flex flex-col items-center"
          >
            <Seal size={124} />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
              className="mt-6 font-sans text-[10px] tracking-[0.5em] text-gold/70"
            >
              UMAHKUDIMSUM
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-maroon"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-maroon"
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
