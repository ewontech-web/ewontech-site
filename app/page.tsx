"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import Container from "@/components/layout/Container";

import HomeS1 from "@/components/home/HomeS1";
import HomeS2 from "@/components/home/HomeS2";
import HomeS3 from "@/components/home/HomeS3";
import HomeS4 from "@/components/home/HomeS4";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const mainRef = useRef<HTMLElement | null>(null);

  const s1Ref = useRef<HTMLElement | null>(null);
  const s2Ref = useRef<HTMLElement | null>(null);
  const s3Ref = useRef<HTMLElement | null>(null);
  const s4Ref = useRef<HTMLElement | null>(null);

  const snappingRef = useRef(false);
  const lastTopRef = useRef(0);

  const s2SnapDoneRef = useRef(false);
  const s3SnapDoneRef = useRef(false);
  const s4SnapDoneRef = useRef(false);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isTouchEnv = isMobile || isCoarse;

    lastTopRef.current = main.scrollTop;

    const scrollToElTop = (el: HTMLElement) => {
      snappingRef.current = true;

      main.scrollTo({
        top: el.offsetTop,
        behavior: prefersReduce ? "auto" : "smooth",
      });

      // ✅ 모바일은 스무스가 살짝 느려서 락을 더 길게
      const lockMs = prefersReduce ? 200 : isTouchEnv ? 850 : 650;

      window.setTimeout(() => {
        snappingRef.current = false;
        lastTopRef.current = main.scrollTop;
      }, lockMs);
    };

    const onScroll = () => {
      if (snappingRef.current) return;

      const topNow = main.scrollTop;
      const delta = topNow - lastTopRef.current;

      // ✅ 모바일에서 미세 스크롤(손가락 살짝 움직임)은 무시
      const MIN_DELTA = isTouchEnv ? 14 : 4;
      if (Math.abs(delta) < MIN_DELTA) return;

      const dirDown = delta > 0;
      const dirUp = delta < 0;

      lastTopRef.current = topNow;

      const vh = main.clientHeight;

      const s1 = s1Ref.current;
      const s2 = s2Ref.current;
      const s3 = s3Ref.current;
      const s4 = s4Ref.current;
      if (!s1 || !s2 || !s3 || !s4) return;

      const s1Top = s1.offsetTop;
      const s1Bottom = s1Top + s1.offsetHeight;

      const s2Top = s2.offsetTop;
      const s2Bottom = s2Top + s2.offsetHeight;

      const s3Top = s3.offsetTop;
      const s3Bottom = s3Top + s3.offsetHeight;

      const s4Top = s4.offsetTop;

      // reset flags on scroll up
      if (dirUp) {
        if (topNow < s2Top - vh * 0.6) s2SnapDoneRef.current = false;
        if (topNow < s3Top - vh * 0.6) s3SnapDoneRef.current = false;
        if (topNow < s4Top - vh * 0.6) s4SnapDoneRef.current = false;
      }

      // 1) S1 -> S2 (0.75)
      if (dirDown && !s2SnapDoneRef.current) {
        if (topNow >= s1Top && topNow < s1Bottom) {
          const p = (topNow - s1Top) / Math.max(1, s1.offsetHeight);
          if (p >= 0.75) {
            s2SnapDoneRef.current = true;
            scrollToElTop(s2);
            return;
          }
        }
      }

      // 2) S2 -> S3 (grab: S3가 걸린 뒤 조금 더)
      if (dirDown && !s3SnapDoneRef.current) {
        const s3Enter = s3Top - vh * 0.25;
        const extra = isTouchEnv ? 0.2 : 0.15; // ✅ 모바일은 조금 더 내려야 잡힘
        const s3SnapTrigger = s3Enter + vh * extra;

        const isNear = topNow >= s2Top && topNow <= s2Bottom + vh;

        if (isNear && topNow >= s3SnapTrigger) {
          s3SnapDoneRef.current = true;
          scrollToElTop(s3);
          return;
        }
      }

      // 3) S3 -> S4 (0.75)
      if (dirDown && !s4SnapDoneRef.current) {
        if (topNow >= s3Top && topNow < s3Bottom) {
          const p = (topNow - s3Top) / Math.max(1, s3.offsetHeight);
          if (p >= 0.75) {
            s4SnapDoneRef.current = true;
            scrollToElTop(s4);
            return;
          }
        }
      }
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main id="scrollRoot" ref={mainRef as any} className={styles.main}>
      <section ref={s1Ref as any} className={`${styles.section} ${styles.heroSection}`}>
        <Container><HomeS1 /></Container>
      </section>

      <section ref={s2Ref as any} className={styles.section}>
        <Container><HomeS2 /></Container>
      </section>

      <section ref={s3Ref as any} className={styles.section}>
        <Container><HomeS3 /></Container>
      </section>

      <section ref={s4Ref as any} className={styles.section}>
        <Container><HomeS4 /></Container>
      </section>

      <section className={styles.exitSection}>
        <Footer />
      </section>
    </main>
  );
}