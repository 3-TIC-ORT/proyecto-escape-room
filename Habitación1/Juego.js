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
diamante.style.top = "100px";  // ajustá según donde quieras que aparezca
diamante.style.left = "180px";
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