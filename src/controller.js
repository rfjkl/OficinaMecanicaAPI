import db from './database.js';

export default class VeiculoController {
  static async getVeiculos(req, res) {
    try {
      const [veiculos] = await db.query(
        'SELECT id, placa, modelo, proprietario FROM veiculos'
      );

      return res.status(200).json({
        success: true,
        data: veiculos,
      });
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);

      return res.status(500).json({
        success: false,
        error: 'Erro interno ao buscar veículos',
      });
    }
  }

  static async getVeiculoById(req, res) {
    const { id } = req.params;

    try {
      const [veiculos] = await db.query(
        `SELECT id, placa, modelo, proprietario
         FROM veiculos
         WHERE id = ?`,
        [id]
      );

      if (veiculos.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Veículo não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: veiculos[0],
      });
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);

      return res.status(500).json({
        success: false,
        error: 'Erro interno ao buscar veículo',
      });
    }
  }

  static async createVeiculo(req, res) {
    const { placa, modelo, proprietario } = req.body;

    if (!placa || !modelo || !proprietario) {
      return res.status(400).json({
        success: false,
        error: 'Placa, modelo e proprietário são obrigatórios',
      });
    }

    try {
      const [result] = await db.query(
        `INSERT INTO veiculos (placa, modelo, proprietario)
         VALUES (?, ?, ?)`,
        [placa, modelo, proprietario]
      );

      return res.status(201).json({
        success: true,
        message: 'Veículo criado com sucesso',
        data: {
          id: result.insertId,
          placa,
          modelo,
          proprietario,
        },
      });
    } catch (error) {
      console.error('Erro ao criar veículo:', error);

      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          error: 'Já existe um veículo com essa placa',
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erro interno ao criar veículo',
      });
    }
  }

  static async updateVeiculo(req, res) {
    const { id } = req.params;
    const { placa, modelo, proprietario } = req.body;

    if (!placa || !modelo || !proprietario) {
      return res.status(400).json({
        success: false,
        error: 'Placa, modelo e proprietário são obrigatórios',
      });
    }

    try {
      const [result] = await db.query(
        `UPDATE veiculos
         SET placa = ?, modelo = ?, proprietario = ?
         WHERE id = ?`,
        [placa, modelo, proprietario, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Veículo não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Veículo atualizado com sucesso',
        data: {
          id: Number(id),
          placa,
          modelo,
          proprietario,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);

      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          success: false,
          error: 'Já existe um veículo com essa placa',
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erro interno ao atualizar veículo',
      });
    }
  }

  static async deleteVeiculo(req, res) {
    const { id } = req.params;

    try {
      const [result] = await db.query(
        'DELETE FROM veiculos WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Veículo não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Veículo excluído com sucesso',
      });
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);

      return res.status(500).json({
        success: false,
        error: 'Erro interno ao excluir veículo',
      });
    }
  }
}