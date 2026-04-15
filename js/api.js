// =============================
// 🌐 FUNÇÃO DE BUSCA NA API
// =============================
// Responsável por buscar os dados do FII na API externa

export async function buscarFII(ativo) {

    // =============================
    // 📡 REQUISIÇÃO HTTP
    // =============================
    // Faz chamada para API com o ativo selecionado

    const response = await fetch(
        `https://brapi.dev/api/quote/${ativo}`,
        {
            headers: {
                Authorization: "Bearer mbhrEvJ2a6VnGvP11LY9Kq"
            }
        }
        
    );


    // =============================
    // ❌ VALIDAÇÃO DA RESPOSTA
    // =============================
    // Verifica se a requisição falhou (ex: 404, 500)

    if (!response.ok) {
        throw new Error("Erro na requisição da API");
    }


    // =============================
    // 📦 CONVERSÃO PARA JSON
    // =============================
    // Transforma a resposta em objeto JS

    const data = await response.json();
    console.log(data)


    // =============================
    // ❌ VALIDAÇÃO DOS DADOS
    // =============================
    // Garante que o ativo existe na API

    if (!data.results || data.results.length === 0) {
        throw new Error("Ativo não encontrado");
    }


    // =============================
    // 🎯 EXTRAÇÃO DOS DADOS
    // =============================
    // Pega o primeiro resultado retornado

    const fii = data.results[0];


    // =============================
    // 📤 RETORNO PADRONIZADO
    // =============================
    // Retorna apenas os dados necessários para o sistema

    return {
        nome: fii.symbol || ativo, // código do ativo
        preco: fii.regularMarketPrice ?? 0, // preço atual
        variacao: fii.regularMarketChangePercent ?? 0, // variação %
    };
}