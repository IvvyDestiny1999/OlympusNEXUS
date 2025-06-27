function validateLogin() {
  const email = document.querySelector('input[name="email"]').value.toLowerCase();
  const senha = document.querySelector('input[name="pass"]').value;
  
  const usuarios = {
    'separacaocd@zeusdobrasil.com.br': {
      senha: '@Zeus2025',
      destino: 'HTML - Separação V3,11.html'
    },
    'estoquecd@zeusdobrasil.com.br': {
      senha: '@Zeus2025',
      destino: 'HTML - Estoque.html'
    },
    'supervisoriocd@zeusdobrasil.com.br': {
      senha: '@Zeus2025',
      destino: 'HTML - Supervisor.html'
    }
  };
  
  const usuario = usuarios[email];
  
  if (usuario && usuario.senha === senha) {
    window.location.href = usuario.destino;
    return false;
  } else {
    alert("Email ou senha incorretos!");
    return false;
  }
}