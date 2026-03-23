import type { MetadataRoute } from 'next';
import { siteSettings } from '@/content/settings/site';

const routes = ['', '/services', '/work', '/process', '/about', '/insights', '/contact', '/start-project'];
const locales = ['en', 'ar'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteSettings.baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8
    }))
  );
}
