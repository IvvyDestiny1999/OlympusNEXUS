function abrirRemoteDesktopApp() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isWindows = navigator.platform.includes("Win");
  const isMac = navigator.platform.includes("Mac");
  const isWebView = /(wv|; wv)/i.test(userAgent) || window.navigator.standalone;

  if (isWebView) {
    alert("Abra este painel no navegador Chrome para usar este atalho.");
    return;
  }

  let link = "#";

  if (isAndroid || isIOS || isMac) {
    link = "rdp://";
  } else if (isWindows) {
    link = "ms-rd://";
    setTimeout(() => {
      window.location.href = "file:///C:/ERP_Access/Almoxarifado.rdp";
    }, 2000);
  } else {
    alert("Sistema não identificado. Verifique se o Microsoft Remote Desktop está instalado.");
    return;
  }

  window.location.href = link;
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
    resultado.innerText = `✅ Muito bem! Você está dentro da meta com ${percentualErros.toFixed(2)}% de erros.`;
  } else {
    resultado.innerText = `⚠️ Atenção! A taxa de erro está acima da meta: ${percentualErros.toFixed(2)}%.`;
  }
}