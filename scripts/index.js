//---------->   PASO #1     SECCIONAMOS ELEMENTOS DEL DOM     <---------------------

// AQUI DEFINIMOS LAS CONSTANTES Y PARA ELLO, HAY DE VARIOS TIPOS (),
// en esta ocacion utilizaremos la constante "const"

//Aqui Localizamos, llamamos o seleccionamos los elememtos por su clase tal cual se escribe en CSS
// y tambien por su ID (#)
//--->botones
const editButton = document.querySelector(".header__profile-edit-button");
const closeButton = document.querySelector(".popup__close-button");

//--->popup
const popup = document.querySelector(".popup");
const titleFistText = document.querySelector(".header__profile-first-text");
const titleSecondText = document.querySelector(".header__profile-second-text");

//--->form
const form = document.querySelector(".popup__form");
//NOTA: tambien podemos usar para llamar un elememto por su Id, usamos getElementById("elemento Id sin #")
const nameImput = document.querySelector("#name");
const aboutImput = document.querySelector("#about");

//---------->   PASO #2     CREAR FUNCIONALIDAD O MANIPULACION   <-----------------------

const closePopup = () => {
  popup.classList.remove("popup-open");
};

const openPopup = () => {
  popup.classList.add("popup-open");
  nameImput.value = titleFistText.textContent;
  aboutImput.value = titleSecondText.textContent;
};

//--------->   PASO #3   PROGRAMAMOS LOS EVENTOS LLAMANDO A UNA FUNCION    <-------------------
editButton.addEventListener("click", () => {
  openPopup();
});

closeButton.addEventListener("click", () => {
  closePopup();
});

// EVENTOS DE MI FORMULARIO

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameValue = nameImput.value;
  let aboutValue = aboutImput.value;
  titleFistText.textContent = nameValue;
  titleSecondText.textContent = aboutValue;
  //NOTA: ⬇ estos valores o funcionalidades vacios, se asignan despues de hecer la asignción
  //  para que en nuevo valor quede guardado y reseteat form
  // nameImput.value = "";
  // aboutImput.value = "";
  closePopup();
});
