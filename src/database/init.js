import db from '../database.js';

async function initDatabase() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS veiculos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        placa VARCHAR(10) NOT NULL UNIQUE,
        modelo VARCHAR(100) NOT NULL,
        proprietario VARCHAR(150) NOT NULL
      )
    `);

    console.log('Tabela veiculos criada com sucesso.');

    await db.end();
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
    process.exit(1);
  }
}

initDatabase();