import { authMiddleware } from '../middleware/auth.middleware.js';
import { Router } from 'express';
import { createReservation, getReservations, updateReservation, deleteReservation } from '../controllers/reservations.controller.js';
import { validateCreateReservation, validateReservationId } from '../middleware/reservations.middleware.js';

const router = Router();

// POST /reservations → Crear reserva
router.post('/reservations', authMiddleware, validateCreateReservation, createReservation);

// GET /reservations → Listar reservas del usuario
router.get('/reservations', authMiddleware, getReservations);

// PUT /reservations/:id → Modificar reserva
router.put('/reservations/:id', authMiddleware, validateReservationId, updateReservation);

// DELETE /reservations/:id → Cancelar reserva
router.delete('/reservations/:id', authMiddleware, validateReservationId, deleteReservation);

export default router;
