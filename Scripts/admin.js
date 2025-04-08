// Função para buscar os pedidos da API
const statusSelect = document.getElementById("order-filter");
let statusFiltro = statusSelect.value;

statusSelect.addEventListener("change", (event) => {
  fetchPedidos(event.target.value);
});

// Chamar a função para carregar os pedidos com o status inicial ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  // Pega o valor selecionado do status
  const status = statusSelect.value;
  fetchPedidos(status);
});

async function fetchPedidos(status) {
  try {
    const response = await fetch(
      "https://pedeai-production.up.railway.app/pedidos?status=" + encodeURIComponent(status)
    );
    const data = await response.json();
    renderPedidos(data);
    console.log("Pedidos:", data);
    console.log("Status:", status);
  } catch (error) {
    console.error("Erro ao buscar os pedidos:", error);
  }
}

// Função para renderizar os pedidos no HTML
function renderPedidos(pedidos) {
  const pedidosContainer = document.getElementById("pedidos");
  pedidosContainer.innerHTML = ""; // Limpar os pedidos existentes

  pedidos.forEach((pedido) => {
    const pedidoElement = document.createElement("div");
    pedidoElement.classList.add("pedido");

    pedidoElement.innerHTML = `
        <div id="card-header">
          <h2>Mesa ${pedido.mesa}</h2>
          <select data-pedido-id="${pedido.pedido_id}">
            <option value="Em aberto" ${
              pedido.status === "Em aberto" ? "selected" : ""
            }>Em aberto</option>
            <option value="Em preparo" ${
              pedido.status === "Em preparo" ? "selected" : ""
            }>Em preparo</option>
            <option value="Finalizado" ${
              pedido.status === "Finalizado" ? "selected" : ""
            }>Finalizado</option>
          </select>
        </div>
        <div class="card-body">
          <div class="itens">
            <h3><strong>Itens:</strong></h3>
            <ul>
              ${pedido.produtos
                .map(
                  (produto) => `
                <li>${produto.nome_produto || "Produto indefinido"} x${
                    produto.quantidade || 1
                  } - R$ ${produto.preco_produto || "0.00"}</li>
              `
                )
                .join("")}
            </ul>
          </div>
          <div class="observacoes">
            <p><strong>Observações:</strong></p>
            <p>${pedido.observacao || "Nenhuma observação"}</p>
          </div>
          <div class="total">
            <p><strong>Total:</strong> R$ ${pedido.total}</p>
          </div>
        </div>
      `;

    pedidosContainer.appendChild(pedidoElement);

    // Adicionar o evento de mudança de status
    const statusFiltro = pedidoElement.querySelector("select");
    statusFiltro.addEventListener("change", async (event) => {
      const novoStatus = event.target.value;
      const pedidoId = event.target.dataset.pedidoId;

      try {
        const response = await fetch(
          `https://pedeai-production.up.railway.app/pedidos/${pedidoId}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: novoStatus }),
          }
        );
        const data = await response.json();
        console.log("Status atualizado:", data);

        fetchPedidos(statusSelect.value);
      } catch (error) {
        console.error("Erro ao atualizar o status do pedido:", error);
      }
    });
  });
}
