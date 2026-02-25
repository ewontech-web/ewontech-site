import styles from "./BusinessAreas.module.css";

const items = [
    {
        title: "OEM/ODM 제조",
        desc: "제품 요구사항에 맞춰 생산까지 대응합니다.",
    },
    {
        title: "전자 제품 양산 지원",
        desc: "조립·검사·출하까지 공정을 연계합니다.",
    },
    {
        title: "개발·검증 협업",
        desc: "시제품, 기능 검증, 양산 전 테스트를 지원합니다.",
    },
];

export default function BusinessAreas() {
    return (
        <section className={styles.section} aria-labelledby="areas-title">
            <header className={styles.head}>
                <div className={styles.kicker}>CAPABILITIES</div>
                <h2 className={styles.title} id="areas-title">
                    Our Business
                </h2>
                <p className={styles.sub}>
                    제조·조립·납기 관점에서 필요한 범위를 단계적으로 지원합니다.
                </p>
            </header>

            <div className={styles.grid}>
                {items.map((it) => (
                    <article key={it.title} className={styles.card}>
                        <h3 className={styles.cardTitle}>{it.title}</h3>
                        <p className={styles.cardDesc}>{it.desc}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}