// AQUI DEFINIMOS LAS CONSTANTES

//Y PARA ELLO, HAY DE VARIOS TIPOS (), en esta ocacion utilizaremos la constante "const"

//Aqui creamos CONST, Localizamos, llamamos o seleccionamos los elememtos por su clase tal cual se escribe en CSS
// o  por su ID (#)

//----- botones----->
const editButton = document.querySelector(".header__profile-edit-button");
const closeButton = document.querySelector(".popup__close-button");

//----- popup----->
const popup = document.querySelector(".popup");
const titleFistText = document.querySelector(".header__profile-first-text");
const titleSecondText = document.querySelector(".header__profile-second-text");

//----- form Popup INPUT ----->
const form = document.querySelector(".popup__form");
const nameImput = document.querySelector("#name"); //NOTA: tambien podemos usar para llamar un elememto por su Id, usando getElementById("elemento Id sin #")
const aboutImput = document.querySelector("#about");

//--->Templade
const templateCard = document.querySelector("#template"); //creamos ésta cte, para seleccionar y llamar por su #Id de TEMPLADE

// ------>  Secciones de los elementos
const section = document.querySelector(".elements");

//---- POPUP PLACES      --------------->
const popupPlaces = document.querySelector(".popup-places");

// ----- Boton de add & remove PLACES ----->
const addButtonPlaces = document.querySelector(".header__profile-add-button");
const removeButtonPlaces = document.querySelector(".popup-place__close-button");

// ----- Form Popup PLACES ----->
const popupPlaceForm = document.querySelector(".popup-place__form");

// EL SIGIENTE ARRAY NOS LO FACILITÓ LA PLATAFORMA TRIPLETEN para crear las CARD
const initialCards = [
  {
    name: "Valle de Yosemite", //NAME, es el nombre de la CARS
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg", //LINK; es la ruta
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

// ----- popup IMAGE ----->
const popupImage = document.querySelector(".popup__image");
const bigImage = document.querySelector(".popup__big-image");
const titleImage = document.querySelector(".popup__title-image");

// ----- boton de cerrado de popup image----->
const closePopupImage = document.querySelector(".popup__close-button2");

//----------->   FUNCIONES   <----------------------------------------------------------------------------------------------------------------->>>

// 1.-   ⬇⬇⬇ A continuacion debemos de crear una función que cree CARS, a partir del ARRAY anterior
// 2.- clonamos el contenido del TEMPLADE dentro del cuerpo de la funcion⏬ siguiente
const createCard = (name, link) => {
  // Dentro de ésta función clonamos los contenidos del TEMPLATE para crear un a nueva card,
  // para ello llamamos a Templade, luego a su contenido con la propiedad CONTENT, y el contenido lo clonamos
  // con el metodo (cloneNode(true)), donde clonamos la constante (templateCard) que se creo en la parte superior
  const elementCard = templateCard.content.cloneNode(true);

  // ---------------         AHORA TOCA LA PERSONALIZACION       ----------------
  // 1.- ahora llamanos a cada parte de los elementos
  const textCard = elementCard.querySelector(".element__card-text");
  const imageCard = elementCard.querySelector(".element__grid-card"); // creamos una CTE, y selecionamoa nuestro elemento (CardElement) donde su clase es (".element__grid-card")
  imageCard.src = link; //aqui llamamos a la contante con el atributo SRC, que guarda  una direccion electronica
  imageCard.alt = name; //aqui llamamos a la contante con el atributo Alt,  que guarda en nimbre que le damos a esa link
  textCard.textContent = name;

  // ----- LIKE----->
  const buttonCard = elementCard.querySelector(".element__card-like");

  //----- Bote de basura----->
  const trashCard = elementCard.querySelector(".element__trash-icon");

  // ahora tenemos que add un evento al corazon y al bote de basura, por tanto traemos el elemento a la funión, lamando a la cte. cardElement
  trashCard.addEventListener("click", (e) => {
    const selecCard = buttonCard.closest(".element");
    console.log("PROVANDO FUNCINABILIDA #1", e);
    selecCard.remove();
  });
  buttonCard.addEventListener("click", () => {
    buttonCard.classList.toggle("element__card-like-active"); //El método toggle() en JavaScript, específicamente cuando se usa con classList, sirve para alternar la presencia de una clase CSS en un elemento HTML. Si la clase ya está presente, la elimina; si no está presente, la añade
  });

  imageCard.addEventListener("click", () => {
    console.log("PROVANDO FUNCINABILIDA #2");
    popupImage.classList.add("popup-open");
    bigImage.src = link;
    titleImage.textContent = name;
  });

  return elementCard;

  r;
}; //Esta funct CREATE CARD  termina aqui.----------------------------------->

const closeImage = () => {
  popupImage.classList.remove("popup-open");
};

closePopupImage.addEventListener("click", () => {
  closeImage();
  console.log("para ver si....");
});

const closePopup = () => {
  popup.classList.remove("popup-open");
};

const openPopup = () => {
  popup.classList.add("popup-open");
  nameImput.value = titleFistText.textContent;
  aboutImput.value = titleSecondText.textContent;
};

const openPopupPlaces = () => {
  popupPlaces.classList.add("popup-open");
};
const closePopupPlaces = () => {
  popupPlaces.classList.remove("popup-open");
};

const createNewCard = (e) => {
  // paso 2 aqui extraemos informacion del usuario de los imput o formularios
  const addName = document.querySelector("#Name-title");
  const addLink = document.querySelector("#link-image");
  const valueName = addName.value;
  const valueLink = addLink.value;
  // paso 3
  const newCard = createCard(valueName, valueLink);
  // paso 4 add la nueva card a la section
  section.prepend(newCard);
  addName.value = "";
  addLink.value = "";
};

initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  section.appendChild(newCard);
});

// evento formulario
popupPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault(); // para evitar que se recague la página por defecto, por tanto usamos este comando, esto es usado en los formularios

  createNewCard();
  closePopupPlaces();
});

editButton.addEventListener("click", () => {
  openPopup();
});

closeButton.addEventListener("click", () => {
  closePopup();
});

addButtonPlaces.addEventListener("click", () => {
  openPopupPlaces();
});
removeButtonPlaces.addEventListener("click", () => {
  closePopupPlaces();
});

// EVENTOS DE MI FORMULARIO

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValue = nameImput.value;
  let aboutValue = aboutImput.value;
  titleFistText.textContent = nameValue;
  titleSecondText.textContent = aboutValue;
  //NOTA: ⬇ estos valores o funcionalidades vacios, se asignan despues de hecer la asignción
  //  para que en nuevo valor quede guardado y reseteado form
  // nameImput.value = "";
  // aboutImput.value = "";
  closePopup();
});
//
//
//
//
//
//
//
//

//     1   edintificar el boton
//  const editButton = document.querySelector(".header__profile-edit-button");
//
// //    2     add un evento
// editButton.addEventListener("click", () => {
//   openPopup();
// });

//         3 crear la funcionalidad que ejecuta el evento

// const openPopup = () => {
//   popup.classList.add("popup-open");
//   nameImput.value = titleFistText.textContent;
//   aboutImput.value = titleSecondText.textContent;
// };
//
//
//       1.- Abrir el popup ✅
//       2.- Extrae la Inf del Formulario, con esa información que extaraemos del usuario vamos a gestionar la nueva CARD
//       3.- Gestion de crea la nueva card
//       4.- Add la nueva CARD a la seccion de todas las card
//       5.- cerrar el popup ✅
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
