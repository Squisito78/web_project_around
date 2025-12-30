/* -------------------------------------------------------------------------- */
/* VALIDATE.JS - Lógica de Validación de Formularios                           */
/* -------------------------------------------------------------------------- */

/* Muestra el mensaje de error */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

/* Oculta el mensaje de error */
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

/* Revisa si el campo es válido */
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

/* Verifica si hay AL MENOS UN campo inválido en el formulario */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

/* --- AQUÍ ESTÁ LA SOLUCIÓN AL REVISOR --- */
/* Activa o desactiva el botón según la validez */
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    // Si hay errores, deshabilitamos el botón (física y visualmente)
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true; 
  } else {
    // Si todo está bien, habilitamos el botón
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

/* Agrega los escuchadores de eventos a los inputs */
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Verificamos el estado del botón apenas se carga el formulario
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      // Cada vez que escribimos, revisamos si el botón debe activarse
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

/* Función principal que habilita la validación */
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // ESTO ES IMPORTANTE: Evita que el navegador recargue la página
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

