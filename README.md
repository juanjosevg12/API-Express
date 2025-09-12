#  API REST - Gestión de Usuarios y Tareas

Este proyecto implementa una API desarrollada con Node.js + Express bajo la arquitectura API REST.  
La API permite la gestión de usuarios y tareas, con autenticación basada en JWT (JSON Web Tokens) y una base de datos en MySQL.  
Incluye documentación interactiva con Swagger.



#  Tecnologías utilizadas

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2) (conexión a base de datos)
- [JWT](https://jwt.io/) (autenticación)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs) (hash de contraseñas)
- [Swagger](https://swagger.io/) (documentación de la API)
- [Dotenv](https://www.npmjs.com/package/dotenv) (gestión de variables de entorno)



# 📂 Estructura del Proyecto

```plaintext
src/
│── config/             # Configuración de la conexión a MySQL
│── controllers/        # Controladores (lógica de negocio)
│   ├── auth.controller.js
│   ├── task.controller.js
│   └── user.controller.js
│── middlewares/        # Middlewares de autenticación
│   └── auth.middleware.js
│── models/             # Modelos (consultas a la base de datos)
│   ├── task.model.js
│   └── user.model.js
│── routes/             # Definición de rutas de la API
│   ├── auth.routes.js
│   ├── task.routes.js
│   └── user.routes.js
│── utils/              # Utilidades y helpers
│   └── jwt.js
│── app.js              # Configuración principal de Express
│── server.js           # Punto de entrada del servidor
│── swagger.js          # Configuración de Swagger para documentación
```

# Configuración

1. **Clonar repositorio**
   bash:
   git clone https://github.com/juanjosevg12/API-Express
   cd API-Express
2. **Instalar dependencias**
   bash:
   npm install
3. **Configurar variables de entorno**
   .env
   PORT=8080
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_NAME=instaleap
   JWT_SECRET=mi_clave_super_secreta
   JWT_EXPIRES=8h
4. **Configuracion Base de Datos**
   CREATE DATABASE instaleap;
   USE instaleap;
    
   CREATE TABLE usuario(
    	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(180) NOT NULL,
        correo_electronico VARCHAR(100) NOT NULL,
        contrasena VARCHAR(80) NOT NULL
   );
        
   CREATE TABLE tarea(
    	id_tarea INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(100) NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        fecha_vencimiento DATETIME NOT NULL,
        estado BOOLEAN 	DEFAULT FALSE,
        id_usuario INT,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) 
   );
# Ejecucion.
**Modo Desarollo**
npm run dev
**Modo Produccion**
npm start

servidor: http://localhost:8080

# Documentación con Swagger
http://localhost:8080/api-docs

# Arquitectura del Protyecto
Este proyecto está diseñado siguiendo la arquitectura de tipo API REST, lo que permite una separación clara de responsabilidades, escalabilidad y facilidad de mantenimiento. La estructura general del proyecto se organiza en varias capas:

Config (Configuración):
Contiene la configuración global del proyecto, incluyendo la conexión a la base de datos MySQL, variables de entorno y ajustes generales que son utilizados por toda la aplicación.

Modelos (Models):
Cada modelo representa una entidad de la base de datos (por ejemplo, Usuario o Tarea) y encapsula la lógica de acceso a datos. Esto incluye consultas, validaciones básicas y estructuras de los registros. Su función principal es interactuar con la base de datos, manteniendo la lógica de negocio separada de los datos.

Controladores (Controllers):
Los controladores gestionan la lógica de negocio y coordinan la comunicación entre los modelos y las rutas. Se encargan de recibir las peticiones del cliente, procesarlas (validar datos, aplicar reglas de negocio, llamar a los modelos) y devolver las respuestas apropiadas.

Rutas (Routes):
Definen los endpoints de la API y especifican qué controlador se encarga de cada solicitud. Esto permite una navegación clara y organizada dentro de la API y facilita la integración con el frontend.

Middlewares:
Son funciones intermedias que se ejecutan antes de llegar a los controladores. Por ejemplo, pueden validar tokens JWT, verificar permisos de usuario o manejar errores de manera centralizada. Esto garantiza seguridad y consistencia en toda la aplicación.

Autenticación con JWT:
El proyecto utiliza JSON Web Tokens (JWT) para la autenticación de usuarios. Esto asegura que solo los usuarios autorizados puedan acceder a ciertos recursos, sin necesidad de mantener sesiones en el servidor.


# Características principales

🔐 Autenticación con JWT

📦 CRUD de usuarios y tareas

🛡️ Hash de contraseñas con Bcrypt

📖 Documentación interactiva con Swagger

🗄️ Persistencia en MySQL

✅ Arquitectura API REST

# 👨‍💻 Autor
Desarrollado por Juan José Vergara Graciano
📧 juanjosevergaragraciano@gmail.com




   
