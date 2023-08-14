import express from 'express';
import 'dotenv/config.js';
import router from './routes/index.js';
import errorHandler from './utils/errorHandler.js';

// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());


// rutas
app.use(router);


// Middlewares después de las rutas
app.use(errorHandler);

export default app;
