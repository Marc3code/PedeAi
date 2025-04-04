const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',     // ou o host do seu banco de dados
  user: 'root',          // seu usuário do MySQL
  password: 'Marc3code',          // sua senha do MySQL
  database: 'XP_Tab'     // nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

module.exports = db;
