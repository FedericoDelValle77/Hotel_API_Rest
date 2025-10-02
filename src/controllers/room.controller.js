import { 
    AllRooms, 
    obtenerRoomByID, 
    crearHabitacion, 
    actualizarHabitacion, 
    eliminarHabitacion 
} from "../models/room.model.js";

// Obtener todas las habitaciones
const getRooms = async (req, res) => {
    try {
        const rooms = await AllRooms();
        res.json({ message: "Listado de habitaciones", rooms });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener habitaciones", error: error.message });
    }
};

// Obtener habitación por ID
const getRoomsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await obtenerRoomByID(id);

        if (!room) return res.status(404).json({ message: "Habitación no encontrada" });

        res.json({ message: "Habitación encontrada", room });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la habitación", error: error.message });
    }
};

// Crear nueva habitación
const createRoom = async (req, res) => {
    try {
        const { nombre, descripcion, cantidadCamas, precio, tipo } = req.body;
        const insertId = await crearHabitacion({ nombre, descripcion, cantidadCamas, precio, tipo });

        res.status(201).json({ message: "Habitación creada con éxito", id: insertId });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la habitación", error: error.message });
    }
};

// Actualizar habitación existente
const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, cantidadCamas, precio, tipo } = req.body;

        const affectedRows = await actualizarHabitacion(id, { nombre, descripcion, cantidadCamas, precio, tipo });

        if (affectedRows === 0) return res.status(404).json({ message: "Habitación no encontrada" });

        res.json({ message: "Habitación actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la habitación", error: error.message });
    }
};

// Eliminar habitación
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await eliminarHabitacion(id);

        if (affectedRows === 0) return res.status(404).json({ message: "Habitación no encontrada" });

        res.json({ message: "Habitación eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la habitación", error: error.message });
    }
};

export {
    getRooms,
    getRoomsByID,
    createRoom,
    updateRoom,
    deleteRoom
};
