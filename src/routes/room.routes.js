//authMiddleware compruba la integridad del token y extrae el ID del usuario logeado 
import { authMiddleware } from '../middleware/auth.middleware.js';
import {getRooms, getRoomsByID, createRoom, updateRoom, deleteRoom} from '../controllers/room.controller.js' 
import{validarHabitacion} from '../middleware/room.middleware.js'
import { Router } from 'express';
const router = Router();

//publico
//GET /rooms → Lista de tipos de habitaciones y precios.
router.get('/rooms',getRooms);
//GET /rooms/:id → Detalles de un tipo de habitación.
router.get('/rooms/:id',getRoomsByID);

//privado: 
//POST /rooms → Crear tipo de habitación.
router.post('/rooms', authMiddleware,validarHabitacion, createRoom);
//PUT /rooms/:id → Editar tipo de habitación.
router.put('/rooms/:id',authMiddleware,validarHabitacion, updateRoom);
//DELETE /rooms/:id → Eliminar tipo de habitación.
router.delete('/rooms/:id',authMiddleware,deleteRoom);
export default router;