const sql = require('mssql');

const config = {
  user: 'admin', // Nome de usuário SQL Server
  password: 'admin', // Senha SQL Server
  server: 'localhost\\SQLEXPRESS', // Nome do servidor e instância
  database: 'master', // Nome do banco de dados
  options: {
    encrypt: false, // Use true se estiver usando Azure SQL
    trustServerCertificate: true // Adicione esta opção se estiver enfrentando problemas com certificados
  },
};

async function testConnection() {
  let pool;
  try {
    // Conectar ao banco de dados
    pool = await sql.connect(config);
    console.log('Conexão bem-sucedida!');
  } catch (err) {
    console.error('Erro na conexão:', err);
  } finally {
    // Fechar a conexão, se uma conexão foi estabelecida
    if (pool) {
      await pool.close();
    }
  }
}

testConnection();
