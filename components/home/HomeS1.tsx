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
            <div className={styles.bg} aria-hidden="true" />
            <div className={styles.overlay} aria-hidden="true" />

            <div className={styles.copy}>
                <div className={styles.kicker}>
                    <span className={styles.no}>01</span>
                    <span className={styles.label}>STATEMENT</span>
                </div>

                <h1 className={styles.title}>
                    <span>전자 제조의 흐름을</span>
                    <span>품질 기준으로 연결합니다.</span>
                </h1>

                <p className={styles.lead}>
                    설계 검토부터 조달, 생산, 검증, 출하까지 필요한 과정을 안정적으로 관리합니다.
                </p>

                <a className={styles.textLink} href="/contact">
                    제조 협업 문의
                </a>
            </div>
        </div>
    );
}
