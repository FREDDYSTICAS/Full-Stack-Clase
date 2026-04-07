# Arquitectura y Flujo de la Aplicacion

## Stack actual

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Icons

## Estructura funcional (alto nivel)

- `src/main.jsx`: monta React y renderiza App.
- `src/App.jsx`: orquesta estado global de carrito, modal y toast; define rutas.
- `src/components/layout/MainLayout.jsx`: estructura base con Navbar, contenido y Footer.
- `src/components/layout/Navbar.jsx`: navegacion principal y acceso al carrito.
- `src/components/layout/Footer.jsx`: informacion de contacto y enlaces.
- `src/screens/Home.jsx`: pantalla de bienvenida.
- `src/screens/Products.jsx`: catalogo, fetch de productos y accion de compra.
- `src/components/ui/CartModal.jsx`: carrito y checkout simplificado.
- `src/components/ui/Toast.jsx`: notificaciones flotantes.

## Flujo principal de datos

1. Usuario entra a Productos.
2. `Products` obtiene productos desde Fake Store API.
3. Usuario hace clic en Comprar.
4. `Products` invoca `onAddToCart` recibido por props.
5. `App` actualiza estado del carrito.
6. `Navbar` muestra el contador actualizado.
7. Usuario abre el carrito desde navbar.
8. `CartModal` muestra items y permite confirmar compra.
9. Al confirmar, se limpia el carrito y se muestra mensaje de exito.

## Decisiones actuales de arquitectura

- Estado centralizado en `App` para una app pequena, evitando sobreingenieria temprana.
- Componentes de layout persistentes para reutilizacion entre rutas.
- Fetch de productos dentro de la screen de catalogo para mantener foco por dominio.

## Propuesta de evolucion tecnica

Cuando el proyecto crezca, considerar:

- extraer logica de carrito a un `CartContext`
- separar servicios de API en `src/services/`
- agregar capa de utilidades para formateo y validaciones
- normalizar nombres de archivos y convenciones de componentes
