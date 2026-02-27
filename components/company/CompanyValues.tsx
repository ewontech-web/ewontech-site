import styles from "./CompanyValues.module.css";

const values = [
    {
        title: "기본에 충실하자",
        desc: "작은 약속부터 지켜 신뢰를 쌓습니다.",
        points: ["고객 우선", "고품질 대응"],
    },
    {
        title: "함께 미래를 준비하자",
        desc: "지속 가능한 협업을 위해 개선을 멈추지 않습니다.",
        points: ["지속적인 개선", "협업 중심"],
    },
    {
        title: "불량률 ZERO에 가까운 품질관리",
        desc: "품질 기준을 명확히 하고 납기 안정성을 지향합니다.",
        points: ["품질 우선", "납기 준수"],
    },
];

export default function CompanyValues() {
    return (
        <section className={styles.wrap} aria-labelledby="values-title">
            <header className={styles.head}>
                <h2 id="values-title" className={styles.title}>
                    사훈
                </h2>
                <p className={styles.sub}>
                    기본을 지켜 신뢰를 만든다.                </p>
            </header>

            <div className={styles.cards}>
                {values.map((v) => (
                    <article className={styles.card} key={v.title}>
                        <h3 className={styles.cardTitle}>{v.title}</h3>
                        <p className={styles.desc}>{v.desc}</p>

                        <ul className={styles.list}>
                            {v.points.map((t) => (
                                <li className={styles.item} key={t}>
                                    <span className={styles.dot} aria-hidden="true" />
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}