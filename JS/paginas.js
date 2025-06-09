document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => {
      if (!res.ok) throw new Error(`No se pudo cargar el JSON: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => {
      const contenedor = document.getElementById("paginas");
      const paginas = data
        .filter(item => item.tag === "PÁGINAS")
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      
      paginas.forEach(pagina => {
        const card = document.createElement("a");
        card.href = pagina.link;
        card.target = "_blank";
        card.className = "block glass p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform text-white text-center";
        
        card.innerHTML = `
          <iframe src="${pagina.link}" class="rounded-xl mb-3 mx-auto w-full h-48 pointer-events-none" loading="lazy"></iframe>
          <h3 class="text-xl font-semibold mb-1">${pagina.nombre}</h3>
          <p>${pagina.descripcion}</p>
        `;
        
        contenedor.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error cargando páginas:", err);
      document.getElementById("paginas").innerHTML = `<p class='text-center text-red-500'>Error al mostrar páginas: ${err.message}</p>`;
    });
});
