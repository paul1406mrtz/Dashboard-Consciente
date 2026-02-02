const content = document.getElementById("content");
const overlay = document.getElementById("overlay");
const reasonInput = document.getElementById("reason");

let pendingUrl = null;

// Cargar fuentes
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

        card.onclick = () => openWithPause(source.url);
        section.appendChild(card);
      });

      content.appendChild(section);
    });
  });

// Pausa consciente
function openWithPause(url) {
  pendingUrl = url;
  reasonInput.value = "";
  overlay.classList.remove("hidden");
}

document.getElementById("cancel").onclick = () => {
  overlay.classList.add("hidden");
  pendingUrl = null;
};

document.getElementById("continue").onclick = () => {
  overlay.classList.add("hidden");
  if (pendingUrl) {
    window.open(pendingUrl, "_blank");
  }
};

// Modo oscuro
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
