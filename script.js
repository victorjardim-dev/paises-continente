function buscarPaisRegiao(regiao) {
  fetch("https://restcountries.com/v3/all")
    .then((r) => r.json())
    .then((rjson) => {
      const regiaoSpan = document.querySelector(".regiao");
      const containerRegiao = document.querySelector(".grid-container");
      const containerPaises = document.querySelectorAll(".paises-box");
      containerPaises.forEach((box) => {
        box.remove();
      });
      rjson.forEach((pais) => {
        if (regiao === pais.continents[0]) {
          regiaoSpan.innerText = pais.continents[0];
          containerRegiao.appendChild(mostrarPais(pais));
        }
      });
    });
}

function mostrarPais(pais) {
  const div = document.createElement("div");
  div.classList.add("paises-box");
  div.innerHTML = `
    <h3>${pais.name.common || "Indisponivel"}</h3>
    <p>Capital: <strong>${pais.capital || "Indisponivel"}</strong></p>
    <p>${pais.cca3 || "Indisponivel"}</p>
    <figure>
      <img src='${pais.flags[0] || "#"}' />
    </figure>
  `;
  return div;
}

const listaContinentes = document.querySelectorAll(".lista-continentes li");

listaContinentes.forEach((item) => {
  item.addEventListener("click", () => {
    listaContinentes.forEach((itemAtivo) => {
      itemAtivo.classList.remove("ativo");
    });
    item.classList.add("ativo");
    buscarPaisRegiao(item.innerText);
  });
});

listaContinentes[listaContinentes.length - 1].classList.add("ativo");
buscarPaisRegiao(listaContinentes[listaContinentes.length - 1].innerText);
