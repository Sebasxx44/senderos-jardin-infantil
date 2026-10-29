# Senderos · Jardín Infantil

Propuesta de rediseño campestre para Senderos, en Cerritos, Pereira.

- Web: https://senderos-jardin-infantil-sebaz.vercel.app
- Portafolio: https://sebaz.online

## Desarrollo

Ejecuta `npm run dev` y abre `http://127.0.0.1:4173`.
`npm run check` valida la sintaxis de los módulos. No requiere dependencias ni compilación.

`dist/` contiene la web estática, el componente `ActionHeaderTA`, los composables por responsabilidad y los recursos visuales. `jsconfig.json` configura la revisión estricta del tipado JavaScript y los alias.

## Publicación

Vercel sirve `dist/` con la configuración de `vercel.json`. La rama principal se conecta al proyecto `senderos-jardin-infantil-sebaz`.

Las fotografías y videos proceden del sitio y del Instagram oficiales de Senderos. Sus fuentes están documentadas en `dist/assets/assets-manifest.json`; pertenecen a sus respectivos titulares. Las ilustraciones SVG son originales de esta propuesta.

El formulario prepara un mensaje en WhatsApp; el visitante revisa y envía el mensaje. No almacena datos ni confirma citas automáticamente.
