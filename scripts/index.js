// Importaciones estandarizadas
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

/* -------------------------------------------------------------------------- */
/* VARIABLES                                  */
/* -------------------------------------------------------------------------- */
const cardsContainer = document.querySelector(".elements");
const editButton = document.querySelector(".header__profile-edit-button");
const addButton = document.querySelector(".header__profile-add-button");

// Formularios
const profileForm = document.querySelector(".popup__form"); 
const addCardForm = document.querySelector(".popup-place__form");

// Inputs y Textos de Perfil
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#about-input");
const profileName = document.querySelector(".header__profile-first-text");
const profileJob = document.querySelector(".header__profile-second-text");

// Tarjetas Iniciales
const initialCards = [
    { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg" },
    { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg" },
    { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg" }
];

/* -------------------------------------------------------------------------- */
/* LÓGICA DE TARJETAS                              */
/* -------------------------------------------------------------------------- */
function createCardInstance(item) {
  // Instanciamos la clase Card
  const card = new Card(item, "#template");
  return card.generateCard();
}

// Renderizado inicial
initialCards.forEach((item) => {
  cardsContainer.append(createCardInstance(item));
});

/* -------------------------------------------------------------------------- */
/* VALIDACIÓN                                   */
/* -------------------------------------------------------------------------- */
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Instanciamos la clase FormValidator para cada formulario
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

// Activamos la validación mediante POO
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/* EVENTOS                                    */
/* -------------------------------------------------------------------------- */

// Abrir popup de edición de perfil
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(document.querySelector(".popup-perfil"));
});

// Abrir popup de añadir tarjeta
addButton.addEventListener("click", () => {
  openPopup(document.querySelector(".popup-places"));
});

// Guardar perfil
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(document.querySelector(".popup-perfil"));
});

// Crear nueva tarjeta
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: document.querySelector("#title-input").value,
    link: document.querySelector("#url-input").value
  };
  // Prepend para que aparezca al principio
  cardsContainer.prepend(createCardInstance(newCardData));
  
  // Limpiamos el formulario
  addCardForm.reset();
  
  // Opcional pero recomendado: Desactivar el botón tras crear
  const submitButton = addCardForm.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;

  closePopup(document.querySelector(".popup-places"));
});

// Cierre universal de popups (Click fuera o en la X)
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup-open") || 
      evt.target.classList.contains("popup__overlay") ||
      evt.target.closest(".popup__close-button") || 
      evt.target.closest(".popup-place__close-button") || 
      evt.target.closest(".popup__close-button2")
    ) {
      closePopup(popup);
    }
  });
});