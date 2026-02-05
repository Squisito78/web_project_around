// Importamos la función de apertura de popup desde utils
import { openPopup } from "./utils.js";

export default class Card {
  // El constructor recibe los datos y el selector del template
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Método privado para obtener la estructura del template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  // Método privado para configurar los botones (Like, Eliminar, Zoom)
  _setEventListeners() {
    this._element.querySelector(".element__card-like").addEventListener("click", (evt) => {
      this._handleLikeIcon(evt);
    });

    this._element.querySelector(".element__trash-icon").addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._element.querySelector(".element__grid-card").addEventListener("click", () => {
      this._handleOpenPreview();
    });
  }

  // Lógica del Like
  _handleLikeIcon(evt) {
    evt.target.classList.toggle("element__card-like-active");
  }

  // Lógica de borrar
  _handleDeleteCard() {
    this._element.remove();
    this._element = null; // Limpiamos la referencia
  }

  // Lógica de abrir imagen grande
  _handleOpenPreview() {
    const imagePopup = document.querySelector(".popup__image");
    const imagePopupElement = document.querySelector(".popup__big-image");
    const imagePopupCaption = document.querySelector(".popup__title-image");

    imagePopupElement.src = this._link;
    imagePopupElement.alt = this._name;
    imagePopupCaption.textContent = this._name;

    openPopup(imagePopup);
  }

  // Método público: Crea la tarjeta y la devuelve lista para insertar en el DOM
  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".element__grid-card");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__card-text").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}