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
        else if (obj === "linternaConPila") img.src = "../Elementos/linternaConPila.png";
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

// Crear el diamante una sola vez y ubicarlo dentro de pared2
const diamante = document.createElement("div");
diamante.textContent = "💎";
diamante.classList.add("diamante");
diamante.style.display = "none";
diamante.style.position = "absolute";
diamante.style.top = "280px";  // ajustá según donde quieras que aparezca
diamante.style.left = "632px";
diamante.style.fontSize = "40px";
diamante.style.cursor = "pointer";
pared2.appendChild(diamante);

// Mostrar el diamante si se tiene la linterna con pila
vitrina.addEventListener("click", () => {
  if (inventario.includes("🔦⚡")) {
    diamante.style.display = "flex";
  }
});

});

function crearPantallaColores() {
  if (currentIndex !== 3) return; // solo pared 4
  if (document.getElementById("pantallaColores")) return;

  const pantalla = document.createElement("div");
  pantalla.id = "pantallaColores";
  pantalla.style.position = "absolute";
  pantalla.style.top = "150px";
  pantalla.style.left = "50%";
  pantalla.style.transform = "translateX(-50%)";
  pantalla.style.display = "flex";
  pantalla.style.gap = "20px";

  const formas = ["50%", "0%", "20%", "clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"]; 
  // círculo, cuadrado, rombo y triángulo

  for (let i = 0; i < 4; i++) {
    const forma = document.createElement("div");
    forma.classList.add("formaColor");
    forma.style.width = "50px";
    forma.style.height = "50px";
    forma.style.background = "gray";
    forma.style.cursor = "pointer";
    forma.dataset.index = i;

    // aplicar la forma correspondiente
    if (i === 3) {
      forma.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)"; // triángulo
    } else {
      forma.style.borderRadius = formas[i];
    }

    forma.addEventListener("click", () => {
      const colores = ["rojo", "verde", "azul", "amarillo", "violeta"];
      const actual = coloresSeleccionados[i];
      const nuevo =
        colores[(colores.indexOf(actual) + 1) % colores.length] || "rojo";
      coloresSeleccionados[i] = nuevo;
      forma.style.background = nuevo;

      verificarPuzzleColores();
    });

    pantalla.appendChild(forma);
  }

  document.body.appendChild(pantalla);
}

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

// --- CAJÓN DE LA MESA ---
let cajonDesbloqueado = false;
function desbloquearCajon() {
  cajonDesbloqueado = true;
  alert("¡Escuchás un clic en el cajón de la mesa!");
}

const mesa = document.getElementById("mesa");
if (mesa) {
  mesa.addEventListener("click", () => {
    if (cajonDesbloqueado) {
      if (!inventario.includes("🪛")) {
        inventario.push("🪛");
        actualizarInventario();
        alert("¡Encontraste un destornillador!");
      }
    } else {
      alert("El cajón está cerrado.");
    }
  });
}

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

// Mesa (para obtener el destornillador)

if (mesa) {
  mesa.addEventListener("click", () => {
    if (cajonDesbloqueado) {
      if (!inventario.includes("🪛")) {
        inventario.push("destornillador");
        actualizarInventario();
        alert("¡Encontraste un destornillador!");
      }
    } else {
      alert("El cajón está cerrado.");
    }
  });
}

