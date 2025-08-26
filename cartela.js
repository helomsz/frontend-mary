function gerarNumeros(inicio, fim, quantidade) {
    const numeros = [];
    while (numeros.length < quantidade) {
      const n = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
      if (!numeros.includes(n)) numeros.push(n);
    }
    return numeros.sort((a, b) => a - b);
  }

  function criarCartela() {
    const cartela = document.getElementById("cartela");
    if (!cartela) {
      console.error("Elemento #cartela não encontrado");
      return;
    }
    cartela.innerHTML = "";

    const letras = ["B", "I", "N", "G", "O"];
    const intervalos = [
      [1, 15],
      [16, 30],
      [31, 45],
      [46, 60],
      [61, 75]
    ];

    letras.forEach(letra => {
      const cel = document.createElement("div");
      cel.textContent = letra;
      cel.classList.add("titulo");
      cartela.appendChild(cel);
    });


    const colunas = intervalos.map((rng, idx) => {
      const qtd = idx === 2 ? 4 : 5;
      return gerarNumeros(rng[0], rng[1], qtd);
    });

    for (let linha = 0; linha < 5; linha++) {
      for (let col = 0; col < 5; col++) {
        const cel = document.createElement("div");

        if (linha === 2 && col === 2) {
          cel.textContent = "FREE";
          cel.classList.add("livre");
        } else {
          let idxNumero = linha;
          if (col === 2 && linha > 2) idxNumero = linha - 1;
          const valor = colunas[col][idxNumero];
          cel.textContent = valor !== undefined ? valor : "";
        }

        cartela.appendChild(cel);
      }
    }
  }
  document.addEventListener("DOMContentLoaded", criarCartela);
