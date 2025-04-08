const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',    
  user: 'root',          
  password: 'Marc3code',          
  database: 'XP_Tab'     
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

module.exports = db;
