# Changelog - Backend Project

## [2026-02-17]
### Fixed
- **Seed**: Corregido el script de carga de datos iniciales.

### Added
- **Validaciones**: Implementado **Zod** para validación de esquemas.
- **Middleware**: Creado `validate.middleware.ts` para interceptar y validar el `req.body`.
- **Auth Validation**: Creados los esquemas para `register`, `login` y `refresh`.
- **Rutas**: Integrada la validación en los endpoints de autenticación.