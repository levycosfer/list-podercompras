const scriptURL = 'https://script.google.com/macros/s/AKfycbylXJ_5iSIrj3BQQcJ0GBd1pqdBKe6khMczzm7L84tACkNMklkOK6hlYgsJ_abE96F8/exec';

document.getElementById('productImage').addEventListener('input', function () {
  document.getElementById('preview').innerHTML = `<img src="${this.value}" alt="Imagem do produto">`;
});

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const image = document.getElementById("productImage").value;
  const market = document.getElementById("marketName").value;
  const currentPrice = parseFloat(document.getElementById("currentPrice").value);
  const previousPrice = parseFloat(document.getElementById("previousPrice").value);
  const category = document.getElementById("category").value;

  // Calculado no navegador (não vai para a planilha)
  const variation = ((currentPrice - previousPrice) / previousPrice) * 100;
  const inflationSimulated = variation > 0 ? variation * 0.3 : variation * 0.15;

  const now = new Date();
  const brTime = now.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false
  });
  document.getElementById("dateTimeDisplay").textContent = "Registrado em: " + brTime;

  // Enviar apenas dados essenciais para a planilha
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      category,
      name,
      market,
      currentPrice,
      image,
      dateTime: brTime
    })
  })
  .then(response => response.text())
  .then(responseText => {
    alert(responseText);
    e.target.reset();
    document.getElementById('preview').innerHTML = '';

    // Exibir os dados calculados no site
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
      <p><strong>Categoria:</strong> ${category}</p>
      <p><strong>Mercado:</strong> ${market}</p>
      <p><strong>Preço Atual:</strong> R$ ${currentPrice.toFixed(2)}</p>
      <p><strong>Preço Anterior:</strong> R$ ${previousPrice.toFixed(2)}</p>
      <p><strong>Variação:</strong> ${variation.toFixed(2)}%</p>
      <p><strong>Inflação Simulada:</strong> ${inflationSimulated.toFixed(2)}%</p>
    `;
    document.getElementById("productList").appendChild(card);
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao registrar. Verifique a conexão ou permissões da planilha.');
  });
});
