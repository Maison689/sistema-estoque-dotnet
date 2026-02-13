const apiProdutos = "https://localhost:7130/api/Produtos";
const apiCategorias = "https://localhost:7130/api/Categorias";

// ===== EVENT LISTENERS =====
document.getElementById("btnCriarCategoria")
    .addEventListener("click", criarCategoria);

document.getElementById("btnCriarProduto")
    .addEventListener("click", criarProduto);

document.getElementById("btnAtualizar")
    .addEventListener("click", listarProdutos);

// ===== CATEGORIAS =====

async function criarCategoria() {
    const nome = document.getElementById("novaCategoria").value;

    await fetch(apiCategorias, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
    });

    document.getElementById("novaCategoria").value = "";

    carregarCategorias();
    listarCategorias();
}

async function carregarCategorias() {
    const response = await fetch(apiCategorias);
    const categorias = await response.json();

    const select = document.getElementById("categoriaSelect");
    select.innerHTML = "";

    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.nome}</option>`;
    });
}

async function listarCategorias() {
    const response = await fetch(apiCategorias);
    const categorias = await response.json();

    const lista = document.getElementById("listaCategorias");
    lista.innerHTML = "";

    categorias.forEach(cat => {
        const li = document.createElement("li");

        const btn = document.createElement("button");
        btn.textContent = "Remover";
        btn.addEventListener("click", () => deletarCategoria(cat.id));

        li.textContent = cat.nome + " ";
        li.appendChild(btn);

        lista.appendChild(li);
    });
}

async function deletarCategoria(id) {
    await fetch(`${apiCategorias}/${id}`, { method: "DELETE" });

    carregarCategorias();
    listarCategorias();
    listarProdutos();
}

// ===== PRODUTOS =====

async function criarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const estoque = parseInt(document.getElementById("estoque").value);
    const categoriaId = parseInt(document.getElementById("categoriaSelect").value);

    await fetch(apiProdutos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome,
            preco,
            estoque,
            categoriaId
        })
    });

    listarProdutos();
}

async function listarProdutos() {
    const response = await fetch(apiProdutos);
    const produtos = await response.json();

    const tabela = document.getElementById("tabelaProdutos");
    tabela.innerHTML = "";

    produtos.forEach(produto => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.estoque}</td>
            <td>${produto.categoria ? produto.categoria.nome : "-"}</td>
            <td>
                <button onclick="deletarProduto(${produto.id})">
                    Remover
                </button>
            </td>
        `;

        tabela.appendChild(row);
    });
}

async function deletarProduto(id) {
    await fetch(`${apiProdutos}/${id}`, { method: "DELETE" });
    listarProdutos();
}

// ===== INICIALIZAÇÃO =====

carregarCategorias();
listarCategorias();
listarProdutos();
