# DevNotes

Proyecto guía del **Ciclo de Masterclass — Tecnologías actuales de desarrollo** (The Bridge · Programa AprenTIC · Desarrollo Full Stack Web).

Es una app sencilla de **notas con imágenes** (React + Tailwind + Supabase) que iremos ampliando semana a semana: Supabase, Docker, GitHub Actions y AWS.

> Esta es la rama `start`: el **andamiaje** (React + Tailwind + rutas + interfaz) ya está montado y funciona con **datos de ejemplo (mock)**. Las partes marcadas con `TODO` se construyen **en directo** en cada sesión.

---

## Puesta en marcha

Necesitas [Node.js](https://nodejs.org/) 18 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:5173. La app arranca en **modo mock** (sin backend), así que verás la interfaz y podrás crear notas de ejemplo desde el primer momento. En la Sesión 1 configuraremos Supabase.

### Variables de entorno

```bash
cp .env.example .env
```

Rellena `.env` con los datos de **tu** proyecto de Supabase (Sesión 1). **Nunca** subas el archivo `.env` real al repositorio.

---

## Cómo trabajamos (importante)

Cada alumno trabaja sobre **su propia copia** del proyecto:

1. Haz **fork** de este repositorio a tu cuenta de GitHub.
2. Clona **tu fork** en tu ordenador.
3. Conecta tu fork a **tu propio** proyecto de Supabase, tu cuenta de **Vercel** y (Semana 3) tu cuenta de **AWS**, con tus propios secretos.

### Recuperar el punto de cada sesión (catch-up)

Si te pierdes en directo, puedes ponerte al día con la rama de solución de esa sesión. Añade el repo original como `upstream` una sola vez:

```bash
git remote add upstream <URL-del-repo-original>
git fetch upstream
git checkout sesion-1-solucion   # o la sesión que necesites
```

> ⚠️ **GitHub Actions viene desactivado en los forks.** En la Sesión 4 tendrás que entrar en la pestaña *Actions* de tu fork y pulsar «I understand my workflows, go ahead and enable them».

---

## Guion del ciclo

| Semana | Sesión | Tema | Qué tocamos en el código |
|--------|--------|------|--------------------------|
| 1 | 1 · Lun 13 jul | Supabase desde cero | Auth real en `context/AuthContext.jsx` |
| 1 | 2 · Mié 15 jul | Supabase a fondo | BD, RLS y Storage en `lib/notes.js` |
| 2 | 3 · Lun 20 jul | Docker | `Dockerfile` + `docker-compose.yml` |
| 2 | 4 · Mié 22 jul | GitHub Actions | Tests (Vitest) + workflow de despliegue a Vercel |
| 3 | 5 · Lun 27 jul | AWS: S3 + CloudFront | Imágenes en S3 servidas por CDN |
| 3 | 6 · Mié 29 jul | AWS: Rekognition + Lambda | Etiquetado/moderación automática de imágenes |

---

## Estructura del proyecto

```
src/
  main.jsx              Punto de entrada (router + AuthProvider)
  App.jsx               Rutas de la aplicación
  index.css             Tailwind
  lib/
    supabaseClient.js   Cliente de Supabase (Sesión 1)
    notes.js            Acceso a datos de las notas · mock -> Supabase (Sesión 2)
  context/
    AuthContext.jsx     Autenticación · mock -> Supabase Auth (Sesión 1)
  components/
    Navbar.jsx
    NoteCard.jsx
    NoteForm.jsx
    ProtectedRoute.jsx
  pages/
    LoginPage.jsx
    RegisterPage.jsx
    NotesPage.jsx
  test/
    setup.js
    notes.test.js       Test de ejemplo (base para la Sesión 4)
```

---

## Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run test` | Ejecuta los tests con Vitest |
| `npm run test:watch` | Tests en modo watch |
