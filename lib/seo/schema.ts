import { siteSettings } from '@/content/settings/site';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteSettings.brand,
  url: siteSettings.baseUrl,
  email: 'anageeb@gmail.com',
  telephone: '+201023968999'
};

export const breadcrumbSchema = (items: Array<{ name: string; item: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.item }))
});
