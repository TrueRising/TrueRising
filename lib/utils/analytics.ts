export type AnalyticsEvent =
  | 'hero_primary_cta_click'
  | 'hero_secondary_cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'contact_form_submit'
  | 'start_project_form_submit'
  | 'portfolio_item_open'
  | 'service_page_view'
  | 'language_switch';

export const trackEvent = (event: AnalyticsEvent, payload?: Record<string, string>) => {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[analytics]', event, payload ?? {});
  }
};
