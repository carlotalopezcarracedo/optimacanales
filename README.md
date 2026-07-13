# Óptima Canales

Sitio web estático B2B para captar canales, colaboradores, negocios y comerciales que quieran incorporar servicios energéticos con soporte operativo de Óptima.

La razón social legal se mantiene como `ÓPTIMA MERCADO ENERGÉTICO SL`. El nombre comercial provisional se centraliza en `site-config.js` para poder cambiarlo sin revisar toda la web.

## Estructura

- `index.html`: landing B2B principal.
- `site-config.js`: nombre comercial, razón social, email, URL B2C, URL de sitio, endpoint del formulario y eventos de analítica.
- `site-legal.js`: relleno dinámico de datos comunes en páginas legales.
- `legal.css`: estilos compartidos para privacidad, aviso legal y cookies.
- `privacidad.html`: política de privacidad adaptada a solicitudes de valoración B2B.
- `aviso-legal.html`: aviso legal adaptado a captación de canales.
- `cookies.html`: política de cookies.
- `404.html`: página de error para GitHub Pages.
- `scripts/generate-seo.mjs`: genera `robots.txt`, `sitemap.xml` y URLs absolutas de canonical/Open Graph desde `SITE_URL`.
- `public/`: logos, favicon y assets públicos.

## Configuración editable

Edita `site-config.js` para cambiar:

- `commercialName`: nombre comercial visible, actualmente `Óptima Canales`.
- `siteUrl`: URL pública si no se define por entorno.
- `contactEmail`: email de contacto confirmado.
- `b2cSiteUrl`: enlace secundario a la web B2C.
- `applicationEndpoint`: endpoint real del formulario cuando exista backend, CRM o herramienta de formularios.
- `whatsappUrl`: preparado para futuro enlace de WhatsApp si se confirma un número.

Mientras `applicationEndpoint` esté vacío, el formulario valida los campos y prepara un email a `contactEmail` con la solicitud. No se muestra acceso automático ni se dispara un evento de Lead de Meta Pixel.

## SEO y dominio

No hay dominio final hardcodeado. Para producción define una variable de repositorio o entorno:

```bash
SITE_URL=https://canales.optimamercado.com
```

También puede usarse un dominio independiente:

```bash
SITE_URL=https://optimacanales.com
```

El workflow de GitHub Pages ejecuta:

```bash
node scripts/generate-seo.mjs
```

Ese script genera `robots.txt`, `sitemap.xml`, canonical y Open Graph con URLs absolutas. Si `SITE_URL` no existe en GitHub Actions, usa una URL de GitHub Pages calculada desde el repositorio.

## Publicar en GitHub Pages con Actions

1. En GitHub, entra en `Settings` > `Pages`.
2. En `Build and deployment`, selecciona `GitHub Actions`.
3. En `Settings` > `Secrets and variables` > `Actions` > `Variables`, crea `SITE_URL` con el dominio definitivo.
4. Si el dominio será `canales.optimamercado.com`, configura el CNAME/DNS hacia GitHub Pages y usa:

```text
SITE_URL=https://canales.optimamercado.com
```

5. Si el dominio será independiente, configura ese dominio en GitHub Pages y usa:

```text
SITE_URL=https://dominio-definitivo.com
```

6. Haz commit y push a `main`. El workflow `.github/workflows/pages.yml` publicará la web.

## Pendientes antes de producción

- Conectar `applicationEndpoint` con el backend, CRM o herramienta de formularios definitiva.
- Confirmar si habrá WhatsApp y actualizar `whatsappUrl`.
- Validar textos legales con asesoría jurídica, especialmente privacidad, bases jurídicas, plazos de conservación, consentimiento comercial y condiciones de colaboración.
- Confirmar condiciones económicas, comisiones, exclusividad o inversión antes de publicarlas. La web actual evita esos claims.
- Si se añade Google Analytics, Meta Pixel, Tag Manager, chat o CRM embebido, actualizar cookies y consentimiento.
