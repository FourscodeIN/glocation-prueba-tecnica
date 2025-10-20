import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

async function iniciarServidor() {
  try {
    await sequelize.sync({ alter: true, logging: false });
    console.log("Base de datos sincronizada correctamente");

    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      console.warn(
        "Advertencia: ENUM duplicado ignorado",
        error.errors.map(e => e.message)
      );
      app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
    } else {
      console.error("Error al iniciar el servidor:", error);
    }
  }
}
iniciarServidor();
