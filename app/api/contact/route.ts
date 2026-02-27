import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmpty(v: unknown) {
    return !v || String(v).trim() === "";
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1) honeypot (봇이면 성공처럼 처리하고 종료)
        if (body.company_site) return NextResponse.json({ ok: true });

        // 2) server-side validation
        const required = ["category", "name", "email", "phone", "message"];
        for (const k of required) {
            if (isEmpty(body?.[k])) {
                return NextResponse.json(
                    { ok: false, message: "필수 항목을 입력해 주세요." },
                    { status: 400 }
                );
            }
        }

        // 3) hCaptcha verify (Resend 전에!)
        const token = body.hcaptchaToken;
        if (!token) {
            return NextResponse.json(
                { ok: false, message: "캡차 인증이 필요합니다." },
                { status: 400 }
            );
        }

        const secret = process.env.HCAPTCHA_SECRET_KEY;
        if (!secret) {
            return NextResponse.json(
                { ok: false, message: "캡차 설정이 누락되었습니다." },
                { status: 500 }
            );
        }

        const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token }),
        });

        const verifyData = (await verifyRes.json()) as { success: boolean };
        if (!verifyData.success) {
            return NextResponse.json(
                { ok: false, message: "캡차 인증에 실패했습니다." },
                { status: 403 }
            );
        }

        // 4) Resend send
        const to = process.env.CONTACT_TO_EMAIL;
        const from = process.env.CONTACT_FROM_EMAIL;

        if (!process.env.RESEND_API_KEY || !to || !from) {
            return NextResponse.json(
                { ok: false, message: "메일 설정이 누락되었습니다." },
                { status: 500 }
            );
        }

        const subject = `[이원테크 문의] ${body.category} / ${body.name}`;

        const html = `
      <div style="font-family:Arial,sans-serif; line-height:1.6">
        <h2>이원테크 문의 접수</h2>
        <p><b>분류</b>: ${body.category}</p>
        <p><b>성함</b>: ${body.name}</p>
        <p><b>이메일</b>: ${body.email}</p>
        <p><b>회사명</b>: ${body.company || "-"}</p>
        <p><b>연락처</b>: ${body.phone}</p>
        <hr/>
        <p><b>문의내용</b></p>
        <pre style="white-space:pre-wrap">${String(body.message)}</pre>
      </div>
    `;

        const { error } = await resend.emails.send({
            from,
            to,
            subject,
            html,
            replyTo: body.email,
        });

        if (error) {
            return NextResponse.json(
                { ok: false, message: "메일 전송 실패. 잠시 후 다시 시도해주세요." },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json(
            { ok: false, message: "서버 오류. 잠시 후 다시 시도해주세요." },
            { status: 500 }
        );
    }
}