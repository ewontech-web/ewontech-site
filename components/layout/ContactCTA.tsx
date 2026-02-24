import Link from "next/link";
import Container from "./Container";

export default function ContactCTA() {
    return (
        <section className="border-t bg-white">
            <Container>
                <div className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">프로젝트 상담이 필요하신가요?</h2>
                        <p className="mt-1 text-sm text-neutral-600">
                            요구사항을 남겨주시면 빠르게 연락드리겠습니다.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
                    >
                        문의하기
                    </Link>
                </div>
            </Container>
        </section>
    );
}