import { Proyecto } from "../models/Proyecto.js";
import axios from "axios";
import { generarResumen } from '../services/ia.service.js';
import { sequelize } from '../config/db.js';

// Análisis IA
export const analisisProyectos = async (req, res) => {
  try {
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).json({ error: "Falta la descripción del proyecto" });
    }

    const resumen = await generarResumen(descripcion);
    res.json({ resumen });
  } catch (error) {
    console.error("Error en /analisis:", error.message);
    res.status(500).json({ error: "Error generando resumen con IA" });
  }
};

// Crear proyecto
export const crearProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos
export const listarProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
export const obtenerProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
export const actualizarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) return res.status(404).json({ error: "Proyecto no encontrado" });
    await proyecto.update(req.body);
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
export const eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (!proyecto) return res.status(404).json({ error: "Proyecto no encontrado" });
    await proyecto.destroy();
    res.json({ mensaje: "Proyecto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Análisis IA
export const analisisIA = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({ attributes: ["descripcion"] });
    const texto = proyectos.map(p => p.descripcion).join(". ");
    const response = await axios.post(
      process.env.AI_API_URL,
      { prompt: `Resume estos proyectos: ${texto}` },
      { headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` } }
    );
    res.json({ resumen: response.data });
  } catch (error) {
    res.status(500).json({ error: "Error en la generación del resumen" });
  }
};

// Mostrar gráficos
export const obtenerGraficos = async (req, res) => {
  try {
    const resultados = await Proyecto.findAll({
      attributes: ['estado', [sequelize.fn('COUNT', sequelize.col('estado')), 'cantidad']],
      group: ['estado']
    });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
