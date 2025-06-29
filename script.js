document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Coletar valores do formulário
  const name = document.getElementById("productName").value;
  const image = document.getElementById("productImage").value;
  const market = document.getElementById("marketName").value;
  const currentPrice = parseFloat(document.getElementById("currentPrice").value);
  const previousPrice = parseFloat(document.getElementById("previousPrice").value);
  const category = document.getElementById("category").value;

  // Calcular variação, impostos e inflação simulada
  const variation = ((currentPrice - previousPrice) / previousPrice) * 100;
  const taxEstimate = currentPrice * 0.12; // Exemplo: 12% de imposto
  const inflationSimulated = variation > 0 ? variation * 0.3 : 0;

  // Enviar dados para a planilha via Apps Script
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      category,
      name,
      market,
      currentPrice,
      previousPrice,
      image,
      variation,
      taxEstimate,
      inflationSimulated
    })
  });

  // Exibir produto registrado na tela (exemplo visual)
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
    <p><strong>Imposto Estimado:</strong> R$ ${taxEstimate.toFixed(2)}</p>
    <p><strong>Inflação Simulada:</strong> ${inflationSimulated.toFixed(2)}%</p>
  `;
  document.getElementById("productList").appendChild(card);

  // Limpar o formulário
  e.target.reset();
});
