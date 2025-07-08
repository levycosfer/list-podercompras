document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura os dados inseridos no formulário
    let productName = document.getElementById('product-name').value;
    let productBrand = document.getElementById('product-brand').value;
    let productCategory = document.getElementById('product-category').value;
    let productQuantity = document.getElementById('product-quantity').value;
    let productPrice = document.getElementById('product-price').value;
    let productLocation = document.getElementById('product-location').value;
    let productStoreName = document.getElementById('product-store-name').value;
    let productCity = document.getElementById('product-city').value;
    let productUrl = document.getElementById('product-url').value;

    // Envia os dados para o Google Sheets via Google Apps Script
    sendDataToSheet(productName, productBrand, productCategory, productQuantity, productPrice, productLocation, productStoreName, productCity, productUrl);

    // Adiciona uma nova linha na tabela de histórico de preços no site
    const tableBody = document.getElementById('price-table').querySelector('tbody');
    const currentDate = new Date().toLocaleString();
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${currentDate}</td>
        <td>${productName}</td>
        <td>${productPrice}</td>
        <td>${productStoreName}</td>
        <td>${productCity}</td>
        <td><a href="${productUrl}" target="_blank">Link</a></td>
    `;
    tableBody.appendChild(newRow);

    // Limpa o formulário após o envio dos dados
    document.getElementById('product-form').reset();
});

// Função para enviar os dados para o Google Sheets
async function sendDataToSheet(productName, productBrand, productCategory, productQuantity, productPrice, productLocation, productStoreName, productCity, productUrl) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzExI5uCtbPSs9bzMzlO9kSC_hsnii3PlqgReI35mM-IFZh2vSegZvuWD_lSNPv2A/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productName: productName,
                productBrand: productBrand,
                productCategory: productCategory,
                productQuantity: productQuantity,
                productPrice: productPrice,
                productLocation: productLocation,
                productStoreName: productStoreName,
                productCity: productCity,
                productUrl: productUrl
            }),
        });

        const result = await response.json();
        if (result.result === "success") {
            console.log('Dados enviados com sucesso!');
        } else {
            console.error('Erro ao registrar os dados:', result);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados para o Google Sheets:', error);
    }
}
