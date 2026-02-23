# Card Profile React

Proyecto con **backend** (Node.js + Express) y **frontend** (React + Vite + Tailwind CSS). Incluye un **Navbar responsive** y **tres variantes de Card Profile** (tradicional, overlay y fullWidth) con props y estilos documentados.

---

## Contenido del proyecto (para explicar al profesor)

### 1. Navbar

- **Ubicación:** `frontend/src/components/layout/Navbar.jsx`
- **Qué hace:** Muestra la marca del sitio y los enlaces (Inicio, Productos, Contacto, Card Profile).
- **Props:** Recibe `brand` (texto del nombre del sitio, ej. "DevMarket").
- **Estilos:** Tailwind CSS. Fondo oscuro (`bg-neutral-900`), texto blanco, enlaces con hover. Bordes redondeados y sombra en la barra.
- **Responsive:** En pantallas pequeñas el menú se oculta y aparece un botón hamburguesa que abre/cierra la lista de enlaces. En escritorio los enlaces se ven siempre en fila.
- **Detalles técnicos:** Se usa `useState` para saber si el menú está abierto o cerrado, y `Link` de React Router para navegar. Al hacer clic en un enlace, el menú se cierra en móvil.

### 2. ProfileCard (props y variantes)

- **Ubicación:** `frontend/src/CardProfile/ProfileCard.jsx`
- **Props que recibe:**

| Prop        | Tipo     | Uso |
|------------|----------|-----|
| `name`     | string   | Nombre en la card |
| `verified` | boolean  | Muestra ícono de verificado (verde o gris según variante) |
| `bio`      | string   | Descripción / biografía |
| `followers`| number   | Número de seguidores |
| `posts`    | number   | Número de publicaciones |
| `avatarUrl`| string   | URL de la foto de perfil |
| `onFollow` | function | Función al pulsar "Follow +" |
| `buttonText` | string | Texto del botón (ej. "Follow +") |
| `variant`  | string   | `'traditional'` \| `'overlay'` \| `'fullWidth'` |

- **Variantes y estilos:**
  - **traditional:** Imagen con margen blanco alrededor (padding), nombre sobre la parte baja de la imagen en negro, badge verde. Descripción y estadísticas centradas en blanco debajo.
  - **overlay:** Imagen a ancho completo, borde inferior definido, nombre sobre la imagen en negro, badge verde. Descripción y estadísticas centradas en blanco debajo.
  - **fullWidth:** Imagen a ancho completo con degradado suave al blanco en la parte inferior; nombre en esa zona en negro y badge gris (outline). Descripción y estadísticas centradas debajo.

En las tres variantes el botón "Follow +" es tipo píldora, fondo gris claro, sin borde, y la fila de estadísticas (seguidores, publicaciones) y el botón van centrados.

### 3. Cómo se usan las props en la página

- **Página:** `frontend/src/Screens/ProfileCardPage.jsx`
- Se definen objetos con los datos (nombre, bio, followers, posts, avatarUrl, etc.) y se pasan a la card con **spread** (`{...user}`), más la prop `variant` y la función `onFollow`. Así la card es **dinámica**: los mismos componentes muestran datos distintos según las props.

### 4. Documentación detallada

- **Implementación v2 (Navbar + Card, props y estilos):**  
  [documentacion/card-profile-implementacion-v2.md](./documentacion/card-profile-implementacion-v2.md)  
  Ahí está todo explicado con tablas de props, clases de Tailwind y comportamiento responsive para que puedas repasarlo y explicarlo al profesor.

---

## Requisitos

- Node.js 18+

## Instalación

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Desarrollo

**Terminal 1 – Backend** (puerto 3001):

```bash
cd backend
npm run dev
```

**Terminal 2 – Frontend** (puerto 5173):

```bash
cd frontend
npm run dev
```

- **Frontend:** http://localhost:5173  
- **Card Profile (las 3 variantes):** http://localhost:5173/profile  
- **API:** http://localhost:3001  
- El frontend tiene proxy a `/api` → `http://localhost:3001` (puedes usar `fetch('/api/...')` desde React).

## Estructura relevante del frontend

```
frontend/src/
├── App.jsx                    # Rutas (/, /products, /contact, /profile)
├── main.jsx
├── index.css
├── components/
│   └── layout/
│       └── Navbar.jsx          # Navbar responsive (props: brand)
├── CardProfile/
│   └── ProfileCard.jsx         # Card con 3 variantes (props: name, verified, bio, followers, posts, avatarUrl, onFollow, variant, etc.)
├── Screens/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── Contact.jsx
│   └── ProfileCardPage.jsx    # Muestra las 3 cards con datos de ejemplo
└── ui/
    └── WhatsAppButton.jsx
```

## Scripts

| Ubicación | Comando | Descripción |
|-----------|---------|-------------|
| backend | `npm start` | Servidor (producción) |
| backend | `npm run dev` | Servidor con recarga |
| frontend | `npm run dev` | Dev server + HMR |
| frontend | `npm run build` | Build para producción |
| frontend | `npm run preview` | Vista previa del build |
