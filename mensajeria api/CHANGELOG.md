# Changelog - Backend Project

## [2026-02-17]
### Fixed
- **Seed**: Corregido el script de carga de datos iniciales.

### Added
- **Validaciones**: Implementado **Zod** para validación de esquemas.
- **Middleware**: Creado `validate.middleware.ts` para interceptar y validar el `req.body`.
- **Auth Validation**: Creados los esquemas para `register`, `login` y `refresh`.
- **Rutas**: Integrada la validación en los endpoints de autenticación.

## [2026-02-18]
### Changed
- **Arquitectura**: Refactorización para separar Express (`app.ts`) del servidor HTTP y WebSockets (`server.ts`).

### Added
- **Seguridad en Sockets**: Middleware de autenticación con **JWT** para validar conexiones en tiempo real.
- **Validación Real-time**: Integración de **Zod** en el evento `sendMessage` para validar datos entrantes.
- **Persistencia**: Los mensajes recibidos vía Socket se guardan automáticamente en la base de datos con TypeORM.
- **Gestión de Salas**: Lógica de `joinChannel` para organizar usuarios en salas y evitar duplicidad de mensajes.