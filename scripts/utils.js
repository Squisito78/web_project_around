// Exportamos las funciones para que otros archivos puedan usarlas
export function openPopup(popup) {
  popup.classList.add("popup-open");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup-open");
  document.removeEventListener("keydown", closeByEscape);
}

// Función interna (no necesita export si solo se usa aquí)
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup-open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}