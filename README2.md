# Tutorial: Crear un proyecto Backend (Node.js) + Frontend (React + Vite + Tailwind)

Este documento explica **paso a paso** cómo se creó este proyecto, qué hace cada comando y por qué se eligió cada herramienta. Sirve para tener claridad total y poder repetir el proceso desde cero.

---

## 1. ¿Qué vamos a construir?

- **Backend**: servidor en Node.js con Express (API REST en JavaScript).
- **Frontend**: aplicación web con React, empaquetada con Vite y estilizada con Tailwind CSS.

Ambas partes viven en carpetas separadas (`backend/` y `frontend/`) dentro del mismo repositorio (monorepo sencillo).

---

## 2. Preparar la carpeta del proyecto

### 2.1 Crear la carpeta raíz

```bash
mkdir "Card Profile React"
cd "Card Profile React"
```

**Por qué**: Todo el proyecto (backend y frontend) vive en una sola carpeta. Así es más fácil abrirlo en el editor y en Git.

---

## 3. Backend con Node.js y Express

### 3.1 Crear la estructura del backend

```bash
mkdir backend
cd backend
```

**Por qué**: Separar el código del servidor en su propia carpeta evita mezclar dependencias y scripts con el frontend.

### 3.2 Inicializar un proyecto Node.js

```bash
npm init -y
```

**Qué hace**: Crea un `package.json` con nombre, versión y scripts por defecto.  
**Por qué `-y`**: Acepta las opciones por defecto sin preguntar (nombre de paquete, versión, etc.).

### 3.3 Instalar dependencias del servidor

```bash
npm install express cors dotenv
```

| Paquete   | Para qué sirve |
|----------|-----------------|
| **express** | Framework para crear el servidor HTTP, rutas (GET, POST, etc.) y middleware. |
| **cors**    | Permite que el frontend (en otro puerto, ej. 5173) pueda llamar al backend (ej. 3001) sin que el navegador bloquee la petición. |
| **dotenv**  | Carga variables de entorno desde un archivo `.env` (puerto, claves, URLs de BD, etc.) sin hardcodear en el código. |

### 3.4 Usar módulos ES (import/export)

En `package.json` añade (o edita manualmente):

```json
"type": "module"
```

**Por qué**: Así Node.js entiende `import express from 'express'` en lugar de `require()`. Es la sintaxis moderna de JavaScript.

### 3.5 Crear la carpeta del código y el archivo principal

```bash
mkdir src
```

Luego crea `backend/src/index.js` con el servidor Express (ver el archivo en el proyecto).

**Resumen de lo que hace ese archivo**:
- Carga `dotenv` para variables de entorno.
- Crea la app con `express()`.
- Usa `cors()` y `express.json()` para aceptar peticiones de otro origen y body en JSON.
- Define una ruta de ejemplo, por ejemplo `GET /api/health`.
- Escucha en un puerto (ej. 3001).

### 3.6 Scripts en package.json (backend)

En `backend/package.json` puedes tener:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "node --watch src/index.js"
}
```

| Script   | Comando        | Uso |
|----------|----------------|-----|
| `start`  | `npm start`     | Ejecuta el servidor (típico para producción). |
| `dev`    | `npm run dev`   | Igual pero con `--watch`: reinicia el servidor al guardar cambios en los archivos. |

**Por qué `--watch`**: En desarrollo no hace falta reiniciar a mano cada vez que cambias el código.

---

## 4. Frontend con React, Vite y Tailwind

### 4.1 Volver a la raíz del proyecto y crear el frontend con Vite

Desde la carpeta raíz del proyecto (donde están `backend/` y donde quieres crear `frontend/`):

```bash
cd "C:\ruta\completa\Card Profile React"
npm create vite@latest frontend -- --template react
```

**Qué hace**:
- `npm create vite@latest`: usa el generador oficial de Vite (equivalente a `npx create-vite`).
- `frontend`: nombre de la carpeta donde se creará el proyecto.
- `-- --template react`: el primer `--` pasa opciones al script; `--template react` elige la plantilla con React (y React DOM) ya configurada.

**Por qué Vite**: Es rápido (usa esbuild en desarrollo), configura menos que Webpack y viene con recarga en caliente (HMR) lista.

### 4.2 Instalar dependencias del frontend

```bash
cd frontend
npm install
```

**Qué hace**: Lee `package.json` y `package-lock.json` e instala React, React DOM, Vite, ESLint, etc. en `node_modules/`.

### 4.3 Instalar Tailwind CSS (con el plugin de Vite)

```bash
npm install -D tailwindcss @tailwindcss/vite
```

**Qué hace**:
- `-D`: instala como **devDependencies** (solo para desarrollo y build, no en tiempo de ejecución en el navegador).
- `tailwindcss`: el núcleo de Tailwind.
- `@tailwindcss/vite`: integración oficial de Tailwind con Vite (escanea tus archivos y genera el CSS).

**Por qué el plugin de Vite**: En proyectos Vite es la forma recomendada: no hace falta un `tailwind.config.js` por defecto y la integración es más simple.

### 4.4 Configurar Vite para Tailwind y el proxy

Edita `frontend/vite.config.js`:

1. **Importar el plugin de Tailwind**:
   ```js
   import tailwindcss from '@tailwindcss/vite'
   ```

2. **Añadirlo a `plugins`**:
   ```js
   plugins: [react(), tailwindcss()],
   ```

3. **Opcional – Proxy al backend** (para evitar CORS en desarrollo):
   ```js
   server: {
     port: 5173,
     proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true,
       },
     },
   },
   ```
   Así, desde el frontend puedes hacer `fetch('/api/health')` y Vite redirige esa petición al backend en el puerto 3001.

### 4.5 Activar Tailwind en el CSS global

En `frontend/src/index.css` (o el CSS que se importa en `main.jsx`) **sustituye o añade al inicio**:

```css
@import "tailwindcss";
```

**Por qué**: Con Tailwind v4 + plugin de Vite, esta línea hace que Tailwind genere las utilidades (clases) que uses en los componentes. El resto del archivo puede ser estilos propios.

### 4.6 Usar Tailwind en los componentes

En cualquier componente React puedes usar clases de Tailwind, por ejemplo:

```jsx
<div className="min-h-screen bg-slate-100 flex items-center justify-center">
  <h1 className="text-3xl font-bold text-slate-800">Card Profile</h1>
</div>
```

No hace falta un `tailwind.config.js` básico; Tailwind v4 con el plugin de Vite detecta automáticamente los archivos a escanear.

---

## 5. Resumen de comandos en orden (desde cero)

Asumiendo que ya tienes Node.js instalado y que estás en la carpeta donde quieres el proyecto:

```bash
# 1. Carpeta raíz
mkdir "Card Profile React"
cd "Card Profile React"

# 2. Backend
mkdir backend
cd backend
npm init -y
npm install express cors dotenv
# Añadir "type": "module" en package.json
# Crear src/index.js con Express (ver archivo en el proyecto)
# Ajustar "scripts" en package.json (start, dev)
cd ..

# 3. Frontend con Vite + React
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss @tailwindcss/vite
# Configurar vite.config.js (plugin Tailwind + proxy)
# En src/index.css añadir: @import "tailwindcss"
cd ..
```

---

## 6. Cómo ejecutar el proyecto

Siempre **dos terminales**: una para el backend y otra para el frontend.

**Terminal 1 – Backend:**

```bash
cd backend
npm run dev
```

Deberías ver algo como: `Servidor listo en http://localhost:3001`.

**Terminal 2 – Frontend:**

```bash
cd frontend
npm run dev
```

Vite mostrará la URL local (normalmente http://localhost:5173). Abres esa URL en el navegador y ves la app React. Las peticiones a `/api/*` las reenvía al backend gracias al proxy.

---

## 7. Por qué esta estructura

| Decisión | Motivo |
|----------|--------|
| Backend y frontend en carpetas separadas | Dependencias y scripts distintos; se despliegan por separado (servidor vs sitio estático). |
| `"type": "module"` en backend | Usar `import`/`export` igual que en el frontend; código más moderno. |
| Express + CORS + dotenv | API REST estándar, compatible con frontends en otro origen y configuración por entorno. |
| Vite en lugar de Create React App | Más rápido, menos configuración, recomendado por la doc de React. |
| Tailwind con plugin Vite | Menos archivos de config y integración directa con el pipeline de Vite. |
| Proxy `/api` en Vite | En desarrollo, el frontend puede llamar al backend sin configurar CORS ni la URL absoluta del API. |

---

## 8. Siguientes pasos que puedes tomar

- Añadir más rutas en `backend/src/index.js` (por ejemplo `/api/users`, `/api/cards`).
- Crear componentes en `frontend/src/` y usar Tailwind para el diseño.
- Añadir un `.env` en `backend/` con `PORT=3001` y cargarlo con `dotenv`.
- Conectar una base de datos (por ejemplo MongoDB o PostgreSQL) y usarla desde las rutas del backend.

Si quieres, en el siguiente paso podemos bajar al detalle de un archivo concreto (por ejemplo `backend/src/index.js` o `vite.config.js`) y explicar línea por línea.
