import Image from "next/image";
import styles from "./CompanyIntro.module.css";

export default function CompanyIntro() {
    return (
        <section className={styles.wrap} aria-labelledby="company-intro-title">
            <div className={styles.grid}>
                <div className={styles.copy}>
                    <h2 id="company-intro-title" className={styles.head}>
                        (주)이원테크
                    </h2>

                    <p className={styles.p}>
                        일괄 생산 지원과 구축을 목표로 운영합니다.
                    </p>
                    <p className={styles.p}>
                        제조 협력 경험을 바탕으로 품질 관리 및 납기 대응을 지원합니다.
                    </p>
                    <p className={styles.p}>
                        단순 OEM 생산에 한정되지 않고 SMD 및 파견 인력을 기반으로 생산
                        체계를 구축합니다.
                    </p>
                </div>

                {/* ✅ 모바일에서 숨김 */}
                <div className={styles.imgBox} aria-hidden="true">
                    <Image
                        src="/company/intro.jpg"
                        alt=""
                        fill
                        sizes="(max-width: 860px) 0px, 45vw"
                        className={styles.img}
                        priority={false}
                    />
                </div>
            </div>
        </section>
    );
}