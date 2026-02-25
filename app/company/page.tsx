import styles from "./page.module.css";
import PageHero from "../../components/common/PageHero";
import ContactCTA from "@/components/layout/ContactCTA";

<PageHero
    title="Company"
    subtitle="생산·검증 기반의 협력 경험으로 안정적인 제조 지원을 제공합니다."
    bgImage="/company/hero.jpg"
/>

import {
    CompanyIntro,
    CompanyValues,
    CompanyCerts,
    CompanyOrgChart,
    CompanyHistory,
    CompanyCapabilitySection,
} from "../../components/company";

export default function CompanyPage() {
    return (
        <main className={styles.page}>
            <PageHero
                title="Company"
                subtitle="생산·검증 기반의 협력 경험으로 안정적인 제조 지원을 제공합니다."
                bgImage="/company/hero.jpg"
            />

            <section className={styles.section}>
                <CompanyIntro />
            </section>

            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <CompanyValues />
            </section>

            <section className={styles.section}>
                <CompanyCapabilitySection />
            </section>

            <section className={styles.section}>
                <CompanyCerts />
            </section>

            <section className={`${styles.section} ${styles.sectionSoft}`}>
                <CompanyOrgChart />
            </section>

            <section className={styles.section}>
                <CompanyHistory />
            </section>

            <ContactCTA />
        </main>
    );
}