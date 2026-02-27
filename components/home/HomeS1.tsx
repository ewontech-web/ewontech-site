"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeS1.module.css";

export default function HomeS1() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
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
            { threshold: 0.18 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} className={`${styles.wrap} ${inView ? styles.in : ""}`}>
            <div className={styles.kicker}>
                <span className={styles.no}>01</span>
                <span className={styles.label}>STATEMENT</span>
            </div>

            <h1 className={styles.title}>
                <span className={styles.em}>품질 기준</span>으로 움직이는{" "}
                <span className={styles.nowrap}>OEM 제조 협업.</span>
            </h1>

            <div className={styles.rule} aria-hidden="true" />
        </div>
    );
}