/**
 * Servidor Node.js - Card Profile API
 * Ejecutar: npm run dev (desarrollo) o npm start (producción)
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ruta de salud para comprobar que el servidor responde
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Card Profile API' });
});

app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
