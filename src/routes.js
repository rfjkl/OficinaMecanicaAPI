import { Router } from 'express';
import db from './database.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Home');
});

router.get('/veiculo', async (req, res) => {
  const [users] = await db.query('SELECT * FROM veiculos');

  res.json(users);
});

export default router;