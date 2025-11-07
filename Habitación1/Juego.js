document.addEventListener('DOMContentLoaded', () => {
  // --- Variables ---
  const container = document.getElementById("Container");
  const totalParedes = container.children.length;
  let currentIndex = 0;

  let inventario = [];
  let pilaLamparaAgarrada = false;
  let pilaTrofeoAgarrada = false;

  let seleccionado1 = null;
  let seleccionado2 = null;

  // Símbolos pared4 y colores
  let simbolosPared4 = [];
  let coloresPared4 = {}; // guardamos el color actual de cada símbolo
  const coloresSimbolo = ["naranja", "azul", "verde", "rosa"];
  let puzzleSimbolosResuelto = false;

  // --- Scroll ---
  function scrollToIndex(index) {
    const x = index * window.innerWidth;
    container.scrollTo({ left: x, behavior: "auto" });
    mostrarPared(index);
  }

  function scrollNext() {
    currentIndex = (currentIndex + 1) % totalParedes;
    scrollToIndex(currentIndex);
  }

  function scrollPrev() {
    currentIndex = (currentIndex - 1 + totalParedes) % totalParedes;
    scrollToIndex(currentIndex);
  }

  container.addEventListener("scroll", () => {
    currentIndex = Math.round(container.scrollLeft / window.innerWidth);
  });

  window.addEventListener("resize", () => scrollToIndex(currentIndex));

  // --- Sidebar ---
  const sidebarItems = document.querySelectorAll(".sidebar .item");

  function actualizarInventario() {
    sidebarItems.forEach((item, index) => {
      const obj = inventario[index] || "";
      item.innerHTML = "";
      if (obj) {
        const img = document.createElement("img");
        img.style.width = obj === "pila" ? "25px" : "40px";
        img.style.height = "40px";
        img.style.objectFit = "contain";

        if (obj === "linterna") img.src = "../Elementos/linterna.png";
        else if (obj === "pila") img.src = "../Elementos/pila.png";
        else if (obj === "linternaConPila") img.src = "../Elementos/Linterna prendida.png";
        else if (obj === "destornillador") img.src = "../Elementos/destornillador.png";
        else if (obj === "llave") img.src = "../Elementos/llave.png";

        item.appendChild(img);
        item.setAttribute("data-nombre", obj);
      } else {
        item.removeAttribute("data-nombre");
      }
      item.classList.remove("seleccionado");
    });

    seleccionado1 = null;
    seleccionado2 = null;
  }

  // --- Lógica de selección ---
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (!inventario[index]) return;

      if (seleccionado1 === index) {
        item.classList.remove("seleccionado");
        seleccionado1 = null;
        return;
      }

      if (seleccionado1 === null) {
        seleccionado1 = index;
        item.classList.add("seleccionado");
        return;
      }

      if (seleccionado1 !== null && seleccionado1 !== index) {
        seleccionado2 = index;
        sidebarItems[seleccionado2].classList.add("seleccionado");

        const item1 = inventario[seleccionado1];
        const item2 = inventario[seleccionado2];

        if ((item1 === "linterna" && item2 === "pila") || (item1 === "pila" && item2 === "linterna")) {
          const linternaIndex = inventario.indexOf("linterna");
          const pilaIndex = inventario.indexOf("pila");
          if (linternaIndex !== -1) inventario[linternaIndex] = "linternaConPila";
          if (pilaIndex !== -1) inventario.splice(pilaIndex, 1);
        }

        sidebarItems.forEach(i => i.classList.remove("seleccionado"));
        seleccionado1 = null;
        seleccionado2 = null;
        actualizarInventario();
      }
    });
  });

  // --- Lampara y pila ---
  const lampara = document.getElementById("lampara");
  const pila = document.getElementById("pila");

  lampara.addEventListener("click", () => {
    if (!pilaLamparaAgarrada) pila.style.display = "flex";
  });

  pila.addEventListener("click", () => {
    if (!pilaLamparaAgarrada) {
      inventario.push("linterna");
      pila.style.display = "none";
      pilaLamparaAgarrada = true;
      actualizarInventario();
    }
  });

  // --- Trofeo y pila ---
  const trofeo = document.querySelector(".trofeo");
  const pilaTrofeo = document.getElementById("pilaTrofeo");

  trofeo.addEventListener("click", () => {
    if (!pilaTrofeoAgarrada) pilaTrofeo.style.display = "flex";
  });

  pilaTrofeo.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!pilaTrofeoAgarrada) {
      inventario.push("pila");
      pilaTrofeo.style.display = "none";
      pilaTrofeoAgarrada = true;
      actualizarInventario();
    }
  });

  // --- Botón pasar habitación ---
  const btnPasarHabitacion = document.getElementById('pasarHabitacion');
  if (btnPasarHabitacion) {
    btnPasarHabitacion.addEventListener('click', () => {
      window.location.href = '../Habitacióon2/Juego2.html';
    });
  }

  // --- Botones scroll ---
  const btnIzq = document.querySelector(".nav-left");
  const btnDer = document.querySelector(".nav-right");
  if (btnIzq) btnIzq.addEventListener("click", scrollPrev);
  if (btnDer) btnDer.addEventListener("click", scrollNext);
  const destornillador = document.getElementById("destornillador");

if (destornillador) {
  destornillador.addEventListener("click", () => {
    // solo agarrarlo si aún no está en inventario
    if (!inventario.includes("destornillador")) {
      inventario.push("destornillador");
      destornillador.style.display = "none"; // desaparece de la pared
      actualizarInventario();
    }
  });
}

  // --- VITRINA (pared 2) ---
  const vitrina = document.getElementById("vitrina");
  const pared2 = document.getElementById("pared2");
  let simbolosRevelados = false;
  let simbolosElementos = [];

  function mostrarSimbolosVitrina() {
    if (simbolosRevelados) return;
    simbolosRevelados = true;

    const simbolos = [
      { nombre: "piramideNaranja", archivo: "piramide naranja.png" },
      { nombre: "cruzRosa", archivo: "cruz rosa.png" },
      { nombre: "ojoVerde", archivo: "ojo verde.png" },
      { nombre: "cucarachaAzul", archivo: "cucaracha azul.png" }
    ];

    const posiciones = [
      [0.52, 0.37],
      [0.54, 0.39],
      [0.51, 0.424],
      [0.53, 0.444]
    ];

    simbolos.forEach((simbolo, i) => {
      const img = document.createElement("img");
      img.src = `../Elementos/${simbolo.archivo}`;
      img.id = simbolo.nombre;
      img.style.position = "absolute";
      img.style.top = `${posiciones[i][0] * pared2.clientHeight}px`;
      img.style.left = `${posiciones[i][1] * pared2.clientWidth}px`;
      img.style.width = "25px";
      img.style.height = "25px";
      img.style.pointerEvents = "none";
      img.style.zIndex = "1000";

      pared2.appendChild(img);
      simbolosElementos.push(img);
    });
  }

  function ocultarSimbolosVitrina() {
    simbolosElementos.forEach(el => el.remove());
    simbolosElementos = [];
  }

  if (vitrina) {
    vitrina.addEventListener("click", () => {
      if (inventario.includes("linternaConPila")) {
        mostrarSimbolosVitrina();
      }
    });
  }

  // --- Símbolos pared4 ---
  function crearSimbolosPared4() {
    const cont = document.getElementById("pared4");
    if (!cont) return;
  
    const simbolos = ["piramide", "cruz", "ojo", "cucaracha"];
    const posiciones = ["40.2%", "45.2%", "50.2%", "55.2%"];
    const tamaño = 50;
  
    if (simbolosPared4.length > 0) {
      simbolosPared4.forEach((img, i) => {
        img.style.width = `${tamaño}px`;
        img.style.left = posiciones[i];
        cont.appendChild(img);
      });
      return;
    }
  
    simbolos.forEach((nombre, i) => {
      const img = document.createElement("img");
      img.dataset.simbolo = nombre;
      img.dataset.colorIndex = coloresPared4[nombre] || 0;
      img.src = `../Elementos/${nombre} ${coloresSimbolo[img.dataset.colorIndex]}.png`;
      img.style.position = "absolute";
      img.style.top = "45%";
      img.style.left = posiciones[i];
      img.style.width = `${tamaño}px`;
      img.style.cursor = "pointer";
      img.style.zIndex = "2000";
      cont.appendChild(img);
      simbolosPared4.push(img);
      coloresPared4[nombre] = parseInt(img.dataset.colorIndex);


  
      img.addEventListener("click", () => {
        if (puzzleSimbolosResuelto) return;
  
        // Cambiar color
        let index = parseInt(img.dataset.colorIndex);
        index = (index + 1) % coloresSimbolo.length;
        img.dataset.colorIndex = index;
        const color = coloresSimbolo[index];
        img.src = `../Elementos/${nombre} ${color}.png`;
        coloresPared4[nombre] = index;
  
        // --- Verificar combinación correcta ---
        const combinacionCorrecta =
  coloresPared4["piramide"] === 0 && // naranja
  coloresPared4["cucaracha"] === 1 && // azul
  coloresPared4["ojo"] === 2 && // verde
  coloresPared4["cruz"] === 3;  // rosa

if (combinacionCorrecta) {
  puzzleSimbolosResuelto = true;

  const vidrio = document.getElementById("vidrioPc");
  if (vidrio) vidrio.remove();
}
      });
    });
  }

  function eliminarSimbolosPared4() {
    simbolosPared4.forEach(el => el.remove());
  }
  const reja = document.getElementById("reja"); // tu elemento reja

if (reja) {
  reja.addEventListener("click", () => {
    // verificamos si el destornillador está seleccionado
    const seleccionadoNombre = seleccionado1 !== null ? inventario[seleccionado1] : null;

    if (seleccionadoNombre === "destornillador") {
      // desaparece la reja
      reja.style.display = "none";

      // opcional: eliminar destornillador del inventario si se gasta al usarlo
      const indiceDestornillador = inventario.indexOf("destornillador");
      if (indiceDestornillador !== -1) {
        inventario.splice(indiceDestornillador, 1);
        actualizarInventario();
      }
    }
  });
}
const llave = document.getElementById("llave");

if (llave) {
  llave.addEventListener("click", () => {
    inventario.push("llave");
    actualizarInventario();
    llave.style.display = "none";
  });
}
if (piramideIzquierda) {
  piramideIzquierda.addEventListener("click", () => {
    const seleccionadoNombre = seleccionado1 !== null ? inventario[seleccionado1] : null;

    if (seleccionadoNombre === "llave") {
      // desaparecer la pirámide cerrada
      piramideIzquierda.style.display = "none";

      // crear la pirámide abierta
      const imgAbierta = document.createElement("img");
      imgAbierta.id = "piramideIzquierdaAbierta";
      imgAbierta.src = "../Elementos/piramide izquierda abierta.png";
      imgAbierta.style.position = "absolute";
      imgAbierta.style.left = "-7vw";
      imgAbierta.style.bottom = "8vh";
      imgAbierta.style.width = "788px";
      imgAbierta.style.height = "460px";
      imgAbierta.style.zIndex = piramideIzquierda.style.zIndex;
      piramideIzquierda.parentElement.appendChild(imgAbierta);

      // OPCIONAL: que la llave se consuma al usarla
      const i = inventario.indexOf("llave");
      if (i !== -1) {
        inventario.splice(i, 1);
        actualizarInventario();
      }
    }
  });
}

  // --- Mostrar pared ---
  function mostrarPared(index) {
    currentIndex = index;
    if (index === 3) {
      crearSimbolosPared4();
    } else {
      eliminarSimbolosPared4();
    }

    //if (index !== 1) ocultarSimbolosVitrina();
  }

  window.mostrarPared = mostrarPared;
});
