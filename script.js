document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let productName = document.getElementById('product-name').value;
    let productPrice = document.getElementById('product-price').value;

    // Enviar os dados para o Google Sheets
    sendDataToSheet(productName, productPrice);

    // Simulando a inserção na tabela (no seu caso, você faria isso com dados da API)
    const tableBody = document.getElementById('price-table').querySelector('tbody');
    const currentDate = new Date().toLocaleString();
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${currentDate}</td><td>${productPrice}</td><td>Supermercado Exemplo</td>`;
    tableBody.appendChild(newRow);

    // Limpa o formulário
    document.getElementById('product-form').reset();
});

// Função para enviar dados para o Google Sheets
async function sendDataToSheet(productName, productPrice) {
    try {
        const response = await fetch('URL_DO_SEU_SCRIPT_DO_GOOGLE_APPS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productName: productName,
                productPrice: productPrice,
            }),
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Erro ao enviar os dados para o Google Sheets:', error);
    }
}
