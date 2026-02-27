"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CompanyHistory.module.css";

type HistoryItem = { date: string; text: string };

const HISTORY: HistoryItem[] = [
    { date: "2003.12", text: "회사 설립" },
    { date: "2004.07", text: "자재구매/납품(외주) OEM 협업" },
    { date: "2005.02", text: "현장 대응/공정 지원, LINE 협업" },
    { date: "2007.02", text: "법인 전환" },
    { date: "2011.02", text: "ISO 9001, ISO 14001 인증 획득" },
    { date: "2012.04", text: "운영 확장 및 협력 네트워크 구축" },
    { date: "2013–2014", text: "LED LINE, 배전반/제어반/제조 협력" },
    { date: "2015–2016", text: "자재 공급 범위 확대, 가공/조립 협력" },
    { date: "2016–2019", text: "SMPS/전원/제어부품 등 생산 협력" },
    { date: "2019.12", text: "대표 취임" },
    { date: "2020.01", text: "사업 확장 및 협력 체계 정리" },
];

export default function CompanyHistory() {
    const items = useMemo(() => HISTORY, []);
    const [activeIndex, setActiveIndex] = useState(0);

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!els.length) return;

        // 모바일/데스크탑 모두 자연스러운 active 강조
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
                if (!visible[0]) return;

                const idx = Number((visible[0].target as HTMLElement).dataset.idx);
                if (!Number.isNaN(idx)) setActiveIndex(idx);
            },
            {
                root: null,
                rootMargin: "-40% 0px -55% 0px",
                threshold: [0.15, 0.3, 0.5],
            }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <section className={styles.wrap} aria-label="Company History">
            <div className={styles.head}>
                <h2 className={styles.title}>History</h2>
                <p className={styles.subtitle}>이원테크의 주요 이력과 협력 경험을 요약했습니다.</p>
            </div>

            <div className={styles.timeline}>
                {items.map((h, idx) => (
                    <div
                        key={`${h.date}-${idx}`}
                        ref={(el) => {
                            itemRefs.current[idx] = el; // ✅ ref 에러 방지: 블록 콜백
                        }}
                        data-idx={idx}
                        className={`${styles.item} ${idx === activeIndex ? styles.active : ""}`}
                    >
                        <div className={styles.marker} aria-hidden="true">
                            <span className={styles.dot} />
                            <span className={styles.line} />
                        </div>

                        <div className={styles.card}>
                            <div className={styles.date}>{h.date}</div>
                            <div className={styles.text}>{h.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <p className={styles.footerNote}>더 자세한 이력 및 협력 범위는 문의 시 공유드리겠습니다.</p>
        </section>
    );
}