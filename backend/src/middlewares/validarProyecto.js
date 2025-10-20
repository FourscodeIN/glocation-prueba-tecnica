import { body, validationResult } from "express-validator";

export const validarProyecto = [
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ max: 255 }).withMessage("El nombre no puede superar 255 caracteres"),

  body("descripcion")
    .optional()
    .isLength({ max: 1000 }).withMessage("La descripción no puede superar 1000 caracteres"),

  body("estado")
    .optional()
    .isIn(["Pendiente", "En progreso", "Finalizado"])
    .withMessage("Estado no válido"),

  body("fechaInicio")
    .optional()
    .isISO8601().withMessage("La fecha de inicio debe tener formato válido (YYYY-MM-DD)"),

  body("fechaFin")
    .optional()
    .isISO8601().withMessage("La fecha de fin debe tener formato válido (YYYY-MM-DD)"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  },
];
