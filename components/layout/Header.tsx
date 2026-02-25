"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

const nav = [
    { href: "/", label: "Home" },
    { href: "/company", label: "Company" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    // 메뉴 열렸을 때 스크롤 잠금
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // 라우트 이동용: 링크 클릭 시 닫기
    const close = () => setOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Image
                            className="h-8 w-[50px] object-contain"
                            src="/ewon_logo.png"
                            alt="이원테크"
                            width={50}
                            height={32}
                            priority
                        />
                        <span>이원테크</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 md:flex">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-neutral-700 hover:text-black"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <Link
                        href="/contact"
                        className="hidden rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-neutral-800 md:inline-flex"
                    >
                        문의하기
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white/70 text-neutral-900 md:hidden"
                        aria-label="메뉴 열기"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M4 7h16M4 12h16M4 17h16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </Container>

            {/* Mobile Drawer */}
            {open && (
                <>
                    {/* overlay */}
                    <div
                        className="fixed inset-0 z-50 bg-black/40"
                        onClick={close}
                        aria-hidden="true"
                    />
                    {/* panel */}
                    <div className="fixed right-0 top-0 z-50 h-dvh w-[78%] max-w-[340px] bg-white shadow-xl">
                        <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-4">
                            <span className="font-semibold">메뉴</span>
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200"
                                aria-label="메뉴 닫기"
                                onClick={close}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M6 6l12 12M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-1 px-4 py-4">
                            {nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={close}
                                    className="rounded-md px-3 py-3 text-base text-neutral-800 hover:bg-neutral-50"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="mt-3 border-t border-neutral-100 pt-3">
                                <Link
                                    href="/contact"
                                    onClick={close}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                                >
                                    문의하기
                                </Link>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
}