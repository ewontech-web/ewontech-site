"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeS4.module.css";

const certs = [
    {
        code: "ISO 9001",
        title: "품질경영시스템",
        desc: "개발–생산–검증–출하 전 과정의 품질 기준을 체계적으로 관리합니다.",
    },
    {
        code: "ISO 14001",
        title: "환경경영시스템",
        desc: "환경 기준과 운영 프로세스를 기반으로 지속가능한 생산을 지향합니다.",
    },
];

const sitemap = [
    { label: "Company", href: "/company" },
    { label: "Business", href: "/business" },
    { label: "Contact", href: "/contact" },
];

export default function HomeS4() {
    const ref = useRef<HTMLElement | null>(null);
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
            { threshold: 0.12 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className={`${styles.wrap} ${inView ? styles.in : ""}`}
            aria-label="Certification / CTA / Sitemap"
        >
            {/* ===== Area 1: ISO ===== */}
            <div className={styles.area}>
                <div className={styles.kicker}>
                    <span className={styles.no}>04</span>
                    <span className={styles.label}>CERTIFICATION</span>
                </div>

                <div className={styles.head}>
                    <h2 className={styles.title}>인증 기반으로 신뢰를 만듭니다.</h2>
                    <p className={styles.sub}>
                        홈에서는 핵심만 요약하고, 상세 증빙은 Company 페이지에서 확인할 수 있습니다.
                    </p>
                </div>

                <div className={styles.isoGrid}>
                    {certs.map((c) => (
                        <article key={c.code} className={styles.card}>
                            <div className={styles.cardTop}>
                                <span className={styles.isoBadge} aria-hidden="true">
                                    <span className={styles.isoDot} />
                                    <span className={styles.isoText}>ISO</span>
                                </span>

                                <div className={styles.cardTitles}>
                                    <div className={styles.code}>{c.code}</div>
                                    <div className={styles.cardTitle}>{c.title}</div>
                                </div>
                            </div>

                            <p className={styles.desc}>{c.desc}</p>
                        </article>
                    ))}
                </div>

                {/* ✅ 자세히 보기: ISO 영역에서 딱 1개만 */}
                <a className={styles.isoMore} href="/company#company-certs">
                    인증 상세 보기 <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
            </div>

            {/* ===== Area 2: CTA Banner ===== */}
            <div className={styles.area}>
                <div className={styles.banner} aria-label="Contact CTA">
                    <div className={styles.bannerInner}>
                        <div className={styles.bannerKicker}>TALK TO EWONTECH</div>
                        <div className={styles.bannerTitle}>무엇을 도와드릴까요?</div>
                        <div className={styles.bannerDesc}>제조 협업 상담이 필요하면 언제든 문의주세요.</div>
                        <a className={styles.bannerBtn} href="/contact">
                            문의하기
                        </a>
                    </div>
                </div>
            </div>

            {/* ===== Area 3: Sitemap ===== */}
            <div className={styles.area}>
                <div className={styles.siteMap} aria-label="Sitemap">
                    <div className={styles.siteHead}>SITEMAP</div>
                    <div className={styles.siteList}>
                        {sitemap.map((i) => (
                            <a key={i.href} className={styles.siteItem} href={i.href}>
                                <span className={styles.siteLabel}>{i.label}</span>
                                <span className={styles.siteArrow} aria-hidden="true">→</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}