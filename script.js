document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const toggle = document.getElementById("darkToggle");

  // ===========================
  // Cargar fuentes desde JSON
  // ===========================
  fetch("sources.json")
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(sectionName => {
        const section = document.createElement("div");
        section.className = "section";

        const title = document.createElement("h2");
        title.textContent = sectionName;
        section.appendChild(title);

        data[sectionName].forEach(source => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `<span>${source.icon}</span> ${source.name}`;

          // Click directo → abre la fuente
          card.onclick = () => {
            let urlToOpen = source.url.trim();

            // Asegurar que tenga https://
            if (!/^https?:\/\//i.test(urlToOpen)) {
              urlToOpen = "https://" + urlToOpen;
            }

            window.open(urlToOpen, "_blank");
          };

          section.appendChild(card);
        });

        content.appendChild(section);
      });
    })
    .catch(err => {
      console.error("Error cargando sources.json:", err);
      content.innerHTML = "<p>Error cargando fuentes.</p>";
    });

  // ===========================
  // Modo oscuro
  // ===========================
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }

  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "dark",
      document.body.classList.contains("dark")
    );
  };
});
