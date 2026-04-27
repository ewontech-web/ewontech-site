"use client";

import { PropsWithChildren, useEffect, useRef, ElementType } from "react";

type RevealProps<T extends ElementType = "div"> = PropsWithChildren<{
    as?: T;
    className?: string;
    once?: boolean;
}>;

export default function Reveal<T extends ElementType = "div">({
    as,
    className = "",
    once = true,
    children,
}: RevealProps<T>) {
    const Tag = (as ?? "div") as ElementType;

    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current as Element | null;
        if (!el) return;

        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reduce) {
            (el as HTMLElement).classList.add("isInView");
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        (e.target as HTMLElement).classList.add("isInView");
                        if (once) io.unobserve(e.target);
                    }
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [once]);

    return (
        <Tag ref={ref} className={`reveal ${className}`}>
            {children}
        </Tag>
    );
}
