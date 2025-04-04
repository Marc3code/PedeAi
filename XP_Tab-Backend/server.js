const express = require("express");
const cors = require("cors");
const db = require("./database.js"); // Importando a conexão com o banco de dados

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para criar o pedido
app.post("/pedidos", (req, res) => {
  const { mesa, total, data, obs } = req.body;

  // Query para inserir um novo pedido na tabela 'pedidos'
  const query = "INSERT INTO pedidos (mesa, total, data, observacao) VALUES (?, ?, ?, ?)";
  db.query(query, [mesa, total, data, obs], (err, result) => {
    if (err) {
      console.error("Erro ao criar pedido: ", err);
      return res.status(500).json({ message: "Erro ao criar pedido" });
    }

    // Retornar o ID do pedido recém-criado
    const pedidoId = result.insertId; // O insertId contém o ID gerado automaticamente
    res.status(201).json({ message: "Pedido criado", pedidoId: pedidoId });
  });
});

// Endpoint para adicionar produtos ao pedido
app.post("/pedidos/:pedidoId/produtos", (req, res) => {
  const pedidoId = req.params.pedidoId;
  const { nome_produto, preco_produto, quantidade } = req.body;

  // Inserir o produto na tabela 'pedidos_produtos'
  const query =
    "INSERT INTO pedidos_produtos (pedido_id, nome_produto, preco_produto, quantidade) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [pedidoId, nome_produto, preco_produto, quantidade],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar produto ao pedido: ", err);
        return res
          .status(500)
          .json({ message: "Erro ao adicionar produto ao pedido" });
      }

      res.status(201).json({ message: "Produto adicionado ao pedido" });
    }
  );
});

// Endpoint para obter pedidos com filtragem por status
app.get("/pedidos", (req, res) => {
  const status = req.query.status; // Captura o status do parâmetro de consulta

  // Construção da consulta SQL com filtragem opcional
  let query = `
    SELECT pedidos.id AS pedido_id, 
           pedidos.mesa, 
           pedidos.total, 
           pedidos.data,
           pedidos.status,    
           pedidos.observacao,          
           pedidos_produtos.nome_produto, 
           pedidos_produtos.preco_produto, 
           pedidos_produtos.quantidade
    FROM pedidos
    LEFT JOIN pedidos_produtos ON pedidos.id = pedidos_produtos.pedido_id WHERE pedidos.status = ?
  `;

  // Se o status foi fornecido, adiciona a cláusula WHERE para filtrar os pedidos
  if (status) {
    query += ` `;
  }

  // Executando a query com a possibilidade de incluir um parâmetro de status
  db.query(query, [status], (err, results) => {
    if (err) {
      console.error("Erro ao consultar os dados dos pedidos: ", err);
      return res
        .status(500)
        .json({ message: "Erro ao consultar os dados dos pedidos" });
    }

    // Organizar os dados para incluir informações dos pedidos com seus produtos
    const pedidos = results.reduce((acc, item) => {
      const pedido = acc.find((p) => p.pedido_id === item.pedido_id);
      if (pedido) {
        // Adiciona o produto ao pedido existente
        pedido.produtos.push({
          nome_produto: item.nome_produto,
          preco_produto: item.preco_produto,
          quantidade: item.quantidade,
        });
      } else {
        // Cria um novo pedido se não encontrado
        acc.push({
          pedido_id: item.pedido_id,
          mesa: item.mesa,
          total: item.total,
          status: item.status,
          observacao: item.observacao,
          data: item.data,
          produtos: [
            {
              nome_produto: item.nome_produto,
              preco_produto: item.preco_produto,
              quantidade: item.quantidade,
            },
          ],
        });
      }
      return acc;
    }, []);

    // Retorna os dados dos pedidos com seus produtos
    res.json(pedidos);
  });
});

app.patch("/pedidos/:pedidoId/status", (req, res) => {
  const pedidoId = req.params.pedidoId;
  const status = req.body.status;

  // Atualizar o status do pedido
  const query = "UPDATE pedidos SET status = ? WHERE id = ?";
  db.query(query, [status, pedidoId], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar o status do pedido: ", err);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar o status do pedido" });
    }

    res.json({ message: "Status do pedido atualizado" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
