// essa função gera uma lista de números aleatórios únicos entre o início e o fim que você passar.
// ela garante que não vai repetir nenhum número e ordena eles antes de devolver.
function gerarNumeros(inicio, fim, quantidade) {
  const numeros = [];
  while (numeros.length < quantidade) {
    // pega um número aleatório dentro do intervalo
    const n = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
    // se ainda não tiver esse número na lista, adiciona
    if (!numeros.includes(n)) numeros.push(n);
  }
  // ordena do menor para o maior e retorna
  return numeros.sort((a, b) => a - b);
}

// função que monta a cartela do bingo na tela
function criarCartela() {
  const cartela = document.getElementById("cartela"); // pega o elemento onde vamos montar a cartela
  if (!cartela) {
    console.error("Elemento #cartela não encontrado"); // se não achar, avisa no console e para
    return;
  }
  cartela.innerHTML = ""; // limpa qualquer coisa que já esteja lá dentro

  const letras = ["B", "I", "N", "G", "O"]; // as letras que vão no topo da cartela

  // intervalos de números que cada coluna pode ter
  const intervalos = [
    [1, 15],   // Coluna B
    [16, 30],  // Coluna I
    [31, 45],  // Coluna N
    [46, 60],  // Coluna G
    [61, 75]   // Coluna O
  ];

  // coloca as letras B I N G O no topo da cartela
  letras.forEach(letra => {
    const cel = document.createElement("div");
    cel.textContent = letra; // define o texto da célula com a letra
    cel.classList.add("titulo"); // adiciona uma classe pra estilizar depois
    cartela.appendChild(cel); // adiciona na cartela
  });

  // aqui a gente gera os números para cada coluna
  // na coluna N (índice 2), a gente só precisa de 4 números porque o centro é "FREE"
  const colunas = intervalos.map((rng, idx) => {
    const qtd = idx === 2 ? 4 : 5; // 4 números pra N, 5 pras outras
    return gerarNumeros(rng[0], rng[1], qtd);
  });

  // agora vamos preencher a cartela, linha por linha e coluna por coluna
  for (let linha = 0; linha < 5; linha++) {
    for (let col = 0; col < 5; col++) {
      const cel = document.createElement("div");

      // na célula do meio (linha 2, coluna 2), colocamos o "FREE"
      if (linha === 2 && col === 2) {
        cel.textContent = "FREE";
        cel.classList.add("livre"); // marca como célula especial
      } else {
        // pra pegar o número certo, a gente ajusta o índice na coluna N por causa do "FREE"
        let idxNumero = linha;
        if (col === 2 && linha > 2) idxNumero = linha - 1;

        const valor = colunas[col][idxNumero]; // pega o número daquela posição
        cel.textContent = valor !== undefined ? valor : ""; // se não tiver número, deixa vazio
      }

      cartela.appendChild(cel); // coloca a célula na cartela
    }
  }
}

// quando a página terminar de carregar, chama a função que cria a cartela
document.addEventListener("DOMContentLoaded", criarCartela);
