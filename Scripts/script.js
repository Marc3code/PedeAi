// Obtém a query string da URL
const urlParams = new URLSearchParams(window.location.search);

// Obtém o valor do parâmetro 'mesa'
const numeroDaMesa = urlParams.get('mesa');

console.log(numeroDaMesa);  


// Definição do menu com categorias e itens
const menu = [
  {
    category: "Entradas", // Categoria de entradas
    items: [
      {
        name: "Bruschetta",
        price: 12.0, // Preço em número
        desc: "Pão italiano com tomate e manjericão",
        img: "./imgs/Sanduiche.jpg",
      },
      {
        name: "Batata Rústica",
        price: 15.0, // Preço em número
        desc: "Batatas temperadas com alho e ervas",
        img: "./imgs/Sanduiche.jpg",
      },
      {
        name: "Salada Caesar",
        price: 18.0, // Preço em número
        desc: "Alface, frango grelhado, queijo parmesão e molho Caesar",
        img: "./imgs/Sanduiche.jpg",
      },
    ],
  },
  {
    category: "Pratos Principais", // Categoria de pratos principais
    items: [
      {
        name: "Hambúrguer Artesanal",
        price: 25.0, // Preço em número
        desc: "Pão brioche, carne angus e queijo cheddar",
        img: "./imgs/Sanduiche.jpg",
      },
      {
        name: "Pizza Marguerita",
        price: 30.0, 
        desc: "Molho de tomate, mussarela e manjericão",
        img: "./imgs/Sanduiche.jpg",
      },
      {
        name: "Risoto de Cogumelos",
        price: 35.0, 
        desc: "Arroz arbóreo, cogumelos frescos e molho de vinho branco",
        img: "./imgs/Sanduiche.jpg",
      },
    ],
  },
  {
    category: "Sobremesas", 
    items: [
      {
        name: "Tiramisu",
        price: 18.0, 
        desc: "Biscoitos champagne, café e creme de mascarpone",
        img: "./imgs/Sanduiche.jpg",
      },
      {
        name: "Mousse de Chocolate",
        price: 14.0, 
        desc: "Creme suave de chocolate amargo",
        img: "./imgs/Sanduiche.jpg",
      },
    ],
  },
  {
    category: "Bebidas", // Categoria de bebidas
    items: [
      {
        name: "Suco de Laranja",
        price: 7.0,
        desc: "Suco fresco de laranja",
        img: "./imgs/Sanduiche.jpg",
      },
      {
        name: "Cerveja Artesanal",
        price: 12.0, 
        desc: "Cerveja artesanal local",
        img: "./imgs/Sanduiche.jpg",
      },
    ],
  },
];

// Função para renderizar o menu na página
function renderMenu() {
  // Busco o container onde o menu vai ser exibido
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = ""; // Limpo o conteúdo do container antes de renderizar o novo menu

  // Percorro cada categoria do menu
  menu.forEach((category) => {
    const categoryDiv = document.createElement("div"); 
    categoryDiv.classList.add("category"); 

    // Crio o título da categoria e adiciono à div
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.category;
    categoryDiv.appendChild(categoryTitle);

    // Crio o carousel (uma área para exibir os itens da categoria)
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    // Percorro os itens da categoria e crio os cards
    category.items.forEach((item) => {
      const card = document.createElement("div"); 
      card.classList.add("card");

      // Preencho o card com informações do item (imagem, nome e preço)
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <span>R$ ${item.price.toFixed(
          2
        )}</span> <!-- Garantindo 2 casas decimais -->
`;

      // Adiciono um evento de clique no card para abrir o modal
      card.addEventListener("click", () => openModal(item));

      // Adiciono o card no carousel
      carousel.appendChild(card);
    });

    // Adiciono o carousel na categoria
    categoryDiv.appendChild(carousel);
    // Adiciono a categoria no container do menu
    menuContainer.appendChild(categoryDiv);
  });
}

// Função para abrir o modal com os detalhes do item
function openModal(item) {
  // Preencho os elementos do modal com os dados do item
  document.getElementById("modal-img").src = item.img;
  document.getElementById("modal-title").textContent = item.name;
  document.getElementById("modal-desc").textContent = item.desc;
  document.getElementById("modal-price").textContent = `R$ ${item.price.toFixed(
    2
  )}`;

  // Exibo o modal
  document.getElementById("modal").style.display = "flex";
}

// Fechar o modal de descrição ao clicar no botão de fechar (no modal de detalhes)
document.querySelectorAll(".close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    // Fechar o modal ao clicar no botão de fechar
    document.getElementById("modal").style.display = "none";
    document.getElementById("cart-modal").style.display = "none"; 
  });
});

// Carrinho de compras
let cart = [];

// Função para adicionar item ao carrinho// Função para adicionar item ao carrinho
document.getElementById("add-to-cart").addEventListener("click", () => {
  // Criando um objeto com os dados do item a ser adicionado
  const item = {
    name: document.getElementById("modal-title").textContent,
    price: document.getElementById("modal-price").textContent,
    quantity: document.getElementById("modal-quantity").value,
  };

  // Adiciona o item ao carrinho
  cart.push(item);
  console.log(cart);

  // Fecha o modal após adicionar o item ao carrinho
  document.getElementById("modal").style.display = "none";
});

//variavel para armazenar observacoes
let observacao = "";

function showCart() {
  const cartModal = document.getElementById("cart-modal");
  const cartItemsList = document.getElementById("cart-items-list");

  // Limpar a lista de itens antes de adicionar novos
  cartItemsList.innerHTML = "";

  // Adicionar cada item do carrinho na lista
  if (cart.length == 0) {
    cartItemsList.innerHTML = `
            <h3>Não há itens no seu pedido</h3>
        `;
  } else {
    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      
      // Criar o conteúdo do item (nome e preço)
      const itemInfo = document.createElement("span");
      itemInfo.textContent = `${item.name} - ${item.price}`;

      // Criar o ícone de remover usando Font Awesome
      const removeIcon = document.createElement("i");
      removeIcon.classList.add("fas", "fa-trash-alt", "remove-icon");

      // Adicionar os elementos à lista do item
      listItem.appendChild(itemInfo);
      listItem.appendChild(removeIcon); // Adiciona o ícone de remoção

      // Adicionar o item à lista
      cartItemsList.appendChild(listItem);

      // Adicionar evento de clique para remover o item do carrinho
      removeIcon.addEventListener("click", () => {
        // Remover item do array do carrinho
        cart.splice(index, 1);

        // Atualizar a exibição do carrinho
        showCart();
      });
    });

    // Criar o campo de observações apenas se houver itens no carrinho
    const obs = document.createElement("input");
    obs.setAttribute("type", "text");
    obs.setAttribute("placeholder", "Observações");
    obs.classList.add("cart-item-observations"); // Adiciona uma classe para estilizar (opcional)
    obs.addEventListener("input", (event) => {
      observacao = event.target.value; // Armazena a observação no carrinho
    });

    // Adicionar o campo de observação no final da lista
    cartItemsList.appendChild(obs); 
  }

  // Exibe o modal
  cartModal.style.display = "flex";
}



// Função para enviar o pedido
document.getElementById("checkout").addEventListener("click", () => {
  console.log(cart);
  if (cart.length < 1) {
    window.alert("Adicione algum item para fazer um pedido!");
  } else {
    let totalPrice = 0;
    const mesa = 1;

    cart.forEach((item) => {
      const price = parseFloat(item.price.replace("R$", "").trim());
      totalPrice += price;
    });

    const date = new Date();

    // Log para visualizar o pedido antes de enviá-lo
    console.log("Enviando pedido com os dados:", {
      mesa: mesa,
      total: totalPrice,
      data: date.toISOString().slice(0, 19).replace("T", " "),
      obs: observacao,
    });

    // Envia o pedido para o backend
    fetch("https://pedeai-production.up.railway.app/pedidos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mesa: numeroDaMesa,
        total: totalPrice,
        data: date.toISOString().slice(0, 19).replace("T", " "),
        obs: observacao,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const pedidoId = data.pedidoId;
        console.log("Pedido criado com sucesso. Pedido ID:", pedidoId); // Log para ver o ID do pedido criado

        cart.forEach((item) => {
          // Log para visualizar os dados do produto sendo enviado
          console.log("Enviando produto para o pedido:", {
            nome_produto: item.name,
            preco_produto: parseFloat(item.price.replace("R$", "").trim()),
            quantidade: item.quantity,
          });

          fetch(`http://localhost:3000/pedidos/${pedidoId}/produtos`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              nome_produto: item.name,
              preco_produto: parseFloat(item.price.replace("R$", "").trim()),
              quantidade: item.quantity,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Produto adicionado:", data);
            })
            .catch((error) => {
              console.error("Erro ao adicionar produto:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Erro ao criar pedido:", error);
      });
  }
});

// Função para fechar o modal
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

// Função para abrir o modal de carrinho ao clicar no botão
document.getElementById("cart-button").addEventListener("click", () => {
  showCart();
});

// Função de busca para filtrar os itens do menu
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase(); // Pego o valor da busca em minúsculo

  // Percorro todas as categorias do menu
  document.querySelectorAll(".category").forEach((category) => {
    let hasVisibleItem = false;

    // Percorro todos os cards dentro de cada categoria
    category.querySelectorAll(".card").forEach((card) => {
      // Busco o nome e a descrição do item
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("span").textContent.toLowerCase(); // Agora busca também pela descrição

      // Verifico se o título ou a descrição do card contém a busca
      if (title.includes(query) || description.includes(query)) {
        card.style.display = "block"; // Exibo o card
        hasVisibleItem = true;
      } else {
        card.style.display = "none"; // Escondo o card
      }
    });

    // Se algum item da categoria estiver visível, mantenho a categoria visível
    category.style.display = hasVisibleItem ? "block" : "none";
  });
});

// Chamo a função para renderizar o menu ao carregar a página
renderMenu();
