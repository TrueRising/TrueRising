const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'hello@obsidianagency.co';

const sendEmail = async ({ subject, html }: { subject: string; html: string }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { attempted: false, delivered: false, reason: 'RESEND_API_KEY is missing' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Obsidian Leads <onboarding@resend.dev>',
      to: [CONTACT_TO_EMAIL],
      subject,
      html
    })
  });

  return {
    attempted: true,
    delivered: response.ok,
    reason: response.ok ? null : await response.text()
  };
};

const sendToGoogleSheets = async (payload: Record<string, unknown>) => {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { attempted: false, delivered: false, reason: 'GOOGLE_SHEETS_WEBHOOK_URL is missing' };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return {
    attempted: true,
    delivered: response.ok,
    reason: response.ok ? null : await response.text()
  };
};

export const submitLead = async ({
  formType,
  locale,
  payload
}: {
  formType: 'contact' | 'start_project';
  locale: 'ar' | 'en';
  payload: Record<string, string>;
}) => {
  const lines = Object.entries(payload)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value || '-'}</p>`)
    .join('');

  const emailResult = await sendEmail({
    subject:
      formType === 'contact'
        ? `Obsidian Contact Lead (${locale.toUpperCase()})`
        : `Obsidian Start Project Lead (${locale.toUpperCase()})`,
    html: `<h2>New ${formType} submission</h2>${lines}`
  });

  const sheetsResult = await sendToGoogleSheets({
    formType,
    locale,
    submittedAt: new Date().toISOString(),
    ...payload
  });

  return {
    emailResult,
    sheetsResult,
    delivered: emailResult.delivered || sheetsResult.delivered
  };
};
