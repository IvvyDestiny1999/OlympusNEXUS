const { exec } = require('child_process');

// Mensagens aleatórias para commits
const mensagens = [
  'Atualização importante!',
  'Pequenos ajustes realizados.',
  'Correção de bugs.',
  'Melhorias no desempenho.',
  'Refatoração de código.',
  'Adicionando novos recursos.',
  'Removendo código desnecessário.',
  'Preparando para o próximo lançamento.',
  'Documentação atualizada.',
  'Testes adicionados.'
];

// Seleciona uma mensagem aleatória
const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

// Comandos para o upload
const comandos = [
  'git add .',
  `git commit -m "${mensagemAleatoria}"`,
  'git push'
];

// Executa os comandos
comandos.forEach((comando) => {
  exec(comando, (err, stdout, stderr) => {
    if (err) {
      console.error(`Erro ao executar comando: ${comando}`, err);
      return;
    }
    console.log(`Comando executado: ${comando}`);
    console.log(stdout);
    console.error(stderr);
  });
});
