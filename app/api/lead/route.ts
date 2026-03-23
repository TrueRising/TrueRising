import { NextResponse } from 'next/server';
import { isLocale } from '@/lib/i18n/locale-utils';
import { submitLead } from '@/lib/forms/submit-lead';

const requiredByType = {
  contact: ['name', 'company', 'contact', 'message'],
  start_project: ['name', 'company', 'phone', 'email', 'service', 'goals']
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, locale, payload } = body as {
      formType?: 'contact' | 'start_project';
      locale?: string;
      payload?: Record<string, string>;
    };

    if (!formType || !locale || !payload || !isLocale(locale) || !(formType in requiredByType)) {
      return NextResponse.json({ ok: false, message: 'Invalid submission payload.' }, { status: 400 });
    }

    const missing = requiredByType[formType].filter((key) => !payload[key]?.trim());
    if (missing.length > 0) {
      return NextResponse.json({ ok: false, message: 'Missing required fields.', missing }, { status: 400 });
    }

    const result = await submitLead({ formType, locale, payload });

    if (!result.delivered) {
      return NextResponse.json(
        {
          ok: false,
          message:
            locale === 'ar'
              ? 'تعذّر إرسال النموذج تلقائيًا حاليًا. تواصل معنا عبر واتساب أو البريد.'
              : 'Automated submission is currently unavailable. Please contact us via WhatsApp or email.',
          fallback: true
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: 'Unexpected server error.', fallback: true }, { status: 500 });
  }
}
