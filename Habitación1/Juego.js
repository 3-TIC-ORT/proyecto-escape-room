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

  // --- Scroll ---
  function scrollToIndex(index) {
    const x = index * window.innerWidth;
    container.scrollTo({ left: x, behavior: "auto" });
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
    const sidebarItems = document.querySelectorAll(".sidebar .item");
    sidebarItems.forEach((item, index) => {
      const obj = inventario[index] || "";
      item.innerHTML = ""; // limpiamos contenido
  
      if (obj) {
        const img = document.createElement("img");
        img.style.width = obj === "pila" ? "25px" : "40px"; // pila más delgada
        img.style.height = "40px";
        img.style.objectFit = "contain";
  
        if (obj === "linterna") img.src = "../Elementos/linterna.png";
        else if (obj === "pila") img.src = "../Elementos/pila.png"; 
        else if (obj === "linternaConPila") img.src = "../Elementos/Linterna prendida.png";
        else if (obj === "destornillador") img.src = "../Elementos/destornillador.png";
  
        item.appendChild(img);
  
        item.setAttribute(
          "data-nombre",
          obj === "linterna"
            ? "Linterna"
            : obj === "pila"
            ? "Pila"
            : obj === "linternaConPila"
            ? "Linterna con pila"
            : "Destornillador"
        );
      } else {
        item.removeAttribute("data-nombre");
      }
  
      item.classList.remove("seleccionado");
    });
  
    seleccionado1 = null;
    seleccionado2 = null;
  }
  
  // --- Lógica de selección y combinación ---

  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (!inventario[index]) return;
  
      // deseleccionar si ya estaba seleccionado
      if (seleccionado1 === index) {
        item.classList.remove("seleccionado");
        seleccionado1 = null;
        return;
      }
  
      // si no hay selección previa
      if (seleccionado1 === null) {
        seleccionado1 = index;
        item.classList.add("seleccionado");
        return;
      }
  
      // si seleccionás un segundo ítem distinto
      if (seleccionado1 !== null && seleccionado1 !== index) {
        seleccionado2 = index;
        sidebarItems[seleccionado2].classList.add("seleccionado");
  
        const item1 = inventario[seleccionado1];
        const item2 = inventario[seleccionado2];
  
// combinación linterna + pila
if ((item1 === "linterna" && item2 === "pila") || (item1 === "pila" && item2 === "linterna")) {
  const linternaIndex = inventario.indexOf("linterna");
  const pilaIndex = inventario.indexOf("pila");
  inventario[linternaIndex] = "linternaConPila";
  inventario.splice(pilaIndex, 1);
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
    if (!pilaLamparaAgarrada) {
      pila.style.display = "flex";
    }
  });

  pila.addEventListener("click", () => {
    if (!pilaLamparaAgarrada) {
      inventario.push("linterna"); // linterna
      pila.style.display = "none";
      pilaLamparaAgarrada = true;
      actualizarInventario();
    }
  });

  // --- Trofeo y pila ---
  const trofeo = document.querySelector(".trofeo");
  const pilaTrofeo = document.getElementById("pilaTrofeo");

  trofeo.addEventListener("click", () => {
    if (!pilaTrofeoAgarrada) {
      pilaTrofeo.style.display = "flex";
    }
  });

  pilaTrofeo.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!pilaTrofeoAgarrada) {
      inventario.push("pila"); // pila
      pilaTrofeo.style.display = "none";
      pilaTrofeoAgarrada = true;
      actualizarInventario();
    }
  });

  // --- Botón pasar habitación ---
  const btnPasarHabitacion = document.getElementById('pasarHabitacion');
  btnPasarHabitacion.addEventListener('click', () => {
    window.location.href = '../Habitacióon2/Juego2.html';
  });

  // --- Botones scroll ---
  const btnIzq = document.querySelector(".nav-left");
  const btnDer = document.querySelector(".nav-right");
  btnIzq.addEventListener("click", scrollPrev);
  btnDer.addEventListener("click", scrollNext);

    // --- Vitrina y diamante (solo en pared 2) ---
const vitrina = document.querySelector(".vitrina");
const pared2 = document.getElementById("pared2");



// Mostrar el diamante si se tiene la linterna con pila
vitrina.addEventListener("click", () => {
  if (inventario.includes("linternaConPila")) {
    mostrarSimbolosVitrina();
  }
});
// --- Símbolos escondidos en la vitrina ---
// Solo se crean una vez

let simbolosRevelados = false;
let simbolosElementos = []; // guardamos los elementos creados para poder borrarlos

function mostrarSimbolosVitrina() {
  if (simbolosRevelados) return;
  simbolosRevelados = true;

  const simbolos = [
    { nombre: "piramideNaranja", archivo: "piramide naranja.png" },
    { nombre: "cruzRosa", archivo: "cruz rosa.png" },
    { nombre: "ojoVerde", archivo: "ojo verde.png" },
    { nombre: "cucarachaAzul", archivo: "cucaracha azul.png" }
  ];

  const imgSize = 25;

  // posiciones relativas ajustadas: [top%, left%]
  const posiciones = [
    [0.53, 0.3],
    [0.55, 0.42],
    [0.58, 0.57],
    [0.60, 0.7]
  ];

  simbolos.forEach((simbolo, i) => {
    const img = document.createElement("img");
    img.src = `../Elementos/${simbolo.archivo}`;
    img.id = simbolo.nombre;
    img.style.position = "absolute";

    // calcular posición dentro de pared2 (vitrina incluida)
    img.style.top = `${posiciones[i][0] * pared2.clientHeight - 5}px`; // subido 5px
    img.style.left = `${posiciones[i][1] * pared2.clientWidth}px`;

    img.style.width = `${imgSize}px`;
    img.style.height = `${imgSize}px`;
    img.style.pointerEvents = "none";
    img.style.zIndex = "1000";

    pared2.appendChild(img);
    simbolosElementos.push(img);
  });
}
const destornilladorVisible = document.getElementById("destornilladorVisible");
  if (destornilladorVisible) {
    destornilladorVisible.addEventListener("click", () => {
      if (!inventario.includes("destornillador")) {
        inventario.push("destornillador");
        actualizarInventario();
        destornilladorVisible.style.display = "none";
      }
    });
  }
});


// --- Mostrar pantalla solo en pared 4 ---
function mostrarPared(index) {
  // tu código original para cambiar de pared
  currentIndex = index;

  // eliminar pantalla si no es pared 4
  const pantalla = document.getElementById("pantallaColores");
  if (pantalla) pantalla.remove();

  // si es pared 4, crearla
  if (index === 3) crearPantallaColores();
}
// --- PUZZLE DE COLORES EN LA PARED 4 ---

const coloresCorrectos = ["rojo", "verde", "azul", "amarillo"];
let coloresSeleccionados = ["", "", "", ""];

// Crear pantalla de las 4 formas
function crearPantallaColores() {
  // si ya existe, no la vuelvas a crear
  if (document.getElementById("pantallaColores")) return;

  const pantalla = document.createElement("div");
  pantalla.id = "pantallaColores";
  pantalla.style.position = "absolute";
  pantalla.style.top = "150px";
  pantalla.style.left = "50%";
  pantalla.style.transform = "translateX(-50%)";
  pantalla.style.display = "flex";
  pantalla.style.gap = "20px";
  pantalla.style.zIndex = "500";

  const formas = ["50%", "0%", "20%", "triangulo"]; // círculo, cuadrado, rombo, triángulo

  for (let i = 0; i < 4; i++) {
    const forma = document.createElement("div");
    forma.classList.add("formaColor");
    forma.style.width = "60px";
    forma.style.height = "60px";
    forma.style.background = "gray";
    forma.style.cursor = "pointer";
    forma.dataset.index = i;

    // Dar forma visual
    if (formas[i] === "triangulo") {
      forma.style.width = "0";
      forma.style.height = "0";
      forma.style.borderLeft = "30px solid transparent";
      forma.style.borderRight = "30px solid transparent";
      forma.style.borderBottom = "60px solid gray";
      forma.dataset.tipo = "triangulo";
    } else {
      forma.style.borderRadius = formas[i];
    }

    forma.addEventListener("click", () => {
      const colores = ["rojo", "verde", "azul", "amarillo", "violeta"];
      const actual = coloresSeleccionados[i];
      const nuevo =
        colores[(colores.indexOf(actual) + 1) % colores.length] || "rojo";
      coloresSeleccionados[i] = nuevo;

      if (forma.dataset.tipo === "triangulo") {
        forma.style.borderBottomColor = nuevo;
      } else {
        forma.style.background = nuevo;
      }

      verificarPuzzleColores();
    });

    pantalla.appendChild(forma);
  }

  document.body.appendChild(pantalla);
}

// Verificar si los colores son correctos
function verificarPuzzleColores() {
  if (
    coloresSeleccionados[0] === coloresCorrectos[0] &&
    coloresSeleccionados[1] === coloresCorrectos[1] &&
    coloresSeleccionados[2] === coloresCorrectos[2] &&
    coloresSeleccionados[3] === coloresCorrectos[3]
  ) {
    desbloquearCajon();
  }
}

// Desbloquear cajón
function desbloquearCajon() {
  if (cajonDesbloqueado) return;
  cajonDesbloqueado = true;
  alert("¡Escuchás un clic en el cajón de la mesa!");
}




