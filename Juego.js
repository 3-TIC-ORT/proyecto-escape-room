document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("paredesContainer");
    const paredes = document.querySelectorAll(".paredes");
  
    let indice = 0; // arranca en pared1
  
    // Botones
    const boton1 = document.getElementById("boton1"); // botón "a" para ir a la pared siguiente
    const boton2 = document.getElementById("boton2"); // botón "a" para ir a la pared anterior
  
    // Avanzar a la siguiente pared
    boton1.addEventListener("click", () => {
      indice = (indice + 1) % paredes.length; // avanza y vuelve al inicio si pasa del final
      container.style.transform = `translateX(-${indice * 100}vw)`;
    });
  
    // Volver a la pared anterior
    boton2.addEventListener("click", () => {
      indice = (indice - 1 + paredes.length) % paredes.length; // retrocede y vuelve al final si va antes de 0
      container.style.transform = `translateX(-${indice * 100}vw)`;
    });
  });