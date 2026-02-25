import Image from "next/image";
import styles from "./CompanyCapabilitySection.module.css";

import HoverSwapImage from "../common/HoverSwapImage";
import HoverCollage from "../common/HoverCollage";

const items = [
    {
        title: "일괄 생산 체계",
        sub: "Integrated Production System",
        desc:
            "개발·생산·구매·판매를 연결한 운영 체계를 기반으로 일괄 생산 지원을 지향합니다.",
        img: "/company/cap-0.jpg",
    },
    {
        title: "생산 LINE 운영",
        sub: "Production Line Operation",
        desc:
            "SMD 협력 라인과 연계하여 생산 체계를 운영하며, 납기/품질 대응을 위한 프로세스를 갖추고 있습니다.",
        img: "/company/cap-2.jpg",
    },
    {
        title: "장비/검사",
        sub: "Quality & Inspection",
        desc:
            "품질 관리 체계를 기반으로 출하 전 검사 및 확인 프로세스를 운영합니다.",
        img: "/company/cap-3.jpg",
    },
];

export default function CompanyCapabilitySection() {
    return (
        <section className={styles.wrap}>
            <div className={styles.head}>
                <h2 className={styles.title}>운영 체계와 생산 역량</h2>
                <p className={styles.sub}>
                    생산 지원에 필요한 운영·라인·검사 역량을 요약했습니다.
                </p>
            </div>

            <div className={styles.list}>
                {items.map((it, idx) => (
                    <article className={styles.row} key={it.title}>
                        <div className={styles.imgBox}>
                            {it.title === "생산 LINE 운영" ? (
                                <HoverSwapImage
                                    primary={{ src: "/company/cap-1.jpg", alt: "검사 장비" }}
                                    secondary={{ src: "/company/cap-2.jpg", alt: "검사/측정 장면" }}
                                />
                            ) : it.title === "장비/검사" ? (
                                <HoverCollage
                                    ratio="16/9"
                                    images={[
                                        { src: "/company/cap-3.jpg", alt: "장비/검사 1" },
                                        { src: "/company/cap-4.jpg", alt: "장비/검사 2" },
                                        { src: "/company/cap-5.jpg", alt: "장비/검사 3" },
                                        { src: "/company/cap-6.jpg", alt: "장비/검사 4" },
                                    ]}
                                />
                            ) : (
                                <Image
                                    src={it.img}
                                    alt={it.title}
                                    fill
                                    sizes="(max-width: 860px) 100vw, 54vw"
                                    className={styles.img}
                                    priority={idx === 0}
                                />
                            )}
                        </div>

                        <div className={styles.body}>
                            <h3 className={styles.h3}>{it.title}</h3>
                            <div className={styles.en}>{it.sub}</div>
                            <p className={styles.desc}>{it.desc}</p>
                        </div>
                    </article>
                ))}
            </div>

        </section>
    );
}