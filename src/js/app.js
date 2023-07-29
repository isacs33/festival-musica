document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollnav();
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().top < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollnav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");

    imagen.innerHTML = `<source srcset="build/img/thumb/${i}.avif" type="Imagen/avif" />
    <source srcset="build/img/thumb/${i}.webp" type="Imagen/webp" />
    <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria" />`;

    imagen.onclick = function () {
      mostrarimagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarimagen(id) {
  const imagen = document.createElement("picture");

  imagen.innerHTML = `<source srcset="build/img/grande/${id}.avif" type="Imagen/avif" />
  <source srcset="build/img/grande/${id}.webp" type="Imagen/webp" />
  <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria" />`;

  // Crear el verlay con la imagen
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.appendChild(imagen);
  overlay.onclick = function () {
    cerrarOverlay(overlay, body);
  };

  // Crear el botón para cerrar la imagen
  const cerrarModal = document.createElement("p");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  cerrarModal.onclick = function () {
    cerrarOverlay(overlay, body);
  };
  overlay.appendChild(cerrarModal);

  // Añadirlo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}

function cerrarOverlay(overlay, body) {
  overlay.remove();
  body.classList.remove("fijar-body");
}
