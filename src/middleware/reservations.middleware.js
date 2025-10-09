
import { check, param, validationResult } from "express-validator";

export const validateCreateReservation = [
 
  (req, res, next) => {
    next();
  },
  
  check("fechaIngreso")
    .notEmpty().withMessage("La fecha de ingreso es obligatoria")
    .isISO8601().withMessage("La fecha de ingreso debe tener formato YYYY-MM-DD"),
  
  check("fechaEgreso")
    .notEmpty().withMessage("La fecha de egreso es obligatoria")
    .isISO8601().withMessage("La fecha de egreso debe tener formato YYYY-MM-DD"),

  check("IDHabitacion")
    .notEmpty().withMessage("El ID de habitación es obligatorio")
    .isInt({ gt: 0 }).withMessage("El ID de habitación debe ser un número positivo"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware para validar actualización o cancelación
export const validateReservationId = [
  param("id")
    .notEmpty().withMessage("El ID de reserva es obligatorio")
    .isInt({ gt: 0 }).withMessage("El ID de reserva debe ser un número positivo"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
