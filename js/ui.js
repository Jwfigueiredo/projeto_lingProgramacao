// =============================
// 🖥️ FUNÇÃO PARA ADICIONAR NA TABELA
// =============================

export function adicionarTabela(fii, onRemove) {

    const tabela = document.getElementById("tabela");

    // cria linha
    const linha = document.createElement("tr");


    // =============================
    // 🧱 COLUNAS
    // =============================

    // 🔤 Nome
    const tdNome = document.createElement("td");
    tdNome.textContent = fii.nome;

    // 💰 Preço
    const tdPreco = document.createElement("td");
    tdPreco.textContent = fii.preco;

    // 📈 Variação
    const tdVariacao = document.createElement("td");
    aplicarCorVariacao(tdVariacao, fii.variacao);


    // =============================
    // 🗑️ BOTÃO DE REMOVER
    // =============================

    const tdAcao = document.createElement("td");

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Excluir";
    btnRemover.type = "button";

    btnRemover.onclick = () => {
        linha.remove();   // remove da tabela
        if (onRemove) onRemove(); // remove do Set (app.js)
    };

    tdAcao.appendChild(btnRemover);


    // =============================
    // 🔗 MONTAGEM DA LINHA
    // =============================

    linha.appendChild(tdNome);
    linha.appendChild(tdPreco);
    linha.appendChild(tdVariacao);
    linha.appendChild(tdAcao);


    // =============================
    // 📌 INSERE NA TABELA
    // =============================

    tabela.appendChild(linha);
}



// =============================
// 🎨 COR DA VARIAÇÃO
// =============================

function aplicarCorVariacao(td, valor) {

    valor = Number(valor);

    td.textContent = valor + "%";

    td.classList.remove("positivo", "negativo", "neutro");

    if (valor > 0) {
        td.classList.add("positivo");
    } else if (valor < 0) {
        td.classList.add("negativo");
    } else {
        td.classList.add("neutro");
    }
}