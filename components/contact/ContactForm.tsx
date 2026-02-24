"use client";

import { useMemo, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import styles from "./ContactForm.module.css";

type Category = "견적문의" | "제품문의" | "기타상담";
type Status = "idle" | "submitting" | "success" | "error" | "warning";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const resetTimerRef = useRef<number | null>(null);

    const categories: Category[] = useMemo(() => ["견적문의", "제품문의", "기타상담"], []);

    // fields
    const [category, setCategory] = useState<Category>("견적문의");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // spam (honeypot)
    const [companySite, setCompanySite] = useState("");

    // hCaptcha token
    const [hToken, setHToken] = useState("");
    const [hCaptchaError, setHCaptchaError] = useState(false);

    // status
    const [status, setStatus] = useState<Status>("idle");
    const isSubmitting = status === "submitting";

    const placeholder = useMemo(() => {
        if (category === "견적문의")
            return "예) 제품/사양, 수량, 납기, 설치 환경, 도면/사진 유무 등을 적어주세요.";
        if (category === "제품문의")
            return "예) 사용 목적/환경, 필요한 기능, 연동/통신 방식, 현재 상황을 적어주세요.";
        return "예) 문의 배경, 요청 사항, 연락 가능 시간을 적어주세요.";
    }, [category]);

    const buttonText = useMemo(() => {
        switch (status) {
            case "submitting":
                return "전송중...";
            case "success":
                return "전송 완료! 확인 후 답변드리겠습니다.";
            case "error":
                return "전송 실패. 잠시 후 다시 시도해주세요.";
            case "warning":
                return "필수 항목을 입력해 주세요.";
            default:
                return "문의신청하기";
        }
    }, [status]);

    function clearResetTimer() {
        if (resetTimerRef.current) {
            window.clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
        }
    }

    function bounceBackToIdle(ms = 2500) {
        clearResetTimer();
        resetTimerRef.current = window.setTimeout(() => setStatus("idle"), ms);
    }

    function validateFront(): boolean {
        if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
            setStatus("warning");
            bounceBackToIdle(2200);
            return false;
        }
        if (!email.includes("@")) {
            setStatus("warning");
            bounceBackToIdle(2200);
            return false;
        }
        // 캡차 토큰 필수
        if (!hToken) {
            setHCaptchaError(true);
            setStatus("warning");
            bounceBackToIdle(2200);
            return false;
        }
        return true;
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearResetTimer();

        // honeypot
        if (companySite.trim()) {
            setStatus("success");
            bounceBackToIdle(2500);
            return;
        }

        if (!validateFront()) return;

        setStatus("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category,
                    name,
                    email,
                    company,
                    phone,
                    message,
                    company_site: companySite,
                    hcaptchaToken: hToken,
                }),
            });

            const data = (await res.json()) as { ok: boolean; message?: string };

            if (!res.ok || !data.ok) {
                setStatus("error");
                bounceBackToIdle(2600);
                return;
            }

            setStatus("success");

            // reset fields (category 유지)
            setName("");
            setEmail("");
            setCompany("");
            setPhone("");
            setMessage("");
            setHToken(""); // 캡차 토큰도 초기화
            formRef.current?.reset();

            bounceBackToIdle(2800);
        } catch {
            setStatus("error");
            bounceBackToIdle(2600);
        }
    }

    return (
        <div className={styles.wrap}>
            <p className={styles.kicker}>Contact Ewon</p>
            <p className={styles.desc}>
                이원테크를 찾아주셔서 감사합니다.
                <br />
                문의내용을 남겨주시면 담당자 확인 후 회신드리겠습니다.
                <br />
                감사합니다.
            </p>

            <div className={styles.block}>
                <p className={styles.label}>분류(Category)</p>
                <div className={styles.pills}>
                    {categories.map((c) => (
                        <button
                            key={c}
                            type="button"
                            className={`${styles.pill} ${c === category ? styles.pillActive : ""}`}
                            onClick={() => setCategory(c)}
                            disabled={isSubmitting}
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <div className={styles.hr} />
            </div>

            <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
                {/* Honeypot */}
                <input
                    type="text"
                    name="company_site"
                    value={companySite}
                    onChange={(e) => setCompanySite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className={styles.honeypot}
                />

                <div className={styles.row2}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            성함(담당자) <span className={styles.req}>*</span>
                        </span>
                        <input
                            className={styles.input}
                            placeholder="홍길동"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            이메일주소 <span className={styles.req}>*</span>
                        </span>
                        <input
                            className={styles.input}
                            placeholder="name@company.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className={styles.row2}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>회사명</span>
                        <input
                            className={styles.input}
                            placeholder="회사명"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </label>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>
                            연락처 <span className={styles.req}>*</span>
                        </span>
                        <input
                            className={styles.input}
                            placeholder="010-0000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </label>
                </div>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>
                        문의내용 <span className={styles.req}>*</span>
                    </span>
                    <textarea
                        className={styles.textarea}
                        placeholder={placeholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmitting}
                    />
                </label>

                {/* hCaptcha */}
                <div style={{ margin: "12px 0" }}>
                    <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
                        onVerify={(token) => {
                            setHToken(token);
                            setHCaptchaError(false);
                        }}
                        onExpire={() => {
                            setHToken("");
                            setHCaptchaError(true);
                        }}
                    />
                    {hCaptchaError && (
                        <p className={styles.hCaptchaHelp}>hCaptcha 인증은 필수입니다.</p>
                    )}
                </div>

                {/* 상태에 따라 버튼만 변함 */}
                <button
                    className={`${styles.submit} ${styles[`submit_${status}`]}`}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {buttonText}
                </button>

                <div className={styles.note}>개인정보는 문의 응대 목적 외로 사용하지 않습니다.</div>
                <input type="hidden" name="category" value={category} />
            </form>
        </div>
    );
}