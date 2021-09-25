const nomePratoSearch = document.querySelector("#busca-prato");
const inputName = document.querySelector("#nome-prato");
const ingredientesPratoInput = document.querySelector("#ingredientes-prato");
const precoPrato = document.querySelector("#preco");
const btButton = document.querySelector("#bt");

const pratos = [
  {
    nome: "Lasanha",
    ingredientes: ["Frango", "Muçarela", "Presunto", "Requeijão"],
    Preço: "R$ " + 35 + ".00"
  },
  {
    nome: "Pizza",
    ingredientes: ["Carne de Sol", "Fritas", "Nata"],
    Preço: "R$ " + 35 + ".00"
  }
];

const getDados = () =>
  JSON.parse(localStorage.getItem("cardapio")) ?? [
    {
      nome: "Lasanha",
      ingredientes: ["Frango", "Muçarela", "Presunto", "Requeijão"],
      Preço: "R$ " + 35 + ".00"
    },
    {
      nome: "Pizza",
      ingredientes: ["Carne de Sol", "Fritas", "Nata"],
      Preço: "R$ " + 35 + ".00"
    }
  ];
const setDados = (pratos) => {
  localStorage.setItem("cardapio", JSON.stringify(pratos));
};

function carregarPratos(valores) {
  const lista = document.querySelector("ul");
  lista.innerHTML = "";
  const pratos = getDados();
  valores.forEach((prato) => {
    const novoItemLista = document.createElement("li");
    const novoItemListaTexto = document.createElement("span");
    let preco = document.createElement("p");
    preco.textContent = prato.preco;
    novoItemListaTexto.textContent = `"${prato.nome}"
     Ingredientes: ${prato.ingredientes} - 
     Preço sugerido: ${prato.Preço}`;
    novoItemLista.appendChild(novoItemListaTexto);
    lista.appendChild(novoItemLista);
  });
  setDados(pratos);
}

btButton.addEventListener("click", (event) => {
  const nomePrato = inputName.value;
  const pratos = getDados();
  let ingredientesPrato = ingredientesPratoInput.value.split(" , ");
  ingredientesPrato = ingredientesPrato.map((ingredientesPrato) =>
    ingredientesPrato.trim()
  );
  const valor = precoPrato.value;
  if (nomePrato != null && nomePrato !== "") {
    pratos.push({
      nome: nomePrato,
      ingredientes: ingredientesPrato,
      Preço: "R$ " + valor + ".00"
    });
    inputName.value = "";
    ingredientesPratoInput.value = "";
    precoPrato.value = "";
    setDados(pratos);
  }
  carregarPratos(pratos);
});

nomePratoSearch.addEventListener("keyup", (event) => {
  const textoBusca = event.target.value;
  const pratos = getDados();
  const pratosFiltrados = pratos.filter(
    (prato) =>
      // Ou o prato corresponde ao nome digitado
      prato.nome.toUpperCase().includes(textoBusca.toUpperCase()) ||
      // Ou ele tem um ingrediente que corresponde ao texto digitado
      prato.ingredientes.filter((ingrediente) =>
        ingrediente.toUpperCase().includes(textoBusca.toUpperCase())
      ).length > 0
  );
  carregarPratos(pratosFiltrados);
  setDados(pratos);
});

carregarPratos(pratos);
