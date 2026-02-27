import styles from "./ProductionShowcase.module.css";

type Item = {
    key: string;
    title: string;
    summary: string[];
    experience: string[];
    imageSrc: string;
    imageAlt: string;
};

const items: Item[] = [
    {
        key: "comm",
        title: "통신·보안 시스템",
        summary: ["전장/통신 시스템 OEM 생산", "조립·검사 및 출하 대응"],
        experience: ["소방 통신 시스템(OEM 생산)", "출입통제 통신 시스템 생산"],
        imageSrc: "/business/cat-1.jpg",
        imageAlt: "통신·보안 시스템",
    },
    {
        key: "air",
        title: "공기·위생 가전",
        summary: ["생활가전 제품군 제조 및 양산 협업", "모듈/조립 라인 적용"],
        experience: [
            "공기청정기 ASSY(자재구매·개발)",
            "차량용 공기청정기 개발 OEM 및 생산(스파디오)",
            "공기 살균기",
            "자재구매 및 판매, 자재개발품",
        ],
        imageSrc: "/business/cat-2.jpg",
        imageAlt: "공기·위생 가전",
    },
    {
        key: "medical",
        title: "의료·헬스케어",
        summary: ["헬스케어 디바이스 제조/검증 협업", "시제품부터 양산 전환까지"],
        experience: [
            "적외선 치료기",
            "의료용 저주파 치료기 개발 및 OEM 생산",
            "의료용 저주파 치과기 개발 OEM/생산",
        ],
        imageSrc: "/business/cat-3.jpg",
        imageAlt: "의료·헬스케어",
    },
    {
        key: "beauty",
        title: "뷰티·웰니스",
        summary: ["미용·마사지기 제품군 OEM/ODM", "부품 조립 및 기능 검증"],
        experience: [
            "허리 벨트 진동운동기 및 안마의자(OEM 생산, GS 홈쇼핑 런칭)",
            "초음파 미용기, 음이온 맛사지기 개발 및 자체 생산",
        ],
        imageSrc: "/business/cat-4.jpg",
        imageAlt: "뷰티·웰니스",
    },
    {
        key: "pcb",
        title: "PCB/전자 제조",
        summary: ["PCB ASSY 및 모듈 조립/검사", "전원/LED 등 제품군 대응"],
        experience: [
            "음식물처리기(PCB ASSY, 자재구매)",
            "음이온정수기 PCB OEM 생산",
            "LED 조명, 아답타 등 POWER PCB ASSY 생산",
        ],
        imageSrc: "/business/cat-5.jpg",
        imageAlt: "PCB/전자 제조",
    },
    {
        key: "auto",
        title: "자동차 전장·산업 조립/납품",
        summary: ["전장 부품 ASSY 및 완제품 조립", "납품 대응 및 적용 환경 고려 협업"],
        experience: [
            "GPS·DMB·NAVI·CAR STEREO ASSY 및 완제품 조립",
            "히트싱크 조립(삼성 납품)",
            "온수보일러 개발 OEM 및 생산",
            "빔 프로젝터 생산 및 AI 스피커 생산",
        ],
        imageSrc: "/business/cat-6.jpg",
        imageAlt: "자동차 전장·산업 조립/납품",
    },
];

export default function ProductionShowcase() {
    return (
        <section className={styles.section} aria-labelledby="prod-showcase-title">
            <header className={styles.head}>
                <div className={styles.kicker}>Products</div>
                <h2 className={styles.title} id="prod-showcase-title">
                    주요 생산 품목
                </h2>
                <p className={styles.sub}>
                    대표 카테고리 예시이며, 상세 사양/범위는 문의로 안내드립니다.
                </p>
            </header>

            <div className={styles.container}>
                <div className={styles.list}>
                    {items.map((it, idx) => {
                        const reversed = idx % 2 === 1;

                        return (
                            <article
                                key={it.key}
                                className={`${styles.item} ${reversed ? styles.reverse : ""}`}
                            >
                                <div className={styles.media}>
                                    <img
                                        className={styles.img}
                                        src={it.imageSrc}
                                        alt={it.imageAlt}
                                        loading="lazy"
                                    />
                                </div>

                                <div className={styles.body}>
                                    <h3 className={styles.itemTitle}>{it.title}</h3>

                                    <div className={styles.block}>
                                        <div className={styles.blockLabel}>요약</div>
                                        {it.summary.map((t) => (
                                            <p key={t} className={styles.summaryLine}>
                                                {t}
                                            </p>
                                        ))}
                                    </div>

                                    <div className={styles.hr} />

                                    <div className={styles.block}>
                                        <div className={styles.blockLabel}>생산 경험</div>
                                        <ul className={styles.expList}>
                                            {it.experience.map((t) => (
                                                <li key={t} className={styles.expItem}>
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            <p className={styles.note}>
                ※ 상기 내용은 대표 카테고리 예시이며, 프로젝트 범위에 따라 제공 내용이 달라질 수 있습니다.
            </p>
        </section>
    );
}