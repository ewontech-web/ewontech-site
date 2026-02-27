import styles from "./ContactInquirySection.module.css";
import Container from "@/components/layout/Container";
import ContactForm from "./ContactForm";

export default function ContactInquirySection() {
    return (
        <Container>
            <div className={styles.grid}>
                <div className={styles.left}>
                    <ContactForm />
                </div>

                <div className={styles.right}>
                    <img src="/contact/inquiry.jpg" alt="" className={styles.rightImg} />
                </div>
            </div>
        </Container>
    );
}