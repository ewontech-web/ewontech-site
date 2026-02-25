import Link from "next/link";
import Container from "./Container";

export default function ContactCTA() {
    return (
        <section className="border-t bg-gradient-to-b from-white to-neutral-50">
            <Container>
                <div className="flex flex-col gap-5 py-12 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                            프로젝트 상담이 필요하신가요?
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
                            문의 내용을 남겨주시면 담당자가 확인 후 신속히 회신드리겠습니다.
                        </p>

                        {/* ✅ 작은 신뢰/안내 */}
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-600">
                            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                                견적/납기 상담
                            </span>
                            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                                생산·검증 문의
                            </span>
                            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                                협력 제안
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        {/* ✅ 보조 액션: 연락처/오시는길 확인 유도 */}
                        <Link
                            href="/contact#location"
                            className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 sm:px-5"
                        >
                            오시는 길
                        </Link>

                        {/* ✅ 메인 CTA: 모바일에서 풀폭 + 터치 영역 확대 */}
                        <Link
                            href="/contact#form"
                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 sm:w-auto sm:px-5"
                        >
                            문의하기
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}