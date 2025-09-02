const container = document.getElementById("Container");
    const total = container.children.length;
    let currentIndex = 0;

    function scrollToIndex(index) {
      const x = index * window.innerWidth;
      container.scrollTo({ left: x, behavior: "smooth" });
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