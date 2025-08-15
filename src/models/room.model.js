import db from '../config/db.js';

// Traer todas las habitaciones
export const AllRooms = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM habitacion');
        return rows;
    } catch (error) {
        console.error("Error al obtener todas las habitaciones:", error);
        throw error;
    }
};

// Traer una habitación por su ID
export const obtenerRoomByID = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM habitacion WHERE ID = ?', [id]);
        return rows[0] || null; // Retorna null si no existe
    } catch (error) {
        console.error(`Error al obtener la habitación con ID ${id}:`, error);
        throw error;
    }
};

// Crear una habitación
export const crearHabitacion = async ({ nombre, descripcion, cantidadCamas, precio, tipo }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO habitacion (nombre, descripcion, cantidadCamas, precio, tipo) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, cantidadCamas, precio, tipo]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error al crear la habitación:", error);
        throw error;
    }
};

// Actualizar una habitación existente
export const actualizarHabitacion = async (id, { nombre, descripcion, cantidadCamas, precio, tipo }) => {
    try {
        const [result] = await db.query(
            'UPDATE habitacion SET nombre = ?, descripcion = ?, cantidadCamas = ?, precio = ?, tipo = ? WHERE ID = ?',
            [nombre, descripcion, cantidadCamas, precio, tipo, id]
        );
        return result.affectedRows; // filas modificadas
    } catch (error) {
        console.error(`Error al actualizar la habitación con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar una habitación
export const eliminarHabitacion = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM habitacion WHERE ID = ?', [id]);
        return result.affectedRows; // filas borradas
    } catch (error) {
        console.error(`Error al eliminar la habitación con ID ${id}:`, error);
        throw error;
    }
};
