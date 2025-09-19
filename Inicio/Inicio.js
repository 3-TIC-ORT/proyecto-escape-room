function irAPantalla(url) {
    window.location.href = url;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('StartButton');
    btn.addEventListener('click', () => irAPantalla('../Habitación1/Juego.html'));
  }); 