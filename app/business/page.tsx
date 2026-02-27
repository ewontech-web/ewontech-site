import { BusinessAreas, ProcessStrip, ProductionShowcase } from "@/components/business";
import styles from "./page.module.css";

import ContactCTA from "@/components/layout/ContactCTA";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";

export default function BusinessPage() {
    return (
        <main className={styles.main}>
            <PageHero
                title="Business"
                subtitle="이원테크는 전자 제조 기반의 OEM/ODM 및 양산 지원을 제공합니다."
                bgImage="/company/hero.jpg"
            />

            <section className={styles.section}>
                <Container>
                    <BusinessAreas />
                </Container>
            </section>

            <section className={styles.section}>
                <Container>
                    <ProductionShowcase />
                </Container>
            </section>

            <section className={`${styles.section} ${styles.muted}`}>
                <Container>
                    <ProcessStrip />
                </Container>
            </section>

            <ContactCTA />

            <Footer />
        </main>
    );
}