import Link from "next/link";
import Container from "./Container";

export default function Footer() {
    return (
        <footer className="border-t bg-neutral-950 text-neutral-200">
            <Container>
                <div className="grid gap-6 py-10 md:grid-cols-3">
                    <div className="space-y-2">
                        <div className="text-lg font-semibold">이원테크</div>
                        <p className="text-sm text-neutral-400">
                            산업 전자제작 OEM/ODM 개발·생산 파트너
                        </p>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="font-semibold">Menu</div>
                        <div className="flex flex-col gap-1 text-neutral-400">
                            <Link className="hover:text-white" href="/">Home</Link>
                            <Link className="hover:text-white" href="/company">Company</Link>
                            <Link className="hover:text-white" href="/products">Products</Link>
                            <Link className="hover:text-white" href="/contact">Contact</Link>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="font-semibold">Contact</div>
                        <div className="text-neutral-400">
                            <div>이메일: ewontec@gmail.com</div>
                            <div>전화: 031 427 1243</div>
                            <div>주소: 경기도 군포시 고산로 148번길 17 A-1708(당정동, 군포IT밸리)</div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-800 py-6 text-xs text-neutral-500">
                    © {new Date().getFullYear()} EwonTech. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}