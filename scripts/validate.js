/* -------------------------------------------------------------------------- */
/* VALIDATE.JS - Lógica de Validación de Formularios                           */
/* -------------------------------------------------------------------------- */

// Muestra el mensaje de error visualmente
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  // Agrega la clase de error al input (borde rojo)
  inputElement.classList.add(config.inputErrorClass);
  // Pone el mensaje de error en el span y lo hace visible
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Oculta el mensaje de error
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  // Quita la clase de error
  inputElement.classList.remove(config.inputErrorClass);
  // Limpia el mensaje y oculta el span
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// Verifica la validez del campo usando la API nativa del navegador (validity)
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Si no es válido, mostramos el mensaje nativo (ej: "Completa este campo")
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Verifica si hay AL MENOS UN campo inválido en el formulario
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Controla el estado del botón de envío (Desactivado/Activado)
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    // Si hay errores, desactiva el botón y añade clase de estilo
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // Si todo está bien, activa el botón
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Agrega los listeners a todos los campos del formulario
const setEventListeners = (formElement, config) => {
  // Buscamos todos los inputs y el botón dentro de ESTE formulario específico
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Verificamos el estado inicial del botón
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Función Principal: Habilita la validación para todos los formularios
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};