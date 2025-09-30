document.addEventListener('DOMContentLoaded', () => {
  // --- Variables globales ---
  const container = document.getElementById("Container");
  const totalParedes = container.children.length;
  let currentIndex = 0;

  let inventario = [];
  let pilaLamparaAgarrada = false;
  let pilaTrofeoAgarrada = false;

  // --- Funciones de scroll ---
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

  // --- Actualizar inventario en la sidebar ---
  function actualizarInventario() {
    const sidebarItems = document.querySelectorAll(".sidebar .item");
    sidebarItems.forEach((item, index) => {
      item.textContent = inventario[index] || "";
    });
  }

  // --- Lámpara y pila ---
  const lampara = document.getElementById("lampara");
  const pila = document.getElementById("pila");

  lampara.addEventListener("click", () => {
    if (!pilaLamparaAgarrada) {
      pila.style.display = "flex";
    }
  });

  pila.addEventListener("click", () => {
    if (!pilaLamparaAgarrada) {
      inventario.push("🔋");
      pila.style.display = "none";
      pilaLamparaAgarrada = true;
      actualizarInventario();
      console.log("Inventario:", inventario);
    }
  });

  // --- Trofeo y pila dentro ---
  const trofeo = document.querySelector(".trofeo");

  const pilaEnTrofeo = document.createElement("div");
  pilaEnTrofeo.textContent = "🔋";
  pilaEnTrofeo.style.cssText = `
    position: absolute;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 2rem;
    z-index: 1000;
  `;
  trofeo.appendChild(pilaEnTrofeo);

  trofeo.addEventListener("click", () => {
    if (!pilaTrofeoAgarrada) {
      pilaEnTrofeo.style.display = "flex";
    }
  });

  pilaEnTrofeo.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!pilaTrofeoAgarrada) {
      inventario.push("🔋");
      pilaEnTrofeo.style.display = "none";
      pilaTrofeoAgarrada = true;
      actualizarInventario();
      console.log("Inventario:", inventario);
    }
  });

  // --- Botón pasar habitación ---
  const btnPasarHabitacion = document.getElementById('pasarHabitacion');
  btnPasarHabitacion.addEventListener('click', () => {
    window.location.href = '../Habitacióon2/Juego2.html';
  });

  // --- Botones de scroll visibles ---
  const btnIzq = document.querySelector(".nav-left");
  const btnDer = document.querySelector(".nav-right");
  btnIzq.addEventListener("click", scrollPrev);
  btnDer.addEventListener("click", scrollNext);
});