// Cria lista de números de 1 a 75
let numeros = Array.from({ length: 75 }, (_, i) => i + 1);

// Embaralha os números (Fisher-Yates)
for (let i = numeros.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
}

let indice = 0; // controla qual número foi sorteado

// Descobre a letra do número
function proximaLetra(num) {
  if (num >= 1 && num <= 15) return "B";
  if (num >= 16 && num <= 30) return "I";
  if (num >= 31 && num <= 45) return "N";
  if (num >= 46 && num <= 60) return "G";
  if (num >= 61 && num <= 75) return "O";
}

// Ao clicar em sortear
document.getElementById("sortear").addEventListener("click", () => {
  if (indice >= numeros.length) {
    document.getElementById("painel").innerText = "Todos os números já foram sorteados!";
    return;
  }

  let num = numeros[indice++];
  let letra = proximaLetra(num);

  // Mostra no painel principal
  document.getElementById("painel").innerText = `${letra}${num}`;

  // Adiciona número na coluna certa
  let coluna = document.querySelector(`#${letra} .numeros`);
  let novoNumero = document.createElement("div");
  novoNumero.innerText = num;
  coluna.appendChild(novoNumero);
});
