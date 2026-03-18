# Hybridge Web

Next.js 15 + Payload CMS. Base de datos en Neon (PostgreSQL).

## Cómo correr

1. **Dependencias**
   ```bash
   npm install
   ```

2. **Variables de entorno**  
   Copia `.env.example` a `.env` y configura:
   - `DATABASE_URL` — connection string de tu proyecto en [Neon](https://console.neon.tech)
   - `PAYLOAD_SECRET` — un secreto para sesiones de Payload
   - `NEXT_PUBLIC_SERVER_URL` — en local: `http://localhost:3000`

3. **Servidor de desarrollo**
   ```bash
   npm run dev
   ```
   - Sitio: http://localhost:3000  
   - Admin: http://localhost:3000/admin  

   Si en el futuro añades bloques o colecciones nuevas y quieres que Payload actualice el esquema en la DB, quita temporalmente `push: false` en `payload.config.ts`, arranca el servidor, responde los prompts y vuelve a poner `push: false`.

4. **Primera vez** (y tras cambios de schema): crea un usuario en `/admin`, luego ejecuta el seed:
   ```bash
   npm run seed
   ```
   o abre http://localhost:3000/api/seed

---

## Issues al correr (macOS)

### «EMFILE: too many open files»

El watcher de Next abre muchos archivos y en macOS el límite por defecto es bajo. La app **sigue funcionando**, pero la terminal se llena de avisos.

**Solución** (solo en la sesión actual):
```bash
ulimit -n 10240
npm run dev
```

Para que sea permanente, añade en `~/.zshrc`:
```bash
ulimit -n 10240
```
Luego `source ~/.zshrc` o abre una nueva terminal.

### Error «uv_interface_addresses» / «Unknown system error 1»

En algunos entornos, Next falla al leer las interfaces de red. Si pasa, fuerza el host en el script de dev. En `package.json`:

```json
"dev": "next dev --hostname 127.0.0.1"
```

y abre el sitio en http://127.0.0.1:3000 (o prueba antes con `localhost`).
