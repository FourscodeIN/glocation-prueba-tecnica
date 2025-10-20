import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";
import proyectoRoutes from "./routes/proyecto.routes.js";
import { swaggerDocs } from "./docs/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/proyectos", proyectoRoutes);

// Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 4000;

// Conexión DB
connectDB();

// sequelize.sync({ alter: true }).then(() => {
//   app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));
// });
sequelize.sync({ alter: true, logging: false })
  .then(() => console.log("Tablas sincronizadas correctamente"))
  .catch(err => console.warn("Advertencia al sincronizar tablas:", err.message));

app.listen(PORT, () => console.log(`Servidor backend corriendo en puerto ${PORT}`));

export default app;



