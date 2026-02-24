//(필드 + 버튼 + 카테고리)

"use client";

import { useMemo, useState } from "react";
import styles from "./ContactForm.module.css";

type Category = "견적문의" | "제품문의" | "기타상담";

export default function ContactForm() {
    const categories: Category[] = useMemo(() => ["견적문의", "제품문의", "기타상담"], []);
    const [category, setCategory] = useState<Category>("견적문의");

    return (
        <div className={styles.wrap}>
            <p className={styles.kicker}>Contact Ewon</p>
            <p className={styles.desc}>
                이원테크를 찾아주셔서 감사합니다.
                <br />
                문의내용을 남겨주시면 담당자 확인 후 회신드리겠습니다.
                <br /> 감사합니다.
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
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <div className={styles.hr} />
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.row2}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>성함(담당자)</span>
                        <input className={styles.input} placeholder="홍길동" />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>이메일주소</span>
                        <input className={styles.input} placeholder="name@company.com" />
                    </label>
                </div>

                <div className={styles.row2}>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>회사명</span>
                        <input className={styles.input} placeholder="회사명" />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>연락처</span>
                        <input className={styles.input} placeholder="010-0000-0000" />
                    </label>
                </div>

                <label className={styles.field}>
                    <span className={styles.fieldLabel}>문의내용</span>
                    <textarea className={styles.textarea} placeholder="문의 내용을 입력해주세요." />
                </label>

                <button className={styles.submit} type="submit">
                    문의신청하기
                </button>

                <div className={styles.note}>
                    개인정보는 문의 응대 목적 외로 사용하지 않습니다.
                </div>

                {/* 숨김값(나중에 서버로 보낼 때 사용) */}
                <input type="hidden" value={category} name="category" />
            </form>
        </div>
    );
}