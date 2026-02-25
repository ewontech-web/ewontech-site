import PageHero from "../../components/common/PageHero";

<PageHero
    title="Company"
    subtitle="생산·검증 기반의 협력 경험으로 안정적인 제조 지원을 제공합니다."
    bgImage="/company/hero.jpg"
/>

export default function ProductsPage() {
    return (
        <main>
            <PageHero
                title="Products"
                subtitle="주요 생산 품목 및 생산 체계 소개"
                bgImage="/products/hero.jpg"
            />
        </main>
    );
}