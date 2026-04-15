// =============================
// 📦 IMPORTAÇÕES
// =============================

import { buscarFII } from "./api.js";
import { adicionarTabela } from "./ui.js";


// =============================
// 📌 VARIÁVEIS GLOBAIS
// =============================

const tabela = document.getElementById("tabela");
const ativosAdicionados = new Set();
const LIMITE_ATIVOS = 5;


// =============================
// ⚙️ FUNÇÃO PRINCIPAL
// =============================

async function processarAtivo(ativo) {

    if (!ativo) {
        alert("Selecione um fundo!");
        return;
    }

    if (ativosAdicionados.has(ativo)) {
        alert("Esse ativo já foi adicionado!");
        return;
    }

    if (ativosAdicionados.size >= LIMITE_ATIVOS) {
        alert("Limite de 5 ativos atingido!");
        return;
    }

    try {
        const fii = await buscarFII(ativo);

        adicionarTabela(fii, () => {
            ativosAdicionados.delete(ativo);
        });

        ativosAdicionados.add(ativo);

    } catch (error) {
        alert(error.message);
    }
}


// =============================
// 🎯 EVENTO DO FORMULÁRIO
// =============================

document.querySelector(".formulario")
.addEventListener("submit", (event) => {

    event.preventDefault();

    const select = document.getElementById("fundo");
    const ativo = select.value.trim().toUpperCase();

    processarAtivo(ativo);

    // 🔁 limpa select
    select.value = "";
});


// =============================
// 🖱️ BOTÕES RÁPIDOS (GLOBAL)
// =============================

window.selecionarFII = function(ativo) {

    const select = document.getElementById("fundo");

    select.value = ativo;

    processarAtivo(ativo);

    // 🔁 limpa select
    select.value = "";
};


// =============================
// 🧹 LIMPAR TABELA
// =============================

document.getElementById("limparTabela")
.addEventListener("click", () => {

    tabela.innerHTML = "";
    ativosAdicionados.clear();
});