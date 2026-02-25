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

#### Common (재사용 컴포넌트)
- `components/common/PageHero.tsx` + `PageHero.module.css`  
  공통 페이지 배너(타이틀/서브타이틀/배경 이미지 props)
- `components/common/AutoSwapImage/*`  
  이미지 자동 전환(페이드)
- `components/common/HoverSwapImage/*`  
  데스크탑 hover 시 이미지 전환(모바일은 정적)
- `components/common/HoverCollage/*`  
  여러 이미지 콜라주(hover 시 특정 패널 확대)

#### Company (섹션 단위 컴포넌트)
- `components/company/CompanyIntro.tsx` + `CompanyIntro.module.css`  
  회사 소개(텍스트 + 이미지, 모바일에서 이미지 숨김)
- `components/company/CompanyValues.tsx` + `CompanyValues.module.css`  
  사훈(카드형)
- `components/company/CompanyCapabilitySection.tsx` + `CompanyCapabilitySection.module.css`  
  운영 체계/생산 역량(이미지 + 설명 3개)
- `components/company/CompanyCerts.tsx` + `CompanyCerts.module.css`  
  인증서 섹션(모바일 2열/비율 통일)
- `components/company/CompanyOrgChart.tsx` + `CompanyOrgChart.module.css`  
  조직도 + 인원 현황(모바일 가로 드래그)
- `components/company/CompanyHistory.tsx` + `CompanyHistory.module.css`  
  연혁(모바일 스크롤 기반 active / 데스크탑 첫 카드 강조)
- `components/company/index.ts` : 배럴 export

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

#### Root
- `public/ewon_logo.png` : 헤더 로고

#### Company
- `public/company/hero.jpg` : Company Hero 배경
- `public/company/intro.jpg` : Company 소개(CompanyIntro) 이미지

**Capability / Photo**
- `public/company/cap-0.jpg` : 일괄 생산 체계 이미지 A
- `public/company/cap-1.jpg` : 운영 체계/생산 역량 이미지 A
- `public/company/cap-2.jpg` : 운영 체계/생산 역량 이미지 B
- `public/company/cap-3.jpg` : 장비/검사 이미지 A
- `public/company/cap-4.jpg` : 장비/검사 이미지 B
- `public/company/cap-5.jpg` : 장비/검사 이미지 C
- `public/company/cap-6.jpg` : 장비/검사 이미지 D

**Certification**
- `public/company/cert-1.jpg` ~ `cert-4.jpg` : 인증서 이미지(모바일 2열/비율 통일 적용)

#### Contact
- `public/contact/hero.jpg` : Contact Hero 배경
- `public/contact/inquiry.jpg` : 문의 섹션(폼 옆 이미지)

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

### v1 4회차 (Company 페이지 v1) Company (진행)
- Company 페이지 v1 구현(소개/신뢰/요약 중심으로 구성)
  - `app/company/page.tsx` + `page.module.css`
  - `components/company/*` 섹션 단위 컴포넌트로 분리
- CompanyIntro 개선
  - 이미지 비율 고정(aspect-ratio)로 레이아웃 안정화
  - 모바일에서는 소개 이미지 숨김 처리(가독성 우선)
- Certification(인증서) 섹션 개선
  - 모바일에서 2열 배치 유지 + 카드 비율 고정으로 과도한 높이 방지
  - 인증서 이미지 비율 통일(에셋 교체 시 캐시 이슈 대응: 파일명 버전업 권장)
- Organization(조직도) 섹션 개선
  - 트리(라인 연결) 형태로 재구현
  - 모바일에서 조직도 + 인원표를 한 영역에서 함께 가로 스크롤(드래그) 되도록 개선
  - 모바일 스크롤 이슈(touch-action) 튜닝
- History(연혁) 섹션 개선
  - 카드 + 라인/도트 스타일로 가독성 및 색감 강화
  - 데스크탑에서는 첫 카드(회사 설립) 기본 강조(모바일 동작과 분리)
- 문의 CTA(ContactCTA) 개선
  - 오시는 길 / 문의하기 2버튼 구성
  - 앵커 이동 적용 예정: `/contact#location`, `/contact#form` (Contact 섹션에 id 부여 필요)
- 공통 이미지/인터랙션 컴포넌트 확장(재사용 목적)
  - `AutoSwapImage`(자동 이미지 전환), `HoverSwapImage`(hover 전환) 등 common 컴포넌트 추가/적용
  - 과한 자동 전환은 지양하고, Company에서는 1개 섹션 수준으로 제한하는 방향
- Company에 “운영 체계와 생산 역량” 섹션 추가 결정(요약형)
  - Company에서는 요약만, 상세는 Business로 유도하는 원칙 유지

---