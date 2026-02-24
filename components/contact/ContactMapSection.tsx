import styles from "./ContactMapSection.module.css";
import Container from "@/components/layout/Container";

const LOCATION = {
    name: "군포 공장",
    address: "경기도 군포시 고산로 148번길 17 A-1708(당정동, 군포IT밸리)",
    mapQuery: "경기도 군포시 고산로148번길 17",
    naverUrl:
        "https://map.naver.com/p/search/경기도%20군포시%20고산로148번길%2017%2C%20A동%201708호(당정동%2C%20군포IT밸리)",
    kakaoUrl:
        "https://map.kakao.com/link/search/경기도%20군포시%20고산로148번길%2017%2C%20A동%201708호(당정동%2C%20군포IT밸리)",
    directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=경기도%20군포시%20고산로148번길%2017%2C%20A동%201708호(당정동%2C%20군포IT밸리)",
};

export default function ContactMapSection() {
    const iframeSrc = `https://www.google.com/maps?q=${encodeURIComponent(
        LOCATION.mapQuery
    )}&output=embed`;

    return (
        <section className={styles.section} id="location">
            <Container>
                <h2 className={styles.title}>오시는 길</h2>

                {/* ✅ 지도 */}
                <div className={styles.card}>
                    <div className={styles.mapFrame}>
                        <iframe
                            title={`${LOCATION.name} 위치`}
                            src={iframeSrc}
                            width="100%"
                            height="420"
                            loading="lazy"
                            style={{ border: 0, display: "block" }}
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* ✅ 주소 + 버튼 */}
                <div className={styles.addrCard}>
                    <div className={styles.addrBox}>
                        <div className={styles.addrLabel}>주소</div>
                        <div className={styles.addrText}>{LOCATION.address}</div>
                    </div>

                    <div className={styles.actions}>
                        <a className={styles.miniBtn} href={LOCATION.naverUrl} target="_blank" rel="noreferrer">
                            네이버지도
                        </a>
                        <a className={styles.miniBtn} href={LOCATION.kakaoUrl} target="_blank" rel="noreferrer">
                            카카오맵
                        </a>
                        <a className={`${styles.miniBtn} ${styles.strong}`} href={LOCATION.directionsUrl} target="_blank" rel="noreferrer">
                            길찾기
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}