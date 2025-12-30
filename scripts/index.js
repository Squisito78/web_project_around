/* -------------------------------------------------------------------------- */
/* VARIABLES                                 */
/* -------------------------------------------------------------------------- */

// Seccion de Elementos (Cards)
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template").content;

// Popups (Ventanas Modales)
// Seleccionamos todos los popups para aplicarles listeners universales
const popups = document.querySelectorAll(".popup"); 
const profilePopup = document.querySelector(".popup"); // Esta es la que no encontrabas OOOOOJJJJJOOOOOOO  ADD
// Botones de Apertura
const editButton = document.querySelector(".header__profile-edit-button");
const addButton = document.querySelector(".header__profile-add-button");

// Formularios y Elementos de Perfil
const profileForm = document.querySelector(".popup__form"); // Formulario de editar perfil
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#about-input");
const profileName = document.querySelector(".header__profile-first-text");
const profileJob = document.querySelector(".header__profile-second-text");

// Formulario de Añadir Tarjeta
const addCardForm = document.querySelector(".popup-place__form"); // Asegúrate que esta clase sea única para el form de añadir
const titleInput = document.querySelector("#title-input");
const linkInput = document.querySelector("#url-input");

// Popup de Imagen (Zoom)
const imagePopup = document.querySelector(".popup__image"); // Contenedor del popup imagen
const imagePopupElement = document.querySelector(".popup__big-image"); // La etiqueta <img>
const imagePopupCaption = document.querySelector(".popup__title-image"); // El título de la imagen

// Cerrar Popup Place desde la X
const closePopupPlace = document.querySelector(".popup-place__close-button")

// Cerrar Popup Edit Perfil desde la X
 const closePopupEditPerfil = document.querySelector(".popup__close-button")




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
// 1. Definimos qué pasa cuando se presiona una tecla
const closeByEscape = (evt) => {
  // Verificamos si la tecla presionada es 'Escape'
  if (evt.key === "Escape") {
    // Buscamos el popup que tenga la clase que lo mantiene visible
    const openedPopup = document.querySelector(".popup-open"); 
    if (openedPopup) {
      closePopup(openedPopup); // Llamamos a tu función de cerrar
    }
  }
};


// Función Universal de Apertura
function openPopup(popup) {
  popup.classList.add("popup-open");
  // AGREGAR: Escuchar el teclado cuando se abre
  document.addEventListener("keydown", closeByEscape);
}

// Función Universal de Cierre 
function closePopup(popup) {
  popup.classList.remove("popup-open");
  // AGREGAR: Dejar de escuchar el teclado cuando se cierra
  document.removeEventListener("keydown", closeByEscape);
}

/* -------------------------------------------------------------------------- */
/*                       FUNCIONES DE TARJETAS                                */
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
/*                            MANEJO DE EVENTOS                               */
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
//--------------------------------------------------------------------------------------------------------
// Deshabilitar botón de guardar tras el envío (para validación)
 const submitButton = addCardForm.querySelector('.popup__button');
   submitButton.classList.add('popup__button_disabled');
   submitButton.disabled = true;
});

//evento de cerrado popup Place // Cerrar Popup Place desde la X
closePopupPlace.addEventListener("click", () => {
   const popupElement = document.querySelector(".popup-places"); 
  closePopup(popupElement);
})

//evento de cerrado popup Edit Perfil // Cerrar Popup Place desde la X
closePopupEditPerfil.addEventListener("click", () => {
   const popupElement = document.querySelector(".popup-perfil"); 
  closePopup(popupElement);
})


// Listeners de Apertura (Botones)
editButton.addEventListener("click", () => {
  // Rellenar los campos (inputs) del formulario con valores actuales
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
});

editButton.addEventListener("click", () => {                   
  const profilePopup = document.querySelector(".popup");
  openPopup(profilePopup);
});


addButton.addEventListener("click", () => {
  const popupPlaces = document.querySelector(".popup-places");
  openPopup(popupPlaces);
});
/* -------------------------------------------------------------------------- */
/*                   CIERRE UNIVERSAL (Overlay y Botón X)                     */
/* -------------------------------------------------------------------------- */

// Iteramos sobre todos los popups para agregar listener de click
// Esto cubre el requisito: "cerrar al hacer clic fuera (overlay) o en la X" 
// Seleccionamos todos los elementos con la clase .popup
const popupsList = document.querySelectorAll(".popup");

popupsList.forEach((popup) => {
  // Usamos 'mousedown' para que sea más fluido el cierre
  popup.addEventListener("mousedown", (evt) => {
    // Si el clic es en la clase 'popup__overlay' (el fondo oscuro)
    // O si el clic es en un botón de cerrar
    if (
      evt.target.classList.contains("popup__overlay") || 
      evt.target.classList.contains("popup__close-button") ||
      evt.target.classList.contains("popup__close-button2") ||
      evt.target.classList.contains("popup-place__close-button")
    ) {
      closePopup(popup);
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                                VALIDACIÓN                                  */
/* -------------------------------------------------------------------------- */

// Aquí solo definimos la configuración y llamamos a la función de activación.
// Este es el objeto que pide el proyecto
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Llamamos a la función de validate.js pasando el objeto
enableValidation(validationConfig);
