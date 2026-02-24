import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

const nav = [
    { href: "/", label: "Home" },
    { href: "/company", label: "Company" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Image
                            className="width: 50px; height: 32px; object-fit: contain;"
                            src="/ewon_logo.png"
                            alt="이원테크"
                            width={50}
                            height={32}
                            priority
                        />
                        <span>이원테크</span>
                    </Link>

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

                    <Link
                        href="/contact"
                        className="rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-neutral-800"
                    >
                        문의하기
                    </Link>
                </div>
            </Container>
        </header>
    );
}