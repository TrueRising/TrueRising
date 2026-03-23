'use client';

import { useEffect } from 'react';
import { trackEvent, type AnalyticsEvent } from '@/lib/utils/analytics';

export const PageEvent = ({ event, payload }: { event: AnalyticsEvent; payload?: Record<string, string> }) => {
  useEffect(() => {
    trackEvent(event, payload);
  }, [event, payload]);

  return null;
};
