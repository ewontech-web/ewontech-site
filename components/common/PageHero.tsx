import styles from "./PageHero.module.css";

type Props = {
    title: string;
    subtitle?: string;
    bgImage: string; // ex) "/company/hero.jpg"
};

export default function PageHero({ title, subtitle, bgImage }: Props) {
    return (
        <section className={styles.hero}>
            <div className={styles.bg} style={{ backgroundImage: `url(${bgImage})` }} />
            <div className={styles.overlay} />
            <div className={styles.inner}>
                <h1 className={styles.title}>{title}</h1>
                {subtitle && <p className={styles.sub}>{subtitle}</p>}
            </div>
        </section>
    );
}