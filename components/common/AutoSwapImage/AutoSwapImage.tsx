"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AutoSwapImage.module.css";

type Props = {
    images: { src: string; alt: string }[];
    intervalMs?: number; // default 3500
};

export default function AutoSwapImage({ images, intervalMs = 3500 }: Props) {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!images || images.length < 2) return;
        const id = window.setInterval(() => {
            setIdx((v) => (v + 1) % images.length);
        }, intervalMs);
        return () => window.clearInterval(id);
    }, [images, intervalMs]);

    return (
        <div className={styles.frame}>
            {images.map((img, i) => (
                <div
                    key={img.src}
                    className={`${styles.layer} ${i === idx ? styles.show : styles.hide}`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 860px) 100vw, 54vw"
                        className={styles.img}
                        priority={i === 0}
                    />
                </div>
            ))}
        </div>
    );
}