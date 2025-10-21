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
    sidebarItems.forEach((item, index) => {
      const obj = inventario[index] || "";
      item.textContent = obj ? obj : "";

      // tooltip
      if (obj) {
        item.setAttribute("data-nombre", 
          obj === "🔦" ? "Linterna" : 
          obj === "🔋" ? "Pila" : 
          "Linterna con pila"
        );
      } else {
        item.removeAttribute("data-nombre");
      }

      item.classList.remove("seleccionado");
    });

    seleccionado1 = null;
    seleccionado2 = null;
  }

  // --- Selección y combinación de items ---
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (!item.textContent) return;

      if (seleccionado1 === null) {
        seleccionado1 = index;
        item.classList.add("seleccionado");
        return;
      }

      if (seleccionado2 === null && index !== seleccionado1) {
        seleccionado2 = index;
        item.classList.add("seleccionado");

        const item1 = inventario[seleccionado1];
        const item2 = inventario[seleccionado2];

        // combinación linterna + pila
        if ((item1 === "🔦" && item2 === "🔋") || (item1 === "🔋" && item2 === "🔦")) {
          const linternaIndex = inventario.indexOf("🔦");
          const pilaIndex = inventario.indexOf("🔋");
          inventario[linternaIndex] = "🔦⚡";
          inventario.splice(pilaIndex, 1);
        }

        sidebarItems.forEach(i => i.classList.remove("seleccionado"));
        seleccionado1 = null;
        seleccionado2 = null;
        actualizarInventario();
        return;
      }

      // deseleccionar
      if (index === seleccionado1) {
        item.classList.remove("seleccionado");
        seleccionado1 = null;
      } else if (index === seleccionado2) {
        item.classList.remove("seleccionado");
        seleccionado2 = null;
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
      inventario.push("🔦"); // linterna
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
      inventario.push("🔋"); // pila
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
        inventario.push("🪛");
        actualizarInventario();
        alert("¡Encontraste un destornillador!");
      }
    } else {
      alert("El cajón está cerrado.");
    }
  });
}

// Detectar cuando se cambia de pared y mostrar puzzle en la 4
container.addEventListener("scroll", () => {
  currentIndex = Math.round(container.scrollLeft / window.innerWidth);

  // si estamos en la pared 4 (índice 3)
  if (currentIndex === 3) {
    crearPantallaColores();
  } else {
    const pantalla = document.getElementById("pantallaColores");
    if (pantalla) pantalla.remove();
  }
});
