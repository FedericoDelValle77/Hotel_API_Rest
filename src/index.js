import express from 'express';
const app = express();

// Middlewares
app.use(express.json());

// Importar rutas
import usuariosRoutes from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js';
import buffetRoutes from './routes/buffet.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import reservationsRoutes from './routes/reservations.routes.js';
import roomRoutes from './routes/room.routes.js';

// Usar rutas con prefijos
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/buffet', buffetRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/room', roomRoutes);

// Puerto
const PORT = 8080;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
