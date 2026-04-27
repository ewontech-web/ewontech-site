"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeS3.module.css";

const values = [
    {
        no: "01",
        title: "기술력",
        desc: "설계 검토와 생산 조건을 함께 봅니다.",
    },
    {
        no: "02",
        title: "신뢰성",
        desc: "검증 기준으로 품질 편차를 줄입니다.",
    },
    {
        no: "03",
        title: "미래지향성",
        desc: "공정 데이터를 반영해 개선합니다.",
    },
];

export default function HomeS3() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
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

    return (
        <div ref={wrapRef} className={`${styles.wrap} ${inView ? styles.in : ""}`}>
            <div className={styles.left}>
                <div className={styles.kicker}>
                    <span className={styles.no}>03</span>
                    <span className={styles.label}>VALUE</span>
                </div>
                <h2 className={styles.title}>제조 협업의 기준을 세웁니다.</h2>
                <p className={styles.desc}>
                    좋은 제품은 기술 검토, 품질 관리, 지속적인 개선이 같은 방향으로 움직일 때 완성됩니다.
                </p>
            </div>

            <div className={styles.right} aria-label="이원테크 핵심 가치">
                <div className={styles.valueMap}>
                    {values.map((value, index) => (
                        <article
                            key={value.no}
                            className={`${styles.mapCircle} ${index === 0 ? styles.mapTech : index === 1 ? styles.mapTrust : styles.mapFuture}`}
                        >
                            <span className={styles.cardNo}>{value.no}</span>
                            <h3>{value.title}</h3>
                            <p>{value.desc}</p>
                        </article>
                    ))}
                    <span className={styles.mapGuide} />
                </div>
            </div>
        </div>
    );
}
