"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CompanyHistory.module.css";

type HistoryItem = { date: string; text: string };

const HISTORY: HistoryItem[] = [
    { date: "2003.12", text: "회사 설립" },
    { date: "2004.07", text: "자재구매/납품(외주) OEM 협업" },
    { date: "2005.02", text: "현장 대응/공정 지원, LINE 협업" },
    { date: "2007.02", text: "법인 전환" },
    { date: "2011.02", text: "ISO 9001, ISO 14000 인증 획득" },
    { date: "2012.04", text: "운영 확장 및 협력 네트워크 구축" },
    { date: "2013–2014", text: "LED LINE, 배전반/제어반/제조 협력" },
    { date: "2015–2016", text: "자재 공급 범위 확대, 가공/조립 협력" },
    { date: "2016–2019", text: "SMPS/전원/제어부품 등 생산 협력" },
    { date: "2019.12", text: "대표 취임" },
    { date: "2020.01", text: "사업 확장 및 협력 체계 정리" },
];

export default function CompanyHistory() {
    const history = useMemo(() => HISTORY, []);
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    // ✅ 데스크탑은 효과가 돌지 않으므로 0이 유지 → “첫 카드만” 기본 강조
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const lastScrollYRef = useRef<number>(0);
    const tickingRef = useRef<boolean>(false);
    const activeRef = useRef<number>(0);
    const elsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // ✅ 모바일에서만 “화면 스크롤 기반 active”
        const mq = window.matchMedia("(max-width: 640px)");
        if (!mq.matches) return;

        // 요소 캐시
        elsRef.current = itemsRef.current.filter(Boolean) as HTMLDivElement[];
        if (!elsRef.current.length) return;

        activeRef.current = 0;
        setActiveIndex(0);
        lastScrollYRef.current = window.scrollY;

        const getCenterY = () => window.innerHeight * 0.45; // 중앙선 위치(조절 가능)
        const findClosestIndex = (centerY: number) => {
            let bestIdx = 0;
            let bestDist = Infinity;

            const els = elsRef.current;
            for (let i = 0; i < els.length; i++) {
                const r = els[i].getBoundingClientRect();
                const c = r.top + r.height / 2;
                const d = Math.abs(c - centerY);
                if (d < bestDist) {
                    bestDist = d;
                    bestIdx = i;
                }
            }
            return bestIdx;
        };

        const updateActive = () => {
            tickingRef.current = false;

            const els = elsRef.current;
            if (!els.length) return;

            const centerY = getCenterY();
            const current = activeRef.current;

            const scrollY = window.scrollY;
            const dir = scrollY > lastScrollYRef.current ? "down" : "up";
            lastScrollYRef.current = scrollY;

            const curRect = els[current].getBoundingClientRect();
            const curCenter = curRect.top + curRect.height / 2;

            // ✅ 다음/이전 “중심”이 중앙선을 통과해야만 넘어감(순서 보장)
            if (dir === "down" && current < els.length - 1) {
                const nextRect = els[current + 1].getBoundingClientRect();
                const nextCenter = nextRect.top + nextRect.height / 2;

                if (nextCenter <= centerY) {
                    activeRef.current = current + 1;
                    setActiveIndex(current + 1);
                    return;
                }

                // 급스크롤 보정
                if (curCenter < centerY - 140) {
                    const bestIdx = findClosestIndex(centerY);
                    if (bestIdx !== current) {
                        activeRef.current = bestIdx;
                        setActiveIndex(bestIdx);
                    }
                }
            }

            if (dir === "up" && current > 0) {
                const prevRect = els[current - 1].getBoundingClientRect();
                const prevCenter = prevRect.top + prevRect.height / 2;

                if (prevCenter >= centerY) {
                    activeRef.current = current - 1;
                    setActiveIndex(current - 1);
                    return;
                }

                // 급스크롤 보정
                if (curCenter > centerY + 140) {
                    const bestIdx = findClosestIndex(centerY);
                    if (bestIdx !== current) {
                        activeRef.current = bestIdx;
                        setActiveIndex(bestIdx);
                    }
                }
            }
        };

        const onScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            requestAnimationFrame(updateActive);
        };

        const onResize = () => {
            // 리사이즈 시 요소 캐시 갱신
            elsRef.current = itemsRef.current.filter(Boolean) as HTMLDivElement[];
            onScroll();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>History</h2>
            <p className={styles.subtitle}>
                이원테크의 주요 이력과 협력 경험을 요약했습니다.
            </p>

            <div className={styles.timeline}>
                {history.map((h, idx) => (
                    <div
                        key={`${h.date}-${idx}`}
                        ref={(el) => {
                            itemsRef.current[idx] = el;
                        }}
                        className={`${styles.item} ${activeIndex === idx ? styles.active : ""
                            }`}
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

            <p className={styles.footerNote}>
                더 자세한 이력 및 협력 범위는 문의 시 공유드리겠습니다.
            </p>
        </div>
    );
}