import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Proyecto = sequelize.define(
  "Proyecto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    estado: {
      type: DataTypes.ENUM("En progreso", "Finalizado", "Pendiente"),
      defaultValue: "Pendiente",
    },
    fechaInicio: {
      type: DataTypes.DATE,
      field: "fechaInicio",
    },
    fechaFin: {
      type: DataTypes.DATE,
      field: "fechaFin",
    },
  },
  {
    tableName: "Proyectos",
    timestamps: true,
  }
);