import express from "express";
import {
  crearProyecto,
  listarProyectos,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto,
  analisisProyectos,
  obtenerGraficos,
} from "../controllers/proyecto.controller.js";
import { validarProyecto } from "../middlewares/validarProyecto.js";

const router = express.Router();

/**
 * @swagger
 * /proyectos:
 *   get:
 *     summary: Listar todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get("/", listarProyectos);

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *                 enum: [Pendiente, En progreso, Finalizado]
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 */
router.post("/", validarProyecto, crearProyecto);

/**
 * @swagger
 * /proyectos/analisis:
 *   post:
 *     summary: Generar resumen de proyectos con IA
 *     tags: [IA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Este proyecto desarrolla una plataforma web para gestionar reservas en restaurantes."
 *     responses:
 *       200:
 *         description: Resumen generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resumen:
 *                   type: string
 *                   example: "Plataforma web para reservas con integración de pagos y panel administrativo."
 */
router.post("/analisis", analisisProyectos);

/**
 * @swagger
 * /proyectos/graficos:
 *   get:
 *     summary: Obtener cantidad de proyectos por estado
 *     tags: [Gráficos]
 *     responses:
 *       200:
 *         description: Datos agregados por estado
 */
router.get("/graficos", obtenerGraficos);

/**
 * @swagger
 * /proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 */
router.get("/:id", obtenerProyecto);

/**
 * @swagger
 * /proyectos/{id}:
 *   put:
 *     summary: Actualizar un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto actualizado correctamente
 */
router.put("/:id", validarProyecto, actualizarProyecto);

/**
 * @swagger
 * /proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 */
router.delete("/:id", eliminarProyecto);

export default router;
