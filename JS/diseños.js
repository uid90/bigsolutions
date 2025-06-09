document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el JSON");
      return res.json();
    })
    .then(data => {
      const galeria = document.getElementById("galeria");
      const disenos = data.filter(item => item.tag === "DISEÑOS");
      
      disenos.forEach(d => {
        const card = document.createElement("a");
        card.className = "glass p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform text-white text-center block w-full";
        
        const img = document.createElement("img");
        img.src = d.link;
        img.className = "rounded-xl mb-3 mx-auto w-full h-auto object-contain";
        
        card.appendChild(img);
        galeria.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
      document.getElementById("galeria").innerHTML =
        "<p class='text-center text-red-500'>Error al cargar los diseños.</p>";
    });
});
