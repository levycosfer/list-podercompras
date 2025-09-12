document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const produto = document.getElementById("produto").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const supermercado = document.getElementById("supermercado").value;
    const data = document.getElementById("data").value;
    const imagem = document.getElementById("imagem").value; // Link da imagem

    // Verificando se o produto já foi registrado para o supermercado
    let historico = JSON.parse(localStorage.getItem("historicoPrecos")) || [];
    const produtoExistente = historico.find(item => item.produto === produto && item.supermercado === supermercado);

    if (produtoExistente) {
        // Se o produto já existir, atualiza o preço e a data
        produtoExistente.preco = preco;
        produtoExistente.data = data;
        produtoExistente.imagem = imagem; // Atualiza a imagem caso o usuário insira uma nova
        alert("Preço do produto atualizado com sucesso!");
    } else {
        // Se o produto não existir, adiciona um novo registro
        const novoPreco = {
            produto: produto,
            preco: preco,
            supermercado: supermercado,
            data: data,
            imagem: imagem
        };
        historico.push(novoPreco);
        alert("Produto registrado com sucesso!");
    }

    // Atualizando o localStorage com o novo histórico
    localStorage.setItem("historicoPrecos", JSON.stringify(historico));

    // Enviando os dados para o Google Apps Script
    enviarParaAppScript(produto, preco, supermercado, data, imagem);

    // Atualizando a tabela
    atualizarTabela();
});

// Função para enviar os dados para o Google Apps Script
function enviarParaAppScript(produto, preco, supermercado, data, imagem) {
    const url = 'https://script.google.com/macros/s/AKfycbxtHXkK_JswqjSBFsE94F2RZa0VstixTGM8V0Y4Zl33KtRgj_EjmkexfU2cPNj0EpQ/exec'; // Substitua com a URL do seu Apps Script

    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({
            produto: produto,
            preco: preco,
            supermercado: supermercado,
            data: data,
            imagem: imagem
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log("Dados enviados para o Apps Script:", data);
    })
    .catch(error => {
        console.error("Erro ao enviar dados para o Apps Script:", error);
    });
}

// Função para atualizar a tabela de preços
function atualizarTabela() {
    let historico = JSON.parse(localStorage.getItem("historicoPrecos")) || [];
    const tabela = document.getElementById("tabelaPrecos").getElementsByTagName('tbody')[0];
    tabela.innerHTML = ""; // Limpar a tabela antes de adicionar novos dados

    historico.forEach((item, index) => {
        let row = tabela.insertRow();
        row.insertCell(0).textContent = item.produto;
        row.insertCell(1).textContent = `R$ ${item.preco.toFixed(2)}`;
        row.insertCell(2).textContent = item.supermercado;
        row.insertCell(3).textContent = item.data;

        // Verificando a variação de preço
        let variacao = "Sem variação";
        if (index > 0 && item.produto === historico[index - 1].produto && item.supermercado === historico[index - 1].supermercado) {
            let precoAnterior = historico[index - 1].preco;
            let diff = item.preco - precoAnterior;
            variacao = diff > 0 ? `+R$ ${diff.toFixed(2)}` : `R$ ${diff.toFixed(2)}`;
        }
        row.insertCell(4).textContent = variacao;

        // Exibindo a imagem do produto
        let imagemCell = row.insertCell(5);
        let img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.produto;
        imagemCell.appendChild(img);
    });
}

// Inicializando a tabela com os dados já registrados no localStorage
atualizarTabela();
