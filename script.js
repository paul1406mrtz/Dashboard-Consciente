// Elementos principales
const content = document.getElementById("content");
const overlay = document.getElementById("overlay");
const reasonInput = document.getElementById("reason");
let pendingUrl = null;

// ===========================
// 1️⃣ Cargar fuentes desde JSON
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

        // Click en la fuente → abrir overlay
        card.onclick = () => openWithPause(source.url);
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
// 2️⃣ Función para pausa consciente
// ===========================
function openWithPause(url) {
  if (!url) return;
  pendingUrl = url;
  reasonInput.value = "";
  overlay.classList.remove("hidden");
}

// ===========================
// 3️⃣ Botón Cancelar
// ===========================
document.getElementById("cancel").onclick = () => {
  overlay.classList.add("hidden");
  pendingUrl = null;
};

// ===========================
// 4️⃣ Botón Continuar (con validación)
// ===========================
document.getElementById("continue").onclick = () => {
  const reason = reasonInput.value.trim();

  if (!reason) {
    alert("Escribe al menos una frase corta.");
    return;
  }

  overlay.classList.add("hidden");

  if (!pendingUrl) {
    console.error("No hay URL definida para abrir.");
    return;
  }

  let urlToOpen = pendingUrl.trim();
  pendingUrl = null;

  // Asegurar que la URL sea absoluta
  if (!/^https?:\/\//i.test(urlToOpen)) {
    urlToOpen = "https://" + urlToOpen;
  }

  window.open(urlToOpen, "_blank");
};


// ===========================
// 5️⃣ Modo oscuro
// ===========================
const toggle = document.getElementById("darkToggle");

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

