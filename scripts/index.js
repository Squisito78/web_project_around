/* -------------------------------------------------------------------------- */
/* VARIABLES                                 */
/* -------------------------------------------------------------------------- */

// Seccion de Elementos (Cards)
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template").content;

// Popups (Ventanas Modales)
// Seleccionamos todos los popups para aplicarles listeners universales
const popups = document.querySelectorAll(".popup"); 

// Botones de Apertura
const editButton = document.querySelector(".header__profile-edit-button");
const addButton = document.querySelector(".header__profile-add-button");

// Formularios y Elementos de Perfil
const profileForm = document.querySelector(".popup__form"); // Formulario de editar perfil
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about");
const profileName = document.querySelector(".header__profile-first-text");
const profileJob = document.querySelector(".header__profile-second-text");

// Formulario de Añadir Tarjeta
const addCardForm = document.querySelector(".popup-place__form"); // Asegúrate que esta clase sea única para el form de añadir
const titleInput = document.querySelector("#Name-title");
const linkInput = document.querySelector("#link-image");

// Popup de Imagen (Zoom)
const imagePopup = document.querySelector(".popup__image"); // Contenedor del popup imagen
const imagePopupElement = document.querySelector(".popup__big-image"); // La etiqueta <img>
const imagePopupCaption = document.querySelector(".popup__title-image"); // El título de la imagen

// Array de Datos Iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/* FUNCIONES UNIVERSALES                          */
/* -------------------------------------------------------------------------- */

// Función para cerrar con la tecla Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup-open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Función Universal de Apertura
function openPopup(popupElement) {
  popupElement.classList.add("popup-open");
  // Añadimos el listener de ESC solo cuando se abre el popup
  document.addEventListener("keydown", handleEscClose);
}

// Función Universal de Cierre 
function closePopup(popupElement) {
  popupElement.classList.remove("popup-open");
  // Eliminamos el listener de ESC cuando se cierra para ahorrar memoria
  document.removeEventListener("keydown", handleEscClose);
}

/* -------------------------------------------------------------------------- */
/* FUNCIONES DE TARJETAS                             */
/* -------------------------------------------------------------------------- */

// Función para crear una tarjeta (Retorna el elemento HTML) 
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  
  const cardImage = cardElement.querySelector(".element__grid-card");
  const cardTitle = cardElement.querySelector(".element__card-text");
  const likeButton = cardElement.querySelector(".element__card-like");
  const deleteButton = cardElement.querySelector(".element__trash-icon");

  // Asignar datos
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Listeners internos de la tarjeta
  
  // 1. Like 
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__card-like-active");
  });

  // 2. Eliminar
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // 3. Abrir Popup de Imagen
  cardImage.addEventListener("click", () => {
    imagePopupElement.src = link;
    imagePopupElement.alt = name;
    imagePopupCaption.textContent = name;
    openPopup(imagePopup); // Usamos la variable correcta del popup de imagen
  });

  return cardElement;
}

// Función para renderizar tarjetas en el DOM
function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/* MANEJO DE EVENTOS                               */
/* -------------------------------------------------------------------------- */

// Renderizar las 6 tarjetas iniciales
initialCards.forEach((cardData) => {
  const newCard = createCard(cardData.name, cardData.link);
  cardsContainer.append(newCard); // Usamos append para mantener el orden inicial
});

// Listener para el formulario de "Editar Perfil"
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  
  // Identificamos el popup padre y lo cerramos
  const popupElement = document.querySelector(".popup"); 
  closePopup(popupElement);
});

// Listener para el formulario de "Añadir Tarjeta" 
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, linkInput.value);
  renderCard(newCard);
  
  // Reseteamos el formulario
  addCardForm.reset();
  
  // Identificamos el popup de añadir lugares y lo cerramos
  const popupPlaces = document.querySelector(".popup-places");
  closePopup(popupPlaces);

  // Opcional: Deshabilitar botón de guardar tras el envío (para validación)
  // const submitButton = addCardForm.querySelector('.popup__button');
  // submitButton.classList.add('popup__button_disabled');
  // submitButton.disabled = true;
});

// Listeners de Apertura (Botones)
editButton.addEventListener("click", () => {
  // Rellenar inputs con valores actuales
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
  const popupProfile = document.querySelector(".popup"); 
  openPopup(popupProfile);
});

addButton.addEventListener("click", () => {
  const popupPlaces = document.querySelector(".popup-places");
  openPopup(popupPlaces);
});

/* -------------------------------------------------------------------------- */
/* CIERRE UNIVERSAL (Overlay y Botón X)                     */
/* -------------------------------------------------------------------------- */

// Iteramos sobre todos los popups para agregar listener de click
// Esto cubre el requisito: "cerrar al hacer clic fuera (overlay) o en la X" 
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    // Cerramos si el click fue en el overlay (el propio div .popup) 
    // O si el click fue en el botón de cerrar (.popup__close-button)
    if (
      evt.target.classList.contains("popup") || 
      evt.target.classList.contains("popup-places") ||
      evt.target.classList.contains("popup__image") ||
      evt.target.classList.contains("popup-open") ||
      evt.target.classList.contains("popup__close-button") ||
      evt.target.classList.contains("popup__close-button2") ||
      evt.target.classList.contains("popup-place__close-button")
    ) {
      closePopup(popup);
    }
  });
});

/* -------------------------------------------------------------------------- */
/* VALIDACIÓN                                  */
/* -------------------------------------------------------------------------- */
// Aquí solo definimos la configuración y llamamos a la función de activación.

const validationConfig = {
  formSelector: ".popup__form", 
  // Nota: Asegúrate de que ambos formularios tengan esta clase o agrega '.popup-place__form' a tu CSS
  // Si tus formularios tienen clases distintas, usa una clase común o ajusta el selector.
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Llamamos a la función que viene de validate.js
enableValidation(validationConfig);