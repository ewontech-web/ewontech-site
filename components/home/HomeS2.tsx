"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HomeS2.module.css";

const steps = [
    { n: "01", t: "개발", desc: "요구사항 정리 · 회로/기구 설계 · 시제품 검토" },
    { n: "02", t: "조달", desc: "부품 수급 · 대체품 검토 · 원가/납기 관리" },
    { n: "03", t: "생산", desc: "라인 투입 · 조립/실장 · 공정 관리" },
    { n: "04", t: "검증", desc: "기능/신뢰성 검사 · 불량 분석 · 개선 반영" },
    { n: "05", t: "출하", desc: "포장/라벨 · 출하/납품 · 이력 관리" },
];

function isMobileEnv() {
    if (typeof window === "undefined") return false;
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    return mobile || coarse;
}

export default function HomeS2() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const active = useMemo(() => steps[activeIdx], [activeIdx]);

    // desktop track refs
    const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
    // mobile timeline refs (✅ 타입 정확히)
    const mobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const update = () => setIsMobile(isMobileEnv());
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // page.tsx에서 마지막 단계 체크용 이벤트 유지
    useEffect(() => {
        window.dispatchEvent(new CustomEvent("home:s2Step", { detail: { activeIdx } }));
    }, [activeIdx]);

    // desktop: anchors IO
    useEffect(() => {
        if (isMobile) return;

        const els = anchorRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
                if (!visible[0]) return;

                const idx = Number((visible[0].target as HTMLElement).dataset.idx);
                if (!Number.isNaN(idx)) setActiveIdx(idx);
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.35, 0.5, 0.65] }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [isMobile]);

    // mobile: timeline IO (연혁 느낌)
    useEffect(() => {
        if (!isMobile) return;

        const els = mobileItemRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
                if (!visible[0]) return;

                const idx = Number((visible[0].target as HTMLElement).dataset.idx);
                if (!Number.isNaN(idx)) setActiveIdx(idx);
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: [0.15, 0.3, 0.5] }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [isMobile]);

    const scrollToStepDesktop = (idx: number) => {
        const el = anchorRefs.current[idx];
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className={styles.wrap} aria-label="Scope">
            <div className={styles.kicker}>
                <span className={styles.no}>02</span>
                <span className={styles.label}>SCOPE</span>
            </div>

            <h2 className={styles.statement}>
                개발–조달–생산–검증–출하, 필요한 구간을 연결합니다.
            </h2>

            {/* ✅ 모바일: 연혁(타임라인) 방식 */}
            {isMobile ? (
                <div className={styles.mTimeline} aria-label="Scope timeline (mobile)">
                    {steps.map((s, i) => (
                        <div
                            key={s.n}
                            ref={(el) => {
                                mobileItemRefs.current[i] = el; // ✅ 콜백 ref는 블록으로!
                            }}
                            data-idx={i}
                            className={`${styles.mItem} ${i === activeIdx ? styles.mActive : ""}`}
                        >
                            <div className={styles.mMarker} aria-hidden="true">
                                <span className={styles.mDot} />
                                <span className={styles.mLine} />
                            </div>

                            <div className={styles.mCard}>
                                <div className={styles.mHead}>
                                    <span className={styles.mNo}>{s.n}</span>
                                    <span className={styles.mTitle}>{s.t}</span>
                                </div>
                                <div className={styles.mDesc}>{s.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* ✅ 데스크탑: 기존 sticky + track */
                <div className={styles.scrollStage}>
                    <div className={styles.stickyShell}>
                        <aside className={styles.left} aria-label="Steps">
                            <div className={styles.rail} aria-hidden="true" />
                            <ul className={styles.list}>
                                {steps.map((s, i) => {
                                    const isActive = i === activeIdx;
                                    return (
                                        <li key={s.n} className={`${styles.item} ${isActive ? styles.active : ""}`}>
                                            <button
                                                type="button"
                                                className={styles.btn}
                                                onClick={() => scrollToStepDesktop(i)}
                                                aria-current={isActive ? "step" : undefined}
                                            >
                                                <span className={styles.dot} aria-hidden="true" />
                                                <span className={styles.stepNo}>{s.n}</span>
                                                <span className={styles.stepTitle}>{s.t}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>

                        <div className={styles.rightSticky} aria-label="Active step detail">
                            <div className={styles.right}>
                                <div className={styles.detailKicker}>현재 단계</div>
                                <div className={styles.detailTitle}>
                                    {active.n} {active.t}
                                </div>
                                <div className={styles.detailDesc}>{active.desc}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.anchors} aria-hidden="true">
                        {steps.map((s, i) => (
                            <div
                                key={s.n}
                                className={styles.anchor}
                                ref={(el) => {
                                    anchorRefs.current[i] = el; // ✅ 블록 콜백
                                }}
                                data-idx={i}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}