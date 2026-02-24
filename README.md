# EwonTech Website (v1)

Next.js(App Router) + GitHub + Vercel 기반으로 운영하는 이원테크 홈페이지(v1)입니다.  
v1은 **페이지/섹션 구조를 빠르게 고정**하고, Contact 폼은 **UI 완료 → 기능(검증/전송) 구현** 순서로 진행합니다.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- CSS Modules
- Deployment: Vercel
- Email: Resend
- Spam Protection: hCaptcha

---

## Project Structure

### App Router

- `app/page.tsx` : Home
- `app/company/page.tsx` : Company
- `app/products/page.tsx` : Products
- `app/contact/page.tsx` : Contact
- `app/api/contact/route.ts` : Contact 문의 API (검증 + hCaptcha verify + Resend 메일 발송)
- `app/layout.tsx` : 공통 레이아웃 적용
- `app/globals.css` : 전역 스타일

### Components

#### Layout (공통)

- `components/layout/Header.tsx` : 상단 헤더/내비게이션
- `components/layout/Footer.tsx` : 푸터
- `components/layout/Container.tsx` : 컨테이너(최대 폭/패딩)
- `components/layout/ContactCTA.tsx` : 공통 문의 CTA(필요 시)

#### Contact (섹션 단위 컴포넌트)

- `components/contact/ContactHero.tsx` + `ContactHero.module.css`  
  Contact 상단 히어로(배너)

- `components/contact/ContactInquirySection.tsx` + `ContactInquirySection.module.css`  
  문의 섹션(폼 + 우측 이미지)

- `components/contact/ContactForm.tsx` + `ContactForm.module.css`  
  문의 폼(UI + 상태 UX + hCaptcha 위젯 + 전송)

- `components/contact/ContactMapSection.tsx` + `ContactMapSection.module.css`  
  오시는 길(구글 지도 iframe + 네이버/카카오/길찾기 버튼)

- `components/contact/index.ts` : 배럴 export

### Public Assets

- `public/contact/hero.jpg` : Contact 히어로 이미지
- `public/contact/inquiry.jpg` : 문의 섹션 우측 이미지
- `public/ewon_logo.png` : 로고

---

## Work Log (v1)

### v1 1회차
- GitHub Organization/Repo 생성 및 Vercel 배포 흐름 구축
- 공통 레이아웃(Header/Footer/Container) 뼈대 구성

### v1 2회차
- Contact 페이지 UI/구조 구현 및 파일 구조 확정
- 문의 섹션(폼+이미지) 레이아웃 안정화(모바일에서는 이미지 숨김)
- 오시는 길 섹션: Google Maps iframe + 네이버/카카오/길찾기 버튼 구성
- UI/UX는 여기서 멈추고 기능 구현 단계로 전환

### v1 3회차 (Contact 기능 구현) Contact (완료)
- ContactForm 전송 UX 구현(버튼 1개가 상태별로 문구/색 변경: idle/submitting/success/error/warning)
- 필수 항목 표시: `*`만 빨간색 처리
- Honeypot(숨김 필드)로 1차 스팸 방지 적용
- API Route(`app/api/contact/route.ts`) 구현: 서버 재검증 + Resend 메일 발송
- hCaptcha 적용:
  - 프론트: hCaptcha 위젯 + 토큰 전송
  - 서버: `siteverify` 검증 통과 시에만 메일 발송
  - 미체크 제출 시 hCaptcha 하단에 빨간 안내 문구 표시
- Vercel Environment Variables 설정 완료:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
  - `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
  - `HCAPTCHA_SECRET_KEY`

> 참고: 발신 도메인은 Resend에 Verified된 `zeuon.com`을 사용(이원테크 v1 단계에서는 비용/도메인 제한 고려).

---

## Local Development

### 1) Install
```bash
npm i

## Next Steps

## 다음 할 일(너가 말한 플랜 기준)
1) **README 커밋/푸시** (dev)  
2) **v1 페이지들 마무리** (IA 기준으로 텍스트/이미지/섹션 정리)  
3) v1 완성 후  
   - **이원테크 도메인 구매 → Vercel 연결**  
   - 그 다음 Production 테스트