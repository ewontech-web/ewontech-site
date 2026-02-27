import Image from "next/image";
import styles from "./HoverCollage.module.css";

type Img = { src: string; alt: string };

export default function HoverCollage({
    images,
    ratio = "16/9",
}: {
    images: Img[];
    ratio?: string; // ex) "16/9", "4/3"
}) {
    return (
        <div className={styles.wrap} style={{ aspectRatio: ratio }}>
            {images.map((img) => (
                <div className={styles.panel} key={img.src}>
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 860px) 90vw, 54vw"
                        className={styles.img}
                    />
                    <div className={styles.overlay} />
                </div>
            ))}
        </div>
    );
}