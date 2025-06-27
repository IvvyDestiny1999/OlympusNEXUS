document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('excelInput');
  input.addEventListener('change', handleExcelUpload);
});

function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    if (!json.length) {
      mostrarMensagem("Arquivo vazio ou mal formatado.");
      return;
    }

    const farolContagem = { verde: 0, amarelo: 0, vermelho: 0 };

    json.forEach(row => {
      const status = (row["Farol"] || "").toLowerCase();
      if (status.includes("ver") && !status.includes("verme")) farolContagem.verde++;
      else if (status.includes("ama")) farolContagem.amarelo++;
      else if (status.includes("verme")) farolContagem.vermelho++;
    });

    gerarGrafico(farolContagem);
    mostrarMensagem("Gráfico gerado com sucesso.");
  };

  reader.readAsArrayBuffer(file);
}

function gerarGrafico(dados) {
  const ctx = document.getElementById('graficoFarol').getContext('2d');

  if (window.grafico) window.grafico.destroy();

  window.grafico = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Verde', 'Amarelo', 'Vermelho'],
      datasets: [{
        data: [dados.verde, dados.amarelo, dados.vermelho],
        backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c']
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: { size: 14 }
          }
        }
      }
    }
  });
}

function mostrarMensagem(texto) {
  document.getElementById('mensagem').textContent = texto;
}

function calcularMetaErros() {
  const total = parseInt(document.getElementById('total').value);
  const erros = parseInt(document.getElementById('erros').value);
  const resultado = document.getElementById('resultado');

  if (isNaN(total) || isNaN(erros) || total <= 0 || erros < 0 || erros > total) {
    resultado.innerText = "Por favor, insira valores válidos.";
    return;
  }

  const percentualErros = (erros / total) * 100;
  if (percentualErros <= 5) {
    resultado.innerText = `✅ Excelente! Taxa de erro: ${percentualErros.toFixed(2)}% (dentro da meta)`;
  } else {
    resultado.innerText = `⚠️ Alerta: ${percentualErros.toFixed(2)}% de erros. Acima da meta de 5%.`;
  }
}