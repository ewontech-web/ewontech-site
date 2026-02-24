// “섹션 배치/간격”만 (그리드, 패딩, 섹션 간격)

import styles from "./page.module.css";
import { ContactHero, ContactInquirySection, ContactMapSection } from "@/components/contact";
import Container from "@/components/layout/Container";

export default function ContactPage() {
    return (
        <main className={styles.page}>
            <ContactHero />

            <section className={styles.section}>
                <Container>
                    <h2 className={styles.sectionTitle}>문의하기</h2>
                </Container>
                <ContactInquirySection />
            </section>

            <section className={styles.section}>
                <Container>
                    <h2 className={styles.sectionTitle}>LOCATION</h2>
                </Container>
                <ContactMapSection />
            </section>
        </main>
    );
}