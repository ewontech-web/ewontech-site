import styles from "./ProcessStrip.module.css";

const steps = [
    { k: "01", t: "요구사항 협의", d: "범위/일정/요구사항 정리" },
    { k: "02", t: "설계/검증", d: "구성 협의 및 검증" },
    { k: "03", t: "시제품", d: "샘플 제작 및 기능 확인" },
    { k: "04", t: "양산/품질", d: "양산 전환 및 품질 관리" },
    { k: "05", t: "출하/지원", d: "출하 및 이슈 대응" },
];

export default function ProcessStrip() {
    return (
        <section className={styles.section} aria-labelledby="process-title">
            {/* ✅ 섹션3과 동일 톤의 타이틀 */}
            <header className={styles.head}>
                <div className={styles.kicker}>workflow</div>
                <h2 className={styles.title} id="process-title">
                    Process
                </h2>
                <p className={styles.sub}>
                    프로젝트 단계에 맞춰 유연하게 범위를 조정합니다.
                </p>
            </header>

            {/* ✅ 가로 스텝 유지 */}
            <div className={styles.steps}>
                {steps.map((s, idx) => (
                    <div key={s.k} className={styles.step}>
                        <div className={styles.stepTop}>
                            <div className={styles.badge}>{s.k}</div>
                            {idx !== steps.length - 1 && <div className={styles.connector} />}
                        </div>

                        <div className={styles.stepTitle}>{s.t}</div>
                        <div className={styles.stepDesc}>{s.d}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}