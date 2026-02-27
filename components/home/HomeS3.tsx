"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeS3.module.css";

export default function HomeS3() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const rightRef = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    // 진입 fade
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const reduce =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

        if (isMobile || isCoarse || reduce) {
            setInView(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    // parallax (desktop only)
    useEffect(() => {
        const el = rightRef.current;
        if (!el) return;

        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const reduce =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

        if (isMobile || isCoarse || reduce) return;

        let raf = 0;

        const update = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight;

            // progress: 0(아래)~1(위) 느낌으로 중앙 기준 움직임
            const mid = r.top + r.height * 0.5;
            const p = Math.max(0, Math.min(1, 1 - mid / vh)); // 0~1
            const centered = (p - 0.5) * 2; // -1~1

            // 각 요소별 이동량(px)
            el.style.setProperty("--ty1", `${centered * -18}px`);
            el.style.setProperty("--ty2", `${centered * 26}px`);
            el.style.setProperty("--ty3", `${centered * -22}px`);
            el.style.setProperty("--tyDot", `${centered * 14}px`);
        };

        const onScroll = () => {
            if (raf) return;
            raf = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div ref={wrapRef} className={`${styles.wrap} ${inView ? styles.in : ""}`}>
            <div className={styles.left}>
                <div className={styles.kicker}>
                    <span className={styles.no}>03</span>
                    <span className={styles.label}>VALUE</span>
                </div>
                <h2 className={styles.title}>Vision & Value.</h2>
                <p className={styles.desc}>기술로 세상을 바꾸고, 정밀함으로 내일을 설계합니다</p>
            </div>

            <div ref={rightRef} className={styles.right}>
                <div className={styles.pills} aria-label="Values">
                    <span className={styles.pill}>기술력</span>
                    <span className={styles.pill}>신뢰성</span>
                    <span className={styles.pill}>미래지향성</span>
                </div>

                <div className={`${styles.circle} ${styles.c1}`}>기술력</div>
                <div className={`${styles.circle} ${styles.c2}`}>신뢰성</div>
                <div className={`${styles.circle} ${styles.c3}`}>미래지향성</div>
                <div className={styles.dotted} aria-hidden="true" />
            </div>
        </div>
    );
}