# Roadmap Recomendado

## Fase 1 - Consolidacion del estado actual

Objetivo: estabilizar lo ya construido sin agregar complejidad innecesaria.

- Corregir calculo de total del carrito con cantidades.
- Usar actualizaciones funcionales en estado del carrito.
- Agregar estados de carga y error en `Products`.
- Unificar navegacion interna con React Router (`Link`).
- Eliminar o aislar archivos de prueba no usados.

Resultado esperado: proyecto estable y coherente para demos.

## Fase 2 - Calidad de experiencia

Objetivo: mejorar UX y calidad percibida.

- Mejorar accesibilidad del modal (rol dialog, foco, teclado).
- Agregar empty states y mensajes mas claros para usuario.
- Revisar responsividad en pantallas pequenas.
- Reemplazar recursos criticos externos por assets locales cuando corresponda.

Resultado esperado: aplicacion mas robusta y profesional.

## Fase 3 - Escalabilidad funcional

Objetivo: preparar el proyecto para crecer en features.

- Extraer contexto global de carrito (`CartContext`).
- Crear capa de servicios para API (`productService`).
- Agregar pagina de detalle de producto.
- Activar ruta de Contact real o eliminar pantalla no utilizada.

Resultado esperado: base limpia para agregar funcionalidades nuevas.

## Fase 4 - Version portfolio / entrega final

Objetivo: dejar una version presentable para portafolio o evaluacion.

- Actualizar `index.html` (titulo, idioma, favicon y metadatos).
- Actualizar `README.md` con objetivo, stack, instalacion y roadmap.
- Definir branding final y contenido real (contacto y redes).
- Ejecutar checklist de QA manual antes de publicar.

Resultado esperado: entrega clara, mantenible y lista para mostrar.
