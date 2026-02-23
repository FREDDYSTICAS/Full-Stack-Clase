# Implementación v2: Navbar, ProfileCard (props y estilos)

Este documento describe **qué se hizo** en el Navbar y en la Card Profile (props, variantes y estilos) para que puedas entenderlo y explicarlo. Es la versión actual del proyecto.

---

## Índice

1. [Navbar: qué se hizo y estilos](#1-navbar-qué-se-hizo-y-estilos)
2. [ProfileCard: props](#2-profilecard-props)
3. [ProfileCard: variantes y estilos](#3-profilecard-variantes-y-estilos)
4. [Uso en la página (ProfileCardPage)](#4-uso-en-la-página-profilecardpage)

---

## 1. Navbar: qué se hizo y estilos

### 1.1 Ubicación

- **Archivo:** `frontend/src/components/layout/Navbar.jsx`

### 1.2 Qué hace el Navbar

- Muestra la **marca** (brand) del sitio y una **lista de enlaces** (Inicio, Productos, Contacto, Card Profile).
- En **escritorio** los enlaces se ven en una fila.
- En **móvil** se ocultan y aparece un **botón hamburguesa** que al pulsarlo abre/cierra el menú (enlaces en columna).

### 1.3 Props del Navbar

| Prop   | Tipo   | Uso                                      |
|--------|--------|------------------------------------------|
| `brand`| string | Texto que se muestra como nombre del sitio (ej. "DevMarket") |

**Ejemplo de uso en App.jsx:**

```jsx
<Navbar brand="DevMarket" />
```

### 1.4 Estilos aplicados (Tailwind CSS)

| Elemento        | Clases / estilos | Qué logran |
|-----------------|-------------------|------------|
| **Contenedor `<nav>`** | `flex flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4 bg-neutral-900 text-white shadow-lg` | Barra en fila, espacio entre marca y menú, fondo oscuro, texto blanco, más padding en desktop (`md:`). |
| **Marca (Link)** | `text-lg font-bold tracking-tight hover:text-neutral-200 transition-colors` | Título grande, negrita, al pasar el mouse se aclara un poco. |
| **Botón hamburguesa** | `md:hidden p-2 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500` | Solo visible en pantallas menores a `md` (`md:hidden`). Al hacer foco se ve un anillo. |
| **Lista `<ul>`** | `w-full md:w-auto flex flex-col md:flex-row gap-1 md:gap-6 list-none m-0 p-0` | En móvil: ancho completo y en columna. En desktop: en fila con más espacio entre ítems. |
| **Visibilidad del menú (móvil)** | `menuOpen ? 'flex' : 'hidden md:flex'` | Si el menú está abierto se muestra; si está cerrado se oculta en móvil pero en desktop siempre se muestra (`md:flex`). |
| **Cada enlace `<Link>`** | `block py-2 px-3 md:py-1 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors` | Enlaces en bloque, color gris claro que pasa a blanco y fondo más claro al hover. |

### 1.5 Comportamiento responsive (resumen)

- **Estado:** `useState(false)` para `menuOpen`. El botón hace `setMenuOpen(!menuOpen)`.
- **Cierre al navegar:** cada `<Link>` tiene `onClick={() => setMenuOpen(false)}` para cerrar el menú al elegir una ruta.
- **Accesibilidad:** el botón tiene `aria-expanded={menuOpen}` y `aria-label` ("Abrir menú" / "Cerrar menú").

---

## 2. ProfileCard: props

### 2.1 Ubicación

- **Componente:** `frontend/src/CardProfile/ProfileCard.jsx`

### 2.2 Tabla de props

| Prop         | Tipo     | Por defecto   | Uso |
|-------------|----------|----------------|-----|
| `name`      | string   | —              | Nombre que se muestra en la card. |
| `verified`  | boolean  | `false`        | Si es `true`, se muestra el ícono de verificado (verde o gris según variante). |
| `bio`       | string   | —              | Descripción / biografía debajo del nombre. |
| `followers` | number   | `0`            | Número que acompaña al icono de personas (ej. 312). |
| `posts`     | number   | `0`            | Número que acompaña al icono de mensajes (ej. 48). |
| `avatarUrl` | string   | —              | URL de la imagen de perfil. |
| `onFollow`  | function | —              | Función que se ejecuta al hacer clic en el botón "Follow +". |
| `className` | string   | `''`           | Clases CSS extra para el contenedor de la card. |
| `buttonText`| string   | `'Follow +'`    | Texto del botón (ej. "Follow +" o "Seguir +"). |
| `variant`   | string   | `'fullWidth'`  | Variante visual: `'traditional'`, `'overlay'` o `'fullWidth'`. |

### 2.3 Cómo se pasan las props desde la página

En `ProfileCardPage` se usa un objeto con los datos y **spread** para pasar todas las props de una vez, y se añade la variante y el callback:

```jsx
<ProfileCard
  key={key}
  variant={variant}
  {...user}
  onFollow={handleFollow}
/>
```

`user` contiene `name`, `verified`, `bio`, `followers`, `posts`, `avatarUrl`, `buttonText`. Así la card queda **dinámica**: mismos componentes, datos distintos por props.

---

## 3. ProfileCard: variantes y estilos

Hay **tres variantes** de card, controladas por la prop `variant`.

### 3.1 Común a las tres variantes

- **Contenedor:** `max-w-[300px] w-full bg-white rounded-[16px] overflow-hidden`, sombra: `boxShadow: '0 10px 30px -8px rgba(0,0,0,0.12)'`.
- **Bloque de contenido bajo la imagen:** descripción (bio) y fila de estadísticas + botón van **centrados** (`text-center`, `justify-center`).
- **Botón "Follow +":** `rounded-full`, fondo `#e5e7eb`, texto `#1a1a1a` bold, sin borde, hover más oscuro (`hover:bg-[#d1d5db]`).
- **Estadísticas:** icono de personas + número (followers), icono de mensaje/burbuja + número (posts), mismo color gris (`#374151`).

### 3.2 Variante `traditional` (card izquierda)

- **Imagen:**  
  - Envuelta en un contenedor con **padding** (`p-4 pb-0`), de modo que se ve **margen blanco** entre el borde de la card y la imagen.  
  - Contenedor de la imagen: `rounded-t-[12px]`, `aspect-[4/3]`, `object-cover object-top`.
- **Nombre + verificado:**  
  - En un bloque en **posición absoluta** en la parte **inferior de la imagen** (`absolute bottom-0 left-0 right-0`), con **texto negro** (`text-[#1a1a1a]`) y centrado.  
  - Badge verificado: círculo verde (`bg-[#4CAF50`), check blanco.
- **Debajo de la imagen:** zona blanca con descripción y fila de estadísticas + botón, todo centrado.

**Estilos clave:** padding que “enmarca” la imagen, nombre sobre la imagen en negro, resto en blanco y centrado.

### 3.3 Variante `overlay` (card central)

- **Imagen:**  
  - Ocupa **todo el ancho** de la card, sin padding lateral.  
  - `aspect-[4/3]`, `rounded-t-[16px]`, `object-cover object-top`.  
  - **Borde inferior de la imagen definido** (sin degradado).
- **Nombre + verificado:**  
  - Igual que en `traditional`: **sobre la parte baja de la imagen**, texto **negro**, centrado, badge verde.
- **Debajo:** fondo blanco con descripción y estadísticas + botón, centrados.

**Estilos clave:** imagen a ancho completo, nombre sobre la imagen (negro), sin overlay oscuro.

### 3.4 Variante `fullWidth` (card derecha)

- **Imagen:**  
  - A ancho completo, `aspect-[4/3]`, `rounded-t-[16px]`.  
  - **Degradado suave** en la parte inferior para que la imagen “se funda” con el blanco:  
    `linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.4) 65%, white 85%)`.
- **Nombre + verificado:**  
  - En la zona de **transición** (donde se mezcla imagen y blanco), texto **negro**.  
  - Badge **gris** (outline): `border-2 border-neutral-400 bg-neutral-100`, check `text-neutral-600` (no el círculo verde).
- **Debajo:** descripción y estadísticas + botón, centrados.

**Estilos clave:** degradado imagen → blanco, nombre en esa zona, checkmark gris.

### 3.5 Resumen de estilos por variante

| Aspecto            | traditional      | overlay          | fullWidth        |
|--------------------|------------------|------------------|------------------|
| Imagen             | Con margen blanco| A ancho completo | A ancho completo |
| Borde inferior img | Definido         | Definido         | Degradado al blanco |
| Nombre             | Sobre imagen, negro | Sobre imagen, negro | Sobre zona mezclada, negro |
| Badge verificado   | Verde sólido     | Verde sólido     | Gris (outline)   |
| Descripción + stats | Centrado, blanco | Centrado, blanco | Centrado, blanco |

### 3.6 Colores y clases usados en la card

- Fondo card: `bg-white`
- Nombre: `text-[#1a1a1a]`, `font-bold`, `text-base`
- Bio: `text-sm text-[#6b7280]`
- Estadísticas: `text-sm text-[#374151]`
- Botón: fondo `#e5e7eb`, texto `#1a1a1a`, hover `#d1d5db`
- Badge verde: `bg-[#4CAF50]`, check blanco
- Badge gris: `border-neutral-400`, `bg-neutral-100`, check `text-neutral-600`

---

## 4. Uso en la página (ProfileCardPage)

### 4.1 Ubicación

- **Archivo:** `frontend/src/Screens/ProfileCardPage.jsx`

### 4.2 Qué hace

- Define **datos de ejemplo** (Sophie Bennett) para las tres variantes.
- Para la tercera card usa una **bio distinta**: "A Product Designer focused on intuitive user experiences."
- Renderiza **tres `<ProfileCard>`** con `variant`: `traditional`, `overlay`, `fullWidth`, y les pasa las props con spread más `onFollow`.

### 4.3 Cómo llegar a esta página

- Ruta: **`/profile`** (definida en `App.jsx`).
- En el Navbar hay un enlace **"Card Profile"** que apunta a `/profile`.

Con esto tienes todo lo necesario para explicar al profesor: qué hace el Navbar (props, estilos, responsive), qué props usa la card, cómo se pasan, y qué estilos tiene cada variante de la card.
