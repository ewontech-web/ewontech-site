import Image from "next/image";
import styles from "./CompanyCerts.module.css";

const certs = [
    { src: "/company/cert-1.jpg", label: "ISO 9001" },
    { src: "/company/cert-2.jpg", label: "ISO 14001" },
    { src: "/company/cert-3.jpg", label: "특허" },
    { src: "/company/cert-4.jpg", label: "연구소 인증" },
];

export default function CompanyCerts() {
    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>Certification</h2>
            <p className={styles.sub}>인증/증빙서류</p>

            <div className={styles.grid}>
                {certs.map((c) => (
                    <figure className={styles.card} key={c.src}>
                        <div className={styles.imgBox}>
                            <Image
                                src={c.src}
                                alt={c.label}
                                fill
                                sizes="(max-width: 520px) 50vw, (max-width: 980px) 50vw, 25vw"
                                className={styles.img}
                                priority={false}
                            />
                        </div>
                        <figcaption className={styles.cap}>{c.label}</figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
}