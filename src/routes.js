import { Router } from 'express';

import VeiculoController from './controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Home');
});

router.get('/veiculo', VeiculoController.getVeiculos);
router.get('/veiculo/:id', VeiculoController.getVeiculoById);

router.post('/veiculo', VeiculoController.createVeiculo);

router.put('/veiculo/:id', VeiculoController.updateVeiculo);

router.delete('/veiculo/:id', VeiculoController.deleteVeiculo);

export default router;