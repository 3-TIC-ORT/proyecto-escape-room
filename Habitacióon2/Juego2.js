const container = document.getElementById("Container");
    const total = container.children.length;
    let currentIndex = 0;

    function scrollToIndex(index) {
      const x = index * window.innerWidth;
      container.scrollTo({ left: x, behavior: "auto" }); //smooth para que sea lento
    }

    function scrollNext() {
      currentIndex = (currentIndex + 1) % total;                 // 3->0
      scrollToIndex(currentIndex);
    }

    function scrollPrev() {
      currentIndex = (currentIndex - 1 + total) % total;          // 0->3
      scrollToIndex(currentIndex);
    }

    // Si el usuario arrastra con el mouse/touch, actualizamos el índice
    container.addEventListener("scroll", () => {
      const idx = Math.round(container.scrollLeft / window.innerWidth);
      currentIndex = Math.max(0, Math.min(total - 1, idx));
    });

    // Si cambia el tamaño de la ventana, mantenemos el snap correcto
    window.addEventListener("resize", () => {
      scrollToIndex(currentIndex);
    });

    function irAPantalla(url) {
      window.location.href = url;
    }

    function irAPantalla(url) {
      window.location.href = url;
    }
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('puerta');
      btn.addEventListener('click', () => irAPantalla('../Habitación1/Juego.html'));
    }); 

    const inventario = [];
const slots = document.querySelectorAll(".item-slot");

function agregarAlInventario(imgSrc) {
  if (inventario.length >= slots.length) return; // inventario lleno
  inventario.push(imgSrc);

  for (let slot of slots) {
    if (!slot.hasChildNodes()) {
      slot.innerHTML = `<img src="${imgSrc}" alt="item">`;
      break;
    }
  }
}

// ejemplo: clic en lámpara → obtenés una pila
document.addEventListener('DOMContentLoaded', () => {
  const lampara = document.querySelector(".lampara");
  lampara.addEventListener("click", () => {
    agregarAlInventario("pila.png");
  });
});

