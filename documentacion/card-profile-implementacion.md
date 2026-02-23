# Implementación: Card Profile

Este documento describe **qué se hizo** en código para replicar la Card Profile según la especificación. Sirve para entender la estructura y poder mantenerla o ampliarla.

---

## 1. Dónde está cada cosa

| Qué | Dónde |
|-----|--------|
| Especificación (diseño, colores, requisitos) | [card-profile-especificacion.md](./card-profile-especificacion.md) |
| Componente de la card | `frontend/src/components/ProfileCard.jsx` |
| Uso de la card con datos de ejemplo | `frontend/src/App.jsx` |

---

## 2. Componente ProfileCard

### 2.1 Responsabilidad

`ProfileCard` es un componente presentacional: recibe datos por props y los muestra. No hace peticiones al backend ni guarda estado global; eso se hace en el padre (App o la página que lo use).

### 2.2 Props

| Prop | Tipo | Por defecto | Uso |
|------|------|--------------|-----|
| `name` | string | — | Nombre completo del usuario. |
| `verified` | boolean | `false` | Si es `true`, se muestra el badge verde de verificado. |
| `bio` | string | — | Descripción / bio. |
| `followers` | number | `0` | Número de seguidores. |
| `posts` | number | `0` | Número de publicaciones. |
| `avatarUrl` | string | — | URL de la imagen de perfil. |
| `onFollow` | function | — | Callback al pulsar el botón "Follow" (opcional). |

### 2.3 Estructura del JSX

1. **`<article>`**  
   Contenedor de la card: ancho máximo 360px, fondo blanco, `rounded-2xl`, sombra suave. `overflow-hidden` para que la imagen respete el `rounded-t-2xl`.

2. **Bloque de imagen**  
   - Contenedor con `aspect-[4/3]` y `rounded-t-2xl`.  
   - `<img>` con `object-cover` para rellenar sin deformar.  
   - `alt` descriptivo: "Foto de perfil de [nombre]".

3. **Bloque de contenido** (`padding: 1.25rem`)  
   - **Nombre + badge**: flex con `gap-2`. Nombre en `text-lg font-bold` y color `#1A1A1A`. Si `verified`, un `<span>` circular verde (`#4CAF50`) con icono de check en blanco y `aria-label="Verificado"`.  
   - **Bio**: `<p>` con `text-sm`, color `#6B6B6B`.  
   - **Engagement**: flex con `justify-between`.  
     - Izquierda: dos spans (icono de personas + `followers`, icono de imagen + `posts`), color `#6B6B6B`.  
     - Derecha: `<button>` "Follow" con icono "+", fondo `#F0F0F0`, texto `#1A1A1A`, `rounded-xl`. El botón llama a `onFollow` si se pasa.

### 2.4 Iconos

Todos son **SVG inline** (sin librería externa):

- Check del badge: path de Heroicons (check en círculo).
- Seguidores: icono de “grupo de personas”.
- Publicaciones: icono de “imagen/cuadro”.
- Botón Follow: línea “+” (plus).

Así no hay dependencias extra y los iconos escalan con el texto.

### 2.5 Colores usados (según spec)

- Fondo card: `bg-white`.  
- Nombre y texto del botón: `text-[#1A1A1A]`.  
- Bio y contadores: `text-[#6B6B6B]`.  
- Badge verificado: `bg-[#4CAF50]`, icono blanco.  
- Botón Follow: `bg-[#F0F0F0]`.  
- Sombra: `shadow-xl shadow-neutral-200/60` más un `boxShadow` inline para suavidad extra.

---

## 3. Uso en App.jsx

- Se define un objeto **EXAMPLE_USER** con los datos de la referencia (Sophie Bennett, 312 seguidores, 48 posts, bio, etc.) y una `avatarUrl` (en el código actual, una imagen de Unsplash como placeholder).
- Se renderiza `<ProfileCard {...EXAMPLE_USER} onFollow={handleFollow} />`.
- `handleFollow` por ahora solo hace `console.log`; más adelante se puede conectar con el backend (por ejemplo POST para seguir al usuario).

El contenedor de la página es un `div` con `min-h-screen`, `bg-neutral-100`, flex centrado y padding para que la card no toque los bordes en móvil.

---

## 4. Imagen de perfil

En desarrollo se usa una URL externa (Unsplash) como placeholder. Para producción o datos reales:

- Se puede guardar una imagen en `frontend/public/` (ej. `profile.jpg`) y usar `avatarUrl: '/profile.jpg'`.
- O que el backend devuelva la URL del avatar y pasarla como `avatarUrl` desde el padre.

---

## 5. Próximos pasos sugeridos

1. Conectar con el backend: que los datos de la card vengan de una API (ej. `GET /api/profile` o `/api/users/:id`).
2. Implementar la acción "Follow": `onFollow` que llame a `POST /api/follow` (o similar) y actualice el estado (ej. contador de seguidores o estado “siguiendo”).
3. Sustituir la imagen de placeholder por la URL que devuelva el backend o por un asset en `public/`.
4. Si hace falta más de una card (lista de perfiles), usar un array de usuarios y hacer `.map()` sobre `<ProfileCard>` con cada objeto de usuario.

Con la especificación y este documento se puede entender qué se hizo y cómo seguir desarrollando la card.
