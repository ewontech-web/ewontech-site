//(배너 + 타이틀)

import Image from "next/image";
import styles from "./ContactHero.module.css";
import Container from "@/components/layout/Container";

export default function ContactHero() {
    return (
        <section className={styles.hero}>
            <Image
                src="/contact/hero.jpg"
                alt="Contact hero"
                fill
                priority
                className={styles.heroImg}
            />
            <div className={styles.overlay} />

            <Container>
                <div className={styles.center}>
                    <h1 className={styles.title}>Contact</h1>
                </div>
            </Container>
        </section>
    );
}