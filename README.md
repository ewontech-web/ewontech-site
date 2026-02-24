# EwonTech Website (v1)

Next.js(App Router) + GitHub + Vercel 기반으로 운영하는 이원테크 홈페이지(v1)입니다.  
v1은 **페이지/섹션 구조를 빠르게 고정**하고, Contact 폼은 **UI 완료 → 기능(검증/전송) 구현** 순서로 진행합니다.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- CSS Modules
- Deployment: Vercel
- (예정) Resend (메일 전송), hCaptcha (스팸 방지)

---

## Project Structure

### App Router

- `app/page.tsx` : Home
- `app/company/page.tsx` : Company
- `app/products/page.tsx` : Products
- `app/contact/page.tsx` : Contact
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
  문의 폼(입력/검증/전송 UX 적용 예정)

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
- 로고 업스케일/투명배경 리소스 정리
- UI/UX는 여기서 멈추고 기능 구현 단계로 전환

---

## Next Steps (v1 3회차)

### Phase 1. 프론트 필수 검증 + 전송 UX
- 필수 입력 검증(에러 표시)
- 전송 중 버튼 상태 변경(예: “전송 중…”)
- 전송 성공 시 버튼 문구 변경(예: “전송 완료”) 및 안내 메시지

### Phase 2. API Route 연결
- `app/api/contact/route.ts` 생성
- 서버 측 재검증 후 `{ ok: true }` 반환

### Phase 3. Resend 메일 전송
- API Route에서 Resend 호출로 실제 메일 발송

### Phase 4. 스팸 방지
- hCaptcha 토큰 검증 + (선택) 간단 rate-limit

---

## Notes

- Contact 문의 기능은 **프론트 검증 + 서버 재검증**(실무 정석) 방식으로 구현합니다.
- 모바일에서는 문의 섹션 우측 이미지를 숨기고 폼 중심 UX로 구성합니다.