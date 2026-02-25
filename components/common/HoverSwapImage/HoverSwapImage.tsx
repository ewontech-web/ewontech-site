import Image from "next/image";
import styles from "./HoverSwapImage.module.css";

type Img = { src: string; alt: string };

export default function HoverSwapImage({
    primary,
    secondary,
    sizes = "(max-width: 860px) 100vw, 54vw",
}: {
    primary: Img;
    secondary: Img;
    sizes?: string;
}) {
    return (
        <div className={styles.frame}>
            <div className={`${styles.layer} ${styles.base}`}>
                <Image
                    src={primary.src}
                    alt={primary.alt}
                    fill
                    sizes={sizes}
                    className={styles.img}
                    priority={false}
                />
            </div>

            <div className={`${styles.layer} ${styles.top}`}>
                <Image
                    src={secondary.src}
                    alt={secondary.alt}
                    fill
                    sizes={sizes}
                    className={styles.img}
                    priority={false}
                />
            </div>
        </div>
    );
}