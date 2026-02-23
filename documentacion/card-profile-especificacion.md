# Especificación: Card Profile

Documentación completa para desarrollar la tarjeta de perfil (Card Profile). Incluye requerimientos, diseño visual, colores, tipografía y criterios de implementación.

---

## 1. Objetivo y alcance

### 1.1 Objetivo

Replicar una **card de perfil de usuario** con aspecto moderno y minimalista que muestre:

- Foto de perfil
- Nombre con indicador de verificación
- Descripción o bio
- Métricas (seguidores y publicaciones)
- Botón de acción (Follow)

### 1.2 Alcance

- Un único componente reutilizable que reciba los datos por props.
- Diseño fiel a la referencia visual (colores, espaciados, tipografía, sombras).
- Sin funcionalidad real de “seguir” en esta fase; solo presentación y estructura lista para conectar con backend después.

---

## 2. Estructura visual de la card

La card se divide en **tres bloques verticales**:

| Orden | Bloque | Contenido |
|-------|--------|-----------|
| 1 | **Cabecera / Imagen** | Foto de perfil a ancho completo, con las mismas esquinas redondeadas que la card en la parte superior. |
| 2 | **Información** | Nombre, badge de verificado y descripción (bio). |
| 3 | **Engagement** | Icono + número de seguidores, icono + número de publicaciones, y botón “Follow” alineado a la derecha. |

La card es **más alta que ancha** (orientación vertical/retrato). Todo el contenido interior tiene padding uniforme excepto la imagen, que va a sangre en los laterales y arriba.

---

## 3. Paleta de colores

Valores para implementar en CSS o Tailwind (variables o clases).

| Uso | Nombre semántico | Hex | Notas |
|-----|------------------|-----|--------|
| Fondo de la página | `background-page` | `#F5F5F5` o similar | Gris muy claro donde flota la card. |
| Fondo de la card | `background-card` | `#FFFFFF` | Blanco puro. |
| Nombre y texto principal | `text-primary` | `#1A1A1A` | Casi negro. |
| Bio, contadores, texto secundario | `text-secondary` | `#6B6B6B` | Gris medio. |
| Badge verificado | `accent-verified` | `#4CAF50` | Verde. |
| Fondo del botón Follow | `button-follow-bg` | `#F0F0F0` | Gris muy claro. |
| Texto del botón Follow | `button-follow-text` | `#1A1A1A` | Mismo que nombre. |
| Sombra de la card | `shadow-card` | — | Sombra suave, difuminada, ligeramente hacia abajo-derecha. |

### 3.1 Referencia Tailwind aproximada

- Fondo página: `bg-neutral-100` o `bg-gray-100`
- Card: `bg-white`
- Texto nombre: `text-neutral-900` o `text-[#1A1A1A]`
- Texto secundario: `text-neutral-500` o `text-[#6B6B6B]`
- Verde verificado: `bg-green-500` o `bg-[#4CAF50]`
- Botón: `bg-neutral-200` o `bg-[#F0F0F0]`
- Sombra: `shadow-lg` o `shadow-xl` con `shadow-neutral-200/50`

---

## 4. Tipografía

| Elemento | Peso | Tamaño (aprox.) | Color |
|----------|------|------------------|--------|
| Nombre | Bold (700) | 1.125rem – 1.25rem (18–20px) | `text-primary` |
| Bio / descripción | Regular (400) | 0.875rem – 1rem (14–16px) | `text-secondary` |
| Contadores (312, 48) | Regular (400) | 0.875rem (14px) | `text-secondary` |
| Botón “Follow” | Medium (500) | 0.875rem – 1rem | `button-follow-text` |

Familia: sans-serif moderna (ej. **Inter**, **Roboto**, **system-ui**). En Tailwind suele venir por defecto con el stack por defecto (sans).

---

## 5. Espaciados y dimensiones

### 5.1 Card

- **Ancho máximo**: ~320px–380px (o el que mejor mantenga la proporción “más alta que ancha”).
- **Border radius**: Grande y uniforme (ej. 16px–24px). Las esquinas superiores coinciden con el recorte de la imagen.
- **Sombra**: Suave, difuminada, sensación de “flotar” (elevation).

### 5.2 Padding interior

- **Contenedor de texto y engagement**: padding horizontal y vertical coherente (ej. 1rem–1.25rem, 16px–20px).
- **Separación nombre – bio**: margen o gap pequeño (ej. 0.25rem–0.5rem).
- **Separación bio – fila de engagement**: un poco mayor (ej. 0.75rem–1rem).

### 5.3 Imagen

- Ocupa todo el ancho de la card y la parte superior.
- Misma `border-radius` que la card en las esquinas superiores (arriba-izquierda y arriba-derecha).
- Altura: proporcional (ej. objeto de aspecto 4:3 o 1:1 según referencia). Se puede controlar con `aspect-ratio` o altura fija (ej. 200px–240px).

### 5.4 Botón Follow

- Border radius: redondeado pero menor que la card (ej. 8px–12px).
- Padding: suficiente para que sea cómodo de pulsar (ej. 0.5rem 1rem).
- Alineado a la **derecha** en la fila de engagement; a la izquierda van los dos contadores (icono + número).

---

## 6. Elementos e iconografía

### 6.1 Badge “Verificado”

- Forma: **círculo** con un **check** (✓) en blanco.
- Color de fondo: `accent-verified` (#4CAF50).
- Tamaño: pequeño respecto al nombre (ej. 18–22px de diámetro).
- Posición: a la derecha del nombre, alineado verticalmente al centro (baseline o centro del texto).

### 6.2 Contadores

- **Seguidores**: icono de “persona” o “grupo” + número (ej. “312”).
- **Publicaciones**: icono de “cuadro/foto” o “cámara” + número (ej. “48”).
- Mismo color que el texto secundario; icono y número alineados en línea.

### 6.3 Botón Follow

- Texto: **“Follow”**.
- Icono: **“+”** (plus) a la derecha del texto.
- Estilo: fondo gris claro, sin borde marcado (o borde muy sutil). No relleno sólido oscuro en el estado por defecto.

---

## 7. Requerimientos funcionales (datos)

El componente debe recibir como **props** (o equivalente) los siguientes datos:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `name` | string | Nombre completo (ej. "Sophie Bennett"). |
| `verified` | boolean | Si se muestra el badge verde de verificado. |
| `bio` | string | Descripción corta (ej. "Product Designer who focuses on simplicity & usability."). |
| `followers` | number | Número de seguidores (ej. 312). |
| `posts` | number | Número de publicaciones (ej. 48). |
| `avatarUrl` | string | URL de la imagen de perfil. |
| `onFollow` | function (opcional) | Callback al pulsar "Follow" (para más adelante). |

No es obligatorio implementar `onFollow` en la primera versión; el botón puede ser solo visual.

---

## 8. Criterios de implementación

1. **Un solo componente** (ej. `ProfileCard.jsx`) que encapsule toda la card.
2. **Responsive**: la card puede tener un ancho máximo y centrarse; en móvil no debe desbordar.
3. **Accesibilidad**:
   - Texto alternativo para la imagen (`alt` con nombre o “Foto de perfil de [nombre]”).
   - El botón debe ser un `<button>` o un elemento con `role="button"` y accesible por teclado.
4. **Estilos**: Tailwind CSS según esta especificación; se pueden usar valores arbitrarios (`text-[#1A1A1A]`) si no hay clase exacta.
5. **Datos de ejemplo**: incluir un objeto de ejemplo (Sophie Bennett, 312 seguidores, 48 posts, bio indicada) para ver la card igual que en la referencia.

---

## 9. Resumen de diseño (checklist)

- [ ] Card blanca, esquinas muy redondeadas, sombra suave.
- [ ] Imagen de perfil en la parte superior, mismo radio en las esquinas superiores.
- [ ] Nombre en negrita, color oscuro (#1A1A1A).
- [ ] Badge verde circular con check a la derecha del nombre (si `verified`).
- [ ] Bio en gris (#6B6B6B), tamaño menor que el nombre.
- [ ] Fila de engagement: icono + 312, icono + 48, botón “Follow +” a la derecha.
- [ ] Botón con fondo #F0F0F0, texto oscuro, bordes redondeados.
- [ ] Fondo de página gris muy claro.
- [ ] Fuente sans-serif; espaciados consistentes y padding en el contenido.

---

## 10. Referencia de contenido de ejemplo

Para igualar la referencia visual, usar estos datos en desarrollo:

```text
Nombre:     Sophie Bennett
Verificado: true
Bio:        Product Designer who focuses on simplicity & usability.
Seguidores: 312
Posts:      48
Imagen:     (usar URL de placeholder o asset local de una mujer con jersey claro, fondo neutro)
```

Con esta especificación se puede implementar la card en React + Tailwind y, más adelante, conectar los datos con el backend y el botón “Follow” con la lógica deseada.
