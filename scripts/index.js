import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

/* --- VARIABLES --- */
const cardsContainer = document.querySelector(".elements");
const editButton = document.querySelector(".header__profile-edit-button");
const addButton = document.querySelector(".header__profile-add-button");

// Formularios
const profileForm = document.querySelector(".popup__form"); 
const addCardForm = document.querySelector(".popup-place__form");

// Datos de Perfil
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#about-input");
const profileName = document.querySelector(".header__profile-first-text");
const profileJob = document.querySelector(".header__profile-second-text");

const initialCards = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

/* --- LOGICA DE TARJETAS --- */

// Función para crear una instancia de Card
function createCardInstance(item) {
  const card = new Card(item, "#template");
  return card.generateCard();
}

// Renderizar iniciales
initialCards.forEach((item) => {
  cardsContainer.append(createCardInstance(item));
});

/* --- VALIDACION --- */

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Creamos una instancia de validador por cada formulario
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

// Activamos la validación
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

/* --- EVENTOS --- */

// Abrir Editor Perfil
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(document.querySelector(".popup-perfil"));
});

// Abrir Añadir Lugar
addButton.addEventListener("click", () => {
  openPopup(document.querySelector(".popup-places"));
});

// Submit Perfil
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(document.querySelector(".popup-perfil"));
});

// Submit Nueva Tarjeta
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: document.querySelector("#title-input").value,
    link: document.querySelector("#url-input").value
  };
  cardsContainer.prepend(createCardInstance(newCardData));
  addCardForm.reset();
  closePopup(document.querySelector(".popup-places"));
});

// Cierre universal por Overlay o botón X
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup-open") || evt.target.closest(".popup__close-button") || evt.target.closest(".popup-place__close-button") || evt.target.closest(".popup__close-button2")) {
      closePopup(popup);
    }
  });
});