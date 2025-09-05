# FINVERO TO-DO App

## 📌 Descripción
FINVERO TO-DO App es una aplicación web sencilla para la gestión de tareas (To-Do List).  
Permite crear nuevas tareas, marcarlas como completadas, eliminarlas y visualizarlas en una interfaz moderna y responsiva.  
Ideal para organizar actividades personales o de equipo de manera rápida y eficiente.

---

## 🛠️ Tecnologías usadas

### Backend
- **Python 3.12**
- **FastAPI** (framework web)
- **Motor** (driver asíncrono de MongoDB)
- **Pydantic v2** (validación de modelos)

### Base de datos
- **MongoDB** (NoSQL, persistencia de tareas)

### Frontend
- **React 18 + TypeScript**
- **Vite** (bundler rápido)
- **Ant Design 5.x** (UI components)

### Infraestructura
- **Docker**
- **Docker Compose**

---

## 📂 Estructura del proyecto

```
root/
├── back/                # Backend (FastAPI)
│   ├── main.py          # Entry point
│   ├── routes/          # Endpoints de la API
│   ├── models/          # Modelos Pydantic
│   ├── db/              # Configuración de MongoDB
│   ├── requirements.txt # Dependencias de Python
│   └── Dockerfile
│
├── front/               # Frontend (React + Vite + Ant Design)
│   ├── src/             # Componentes React + lógica
│   ├── public/          # Archivos estáticos
│   ├── package.json     # Dependencias de Node
│   └── Dockerfile
│
├── docker-compose.yml   # Orquestación de servicios
└── README.md
```

---

## 🚀 Endpoints principales (API REST)

### Base URL
```
http://localhost:8000
```

### Endpoints
- **GET /tasks** → Obtiene todas las tareas.  
- **POST /tasks** → Crea una nueva tarea.  
  ```json
  {
    "title": "Comprar leche",
    "description": "Ir al súper",
    "completed": false
  }
  ```
- **PUT /tasks/{task_id}** → Actualiza el estado de una tarea (ej: marcar como completada).  
- **DELETE /tasks/{task_id}** → Elimina una tarea por ID.  

📖 Documentación interactiva (Swagger UI):  
👉 [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ▶️ Ejecución con Docker Compose

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd <carpeta-del-repo>
```

### 2. Levantar los servicios
```bash
docker-compose up --build
```

### 3. Acceder a la aplicación
- **Frontend (UI de tareas):** [http://localhost:5173](http://localhost:5173)  
- **Backend (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)  
- **MongoDB:** disponible en `localhost:27017` (db: `todo_db`)

### 4. Detener los contenedores
```bash
docker-compose down
```

### 5. (Opcional) Detener y eliminar volúmenes (borrar datos)
```bash
docker-compose down -v
```

### 6. (Opcional) Ejecutar test unitario
```bash
PYTHONPATH=./back pytest -v
```

---

## 💡 Notas
- El volumen `mongo_data` garantiza persistencia de datos entre reinicios.  
- En desarrollo, se usa `--reload` en FastAPI para hot-reload del backend.  
---
