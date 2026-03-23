import type { MetadataRoute } from 'next';
import { siteSettings } from '@/content/settings/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteSettings.baseUrl}/sitemap.xml`
  };
}
