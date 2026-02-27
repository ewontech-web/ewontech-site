// “섹션 배치/간격”만 (그리드, 패딩, 섹션 간격)

import styles from "./page.module.css";
import { ContactInquirySection, ContactMapSection } from "@/components/contact";
import Container from "@/components/layout/Container";

import PageHero from "../../components/common/PageHero";
import Footer from "@/components/layout/Footer";

<PageHero
    title="Company"
    subtitle="생산·검증 기반의 협력 경험으로 안정적인 제조 지원을 제공합니다."
    bgImage="/company/hero.jpg"
/>

export default function ContactPage() {
    return (
        <main className={styles.page}>
            <PageHero
                title="Contact "
                subtitle="고객님의 문의를 기다립니다."
                bgImage="/contact/hero.jpg"
            />


            <section id="form">
                <section className={styles.section}>
                    <Container>
                        <h2 className={styles.sectionTitle}>문의하기</h2>
                    </Container>
                    <ContactInquirySection />
                </section>
            </section>

            <section id="location">
                <section className={styles.section}>
                    <Container>
                        <h2 className={styles.sectionTitle}>LOCATION</h2>
                    </Container>
                    <ContactMapSection />
                </section>
            </section>

            <Footer />
        </main>
    );
}