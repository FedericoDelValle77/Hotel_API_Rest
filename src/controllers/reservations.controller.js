import {
  insertReservation,
  getAllReservations,
  updateReservationByIds,
  cancelReservationByIds
} from "../models/reservation.model.js";

// Crear reserva
export const createReservation = async (req, res) => {
  try {
    const { fechaIngreso, fechaEgreso, estado, IDHabitacion } = req.body;
    const IDUsuario = req.user.IDUsuario; // Lo sacamos del token

    if (!fechaIngreso || !fechaEgreso || !estado || !IDHabitacion) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const result = await insertReservation(fechaIngreso, fechaEgreso, estado, IDUsuario, IDHabitacion);

    res.status(201).json({
      message: "Reserva creada con éxito",
      insertId: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la reserva",
      error: error.message
    });
  }
};

// Obtener reservas (solo las del usuario logueado)
export const getReservations = async (req, res) => {
  try {
    const IDUsuario = req.user.IDUsuario;
    const reservas = await getAllReservations(IDUsuario);
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener reservas",
      error: error.message
    });
  }
};

// Actualizar reserva
export const updateReservation = async (req, res) => {
  try {
    const { fechaIngreso, fechaEgreso, estado } = req.body;
    const { IDHabitacion } = req.params;
    const IDUsuario = req.user.IDUsuario;

    const result = await updateReservationByIds(fechaIngreso, fechaEgreso, estado, IDUsuario, IDHabitacion);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json({ message: "Reserva actualizada con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la reserva",
      error: error.message
    });
  }
};

// Cancelar reserva
export const deleteReservation = async (req, res) => {
  try {
    const { IDHabitacion } = req.params;
    const IDUsuario = req.user.IDUsuario;

    const result = await cancelReservationByIds(IDUsuario, IDHabitacion);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.status(200).json({ message: "Reserva cancelada con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al cancelar la reserva",
      error: error.message
    });
  }
};
