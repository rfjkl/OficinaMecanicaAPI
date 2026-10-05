import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Home');
});

router.get('/users', (req, res) => {
  res.send('Usuários');
});

router.post('/users', (req, res) => {
  res.send('Criar usuário');
});

export default router;
