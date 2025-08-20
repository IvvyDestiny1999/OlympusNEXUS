function validateLogin() {
  const email = document.querySelector('input[name="email"]').value.toLowerCase();
  const senha = document.querySelector('input[name="pass"]').value;
  
  const usuarios = {
    'separacaocd@zeusdobrasil.com.br': {
      senha: '@Zeus.2025',
      destino: 'HTML - Separação V3,25.html'
    },
    'estoquecd@zeusdobrasil.com.br': {
      senha: '@Zeus.2025',
      destino: 'HTML Estoque v1.4.html'
    },
    'supervisoriocd@zeusdobrasil.com.br': {
      senha: '@Zeus.2025',
      destino: 'HTML - Supervisor.html'
    },
    'caboscd@zeusdobrasil.com.br': {
      senha: '@Zeus.2025',
      destino: 'HTML - cabos.html'
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

function passwordRecovery() {
  const email = prompt("Digite seu email para recuperar a senha:").toLowerCase();

  const usuarios = {
    'separacaocd@zeusdobrasil.com.br': '@Zeus.2025',
    'estoquecd@zeusdobrasil.com.br': '@Zeus.2025',
    'supervisoriocd@zeusdobrasil.com.br': '@Zeus.2025',
    'caboscd@zeusdobrasil.com.br': '@Zeus.2025'
  };

  const senha = usuarios[email];

  if (senha) {
    alert(`Sua senha é: ${senha}`);
  } else {
    alert("Email não encontrado!");
  }
}
