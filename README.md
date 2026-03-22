# Nageeb Website Delivery Package

Production-ready static website for **Nageeb** (web design + development services), targeting SMEs in Egypt.

## Stack
- HTML/CSS/Vanilla JS (fast, low-maintenance)
- Decap CMS config for blog/settings editing
- Netlify-ready deploy configuration

## Local preview
```bash
python3 -m http.server 8080
# open http://localhost:8080/docs/
```

## Project structure
- `docs/*.html` → website pages
- `docs/assets/css/styles.css` → global styles
- `docs/assets/js/content.js` → editable nav/language/blog seed content
- `docs/assets/js/main.js` → shell rendering (header/footer/lang toggle)
- `docs/admin/*` → Decap CMS admin setup
- `docs/content/*` → CMS-managed content files
- `netlify.toml` → deploy and security headers

## Edit content quickly
1. Update text sections directly in page HTML files.
2. Update nav labels/announcement text in `docs/assets/js/content.js`.
3. Update contact info in:
   - `docs/contact.html`
   - `docs/request.html`
   - `docs/content/settings/contact.json`

## Netlify deployment
- Build command: *(none)*
- Publish directory: `docs`
- Forms: enabled via `data-netlify="true"` attributes
- CMS: requires Netlify Identity + Git Gateway to be enabled

## Notes
- Includes floating WhatsApp button on all pages.
- Includes request forms and contact form with Netlify form handling.
- Includes bilingual toggle (English/Arabic, with RTL support).
