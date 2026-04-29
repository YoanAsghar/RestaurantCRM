# RestaurantCRM

Una solución integral para la gestión de restaurantes, permitiendo el control de mesas, toma de pedidos y administración de inventario en tiempo real.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** (TypeScript)
- **Vite** (Build tool)
- **Tailwind CSS** (Estilos personalizados y paleta de colores dinámica)
- **Lucide React** (Iconografía)

### Backend
- **.NET 8 Web API**
- **Entity Framework Core**
- **PostgreSQL** (Base de Datos)
- **Swagger/OpenAPI** (Documentación de API)

---

## 🛠️ Funcionalidades Principales

### 1. Gestión de Mesas
- Visualización de estado de mesas en tiempo real.
- Agregar o eliminar mesas dinámicamente.

### 2. Toma de Pedidos
- Registro de comensales y gestión de propinas.
- Selección de productos desde el inventario.
- Múltiples métodos de pago (Efectivo, Tarjeta, Transferencia).

### 3. Inventario (Productos)
- CRUD completo de productos.
- Búsqueda filtrada de artículos.

### 4. Historial de Órdenes
- Registro detallado de transacciones con paginación.

---

## 👨‍💻 Reflexiones del Desarrollador (Junior Perspective)

*Esta sección es para documentar mi crecimiento y visión del proyecto.*

### Sobre el Proyecto
Me inspire a desarrallar este proyecto para aprender react y probar mis habilidades tanto en el frontend como en el backend, es una aplicacion completa de la que estoy bastante orgulloso, la idea original surgio gracias a un conocido al cual le comente que estaba buscando nuevas ideas para mis proyectos.

Fue un reto bastante grande al principio pues cuando empece nunca habia desarrollado nada asi con react pero me ayudo a adquirir un gran entendimiento de la libreria.

### Desafíos Técnicos
--Manejar muchos estados al mismo tiempo al mismo tiempo que peticiones http hacia el backend.
--Aprender a utilizar react junto con TypeScript, despues de terminar, me doy cuenta que el desarrollo con TypeScript presenta muchas mas comodidades que usar Js puro, pues al tener tipados estrictos me resulta mas entendible el codigo, los errores son claros y la forma de estructurar los datos es mas clara.
--Aunque tengo mas experiencia con el backend, manejar estados que se basan en los datos almacenados en una base de datos me genero confusion al principio.
--Nunca habia utilizado tailwind antes de iniciar este proyecto entonces al principio el desarrollo del frontend fue un poco lento


### Aprendizajes Clave
--Manejo de multiples estados algunos dependientes de otros
--React hooks como UseEffect o useMemo que hacen la experiencia de desarrollo frontend mucho mas eficiente y logica
--Crear interfaces mas limpias esteticas  y responsive.
--Tailwind Css
--Despues de haber desarrollado primero el frontend por completo, me arrepiento totalmente de no haber empezado por el backend, me hubiera ahorrado muchisimo tiempo de debug, y personalmente me parece la mejor opcion ya que este carga con toda la logica del negocio.
--Crear mockups para el frontend en lugar de imaginarlo mientras lo programo.
---

## 🛠️ Instalación y Configuración

### Configuración del Backend
1. Navega a `backend/`.
2. Configura tu `appsettings.json`.
3. Ejecuta: `dotnet ef database update`.
4. Inicia: `dotnet run`.

### Configuración del Frontend
1. Navega a `frontend/`.
2. Ejecuta: `npm install`.
3. Inicia: `npm run dev`.

---

## 📂 Estructura del Proyecto

```text
RestaurantCRM/
├── backend/            # API en ASP.NET Core
├── frontend/           # Aplicación React
└── mockups/            # Referencias de diseño
```

---

## 🚀 Próximas Mejoras (Roadmap)
Personalmente el proyecto ya tiene todas las caracteristicas que estaba buscando en un principio pero defitnivamente se podrian agregar features nuevas y mejorar de varias formas, Si te gustaria agregar una feature eres mas que libre de crear tu propia rama y empezar a hacer cambios, Aqui hay algunos features que creo que serian utiles para el proyecto:
- [ ] Un admin dashboard donde se puedan gestionar todas las mesas, productos, y ordenes, actualmente cada uno se maneja desde su propia ventana.
- [ ] Authenticacion y authorization, decidi no agregar este feature porque desde que lo empece mi idea era que funcionara en localhost, pero para escalar el proyecto a un host se podria agregar autenticacion para tene multiples usuarios y que ademas cada uno guarde registro de sus acciones, se podrian implemetar roles tambien para que, por ejemplo solo administradores puedan acceder a el supuesto admin dashboard y hacer cambios del negocio.
- [ ] Convertir la pagina donde se muestran las mesas en un mapa de donde estan ubicadas las mesas dentro de un restaurante real.


---

## 🤝 Contribución
-Yoan Asghar, Unico developer (por ahora y quizas para siempre)

---
