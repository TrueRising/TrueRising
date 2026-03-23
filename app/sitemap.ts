import type { MetadataRoute } from 'next';
import { siteSettings } from '@/content/settings/site';
import { getInsights, getServices, getWork } from '@/content';
import { locales } from '@/lib/i18n/config';

const staticRoutes = ['', '/services', '/work', '/process', '/about', '/insights', '/contact', '/start-project'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => {
    const serviceRoutes = getServices(locale).map((service) => `/services/${service.slug}`);
    const workRoutes = getWork(locale).map((item) => `/work/${item.slug}`);
    const insightsRoutes = getInsights(locale).map((item) => `/insights/${item.slug}`);

    return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightsRoutes].map((route) => ({
      url: `${siteSettings.baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7
    }));
  });
}
