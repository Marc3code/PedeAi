const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'caboose.proxy.rlwy.net',    
  user: 'root',          
  password: 'oQRkDWkiEgeimlgLpBNgDFLuTfPpCPQQ',          
  database: 'railway',
  port: 27640      
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

module.exports = db;
