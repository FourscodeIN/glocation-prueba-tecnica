# `glocation-prueba-tecnica/README.md`

# GLocation - Backend y FrontEnd (Prueba técnica API-Rest)

Aplicación fullstack para gestionar Proyectos (CRUD) con integración de IA para generar resúmenes de descripciones. 
Backend en Node.js + Express + Sequelize + PostgreSQL, frontend en Vue 3 (Vite) con tabla, formulario y gráfico. 
IA integrada usando OpenAI (API). Documentación de la API con Swagger. Opcional: despliegue con Docker Compose.

---

## Objetivo

- Cumplir los requisitos de la prueba técnica:
- API REST (CRUD) para la entidad Proyecto.
- PostgreSQL con ORM (Sequelize).
- Documentación con Swagger.
- Endpoint /proyectos/analisis que genera un resumen con IA (OpenAI).
- Endpoint /proyectos/graficos para datos agregados.
- Frontend responsivo con tabla, formulario, gráficos y generación de resumen por proyecto.
- (PLUS) Soporte para contenedores Docker.

## Estructura del proyecto
```markdown
/backend
  ├─ node_modules/
  ├─ src/
  │   ├─ config/
  │   │   └─ db.js
  │   ├─ controllers/
  │   │   └─ proyecto.controller.js
  │   ├─ docs/
  │   │   └─ swagger.js
  │   ├─ middelwares/
  │   │   └─ validarProyecto.js
  │   ├─ models/
  │   │   └─ Proyecto.js
  │   ├─ routes/
  │   │   └─ proyecto.routes.js
  │   ├─ services/
  │   │   └─ ia.service.js
  │   └─ app.js
  ├─ package.json
  └─ .env
  └─ Dockerfile
  └─ server.js
/frontend
  ├─ node_modules/
  ├─ src/
  │  ├─ assets/
  │      └─ main.css
  │  ├─ components/
  │      └─ GraficoProyectos.vue
  │      └─ ProyectoForm.vue
  │      └─ ProyectoTable.vue
  │  ├─ composables/
  │      └─ useGraficoProyectos.js
  │      └─ useProyectoForm.js
  │      └─ useProyecto Table.js
  │  ├─ router/
  │      └─ index.js
  │  ├─ views/
  │      └─ HomeView.vue
  │      └─ ProyectosView.vue
  │  ├─ services/
  │      └─ api.js
  │      └─ proyectosService.js
  │  └─ App.vue.js
  │  └─ main.js
  ├─ package.json
  └─ .env
  └─ Dockerfile
  └─ index.html
docker-compose.yml
README.md
```
## Requisitos previos

- Node.js >= 18
- npm >= 9
- PostgreSQL (local) o acceso a un servicio PostgreSQL
- (Opcional) Docker & Docker Compose
- Cuenta y API key de OpenAI (OPENAI_API_KEY)

## Variables de entorno (ejemplo)

Crea un archivo .env en /backend con:

```
# PostgreSQL
DB_NAME=glocation_db
DB_USER=postgres
DB_PASSWORD=post1961
DB_HOST=localhost
DB_PORT=5432

# Express
PORT=4000

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
---

## Instalación y ejecución — Backend
```
# Posiciónate en la carpeta backend
cd backend

# Instala dependencias
npm install

# Configura la base de datos PostgreSQL y crea la BD (ejemplo)

CREATE DATABASE glocation_db;
```
Con la sincronización automática en app.js, basta con iniciar el servidor.
```
# Levanta el servidor
npm run dev
```
Por defecto escucha en http://localhost:4000
## Swagger UI:
Abre http://localhost:4000/api-docs para ver y probar endpoints.

---

## Instalación y ejecución — Frontend
```
# Posiciónate en la carpeta frontend
cd frontend

# Instala dependencias
npm install
```
Configura la URL base de la API en src/services/api.js con la VITE_API_URL y en el .env coloca (por ejemplo http://localhost:4000/api).
```
# .env
VITE_API_URL=http://localhost:4000/api
```
```
# Levanta el frontend (Vite / dev server)
npm run dev
```
Normalmente disponible en http://localhost:5173 (o el puerto que muestre Vite).

---

## Ejecución con Docker Desktop
```
# Abre Docker Desktop y certificamos wls2 tanto enable como en Ubuntu

# Posiciónate en la carpeta raiz del proyecto
cd glocation-prueba-tecnica

# Ejecuta
docker compose build
docker compose up
```

---

## IA — cómo funciona
```
# El backend expone POST /api/proyectos/analisis que recibe JSON

{ "descripcion": "Texto a resumir" }
```

Internamente llama a services/ia.service.js que usa la librería oficial openai y la clave OPENAI_API_KEY.
```
Respuesta:

{ "resumen": "Texto resumido por la IA" }
```

## Endpoints principales

Base: http://localhost:4000/api

Proyectos

- GET /proyectos — Listar proyectos.
- POST /proyectos — Crear proyecto.
```
# Body

{ "nombre": "", "descripcion": "", "estado": "", "fechaInicio": "", "fechaFin": "" }
```
- GET /proyectos/:id — Obtener proyecto.
- PUT /proyectos/:id — Actualizar proyecto.
- DELETE /proyectos/:id — Eliminar proyecto.

## IA
- POST /proyectos/analisis — Generar resumen de una descripción.

```
# Body
{ "descripcion": "..." }

# Response
{ "resumen": "..." }
```

## Gráficos
- GET /proyectos/graficos — Datos agregados por estado.
```
# Response
{ "En progreso": 3, "Finalizado": 5, "Pausado": 1 }
```

## Docker implementado
`docker-compose.yml`
```
version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    env_file:
      - ./backend/.env
    environment:
      DB_HOST: db
      DB_PORT: 5432
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

  db:
    image: postgres:16
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: post1961
      POSTGRES_DB: glocation_db
    volumes:
      - dbdata:/var/lib/postgresql/data
      # - ./pgdata:/var/lib/postgresql/data

volumes:
  dbdata:
```
Ajusta Dockerfile en cada carpeta para exponer los puertos y comandos correctos.

## Decisiones técnicas y justificación

> Node.js + Express: facilidad de integración, ecosistema maduro.
> Sequelize: ORM probado para PostgreSQL; facilidad para migraciones y sincronización.
> OpenAI: servicio estable para generación de texto (mejor MX de resultados y menos problemas de cambios de SDK).
> Vue 3 (Vite): frontend ligero y reactividad simple; componentes para formulario, tabla y gráfico.
> Swagger (OpenAPI): permite documentar y probar endpoints rápidamente.
> Docker Compose (opcional): facilita reproducibilidad del entorno con Postgres + backend + frontend.

