/* 1 ) RÉCUPÉRER LE LOCAL STORAGE */
let getBasket = localStorage.getItem("basket");
getBasket = JSON.parse(getBasket);

for (let index = 0; index < getBasket.length; index++) {
  let productBasket = getBasket[index];
  let testColor = productBasket.color;

  /* LA QUANTITÉ ET LA COULEUR DOIVENT ETRE RECUPERER DEPUIS LE LOCAL STORAGE */
  var quantitySelect = productBasket.quantity;
  var colorSelect = productBasket.color;

  /* 2) RÉCUPÉRATION VIA L'API DES PRODUITS QUI ONT UN ID IDENTIQUES AU LOCAL STORAGE */
  fetch("http://localhost:3000/api/products/" + productBasket.id)
    .then((response) => response.json())
    .then((listProductsBasket) => {
      var newArticle = new Article(
        listProductsBasket.altTxt,
        listProductsBasket.description,
        listProductsBasket.imageUrl,
        listProductsBasket.name,
        listProductsBasket.price,
        listProductsBasket._id,
        listProductsBasket.colors
      );

      /* GET DOM, ADD CLASS, SET ATTRIBUTES */
      let cartItems = document.getElementById("cart__items");
      let cartItem = document.createElement("article");
      cartItem.className = "cart__item";
      cartItems.appendChild(cartItem);
      cartItem.setAttribute("data-id", listProductsBasket._id);
      cartItem.setAttribute("data-color", testColor);

      /* IMAGE */
      let cartItemImg = document.createElement("div");
      cartItemImg.className = "cart__item__img";

      let imgProduct = document.createElement("img");
      cartItem.appendChild(cartItemImg);
      cartItemImg.appendChild(imgProduct);
      imgProduct.src = listProductsBasket.imageUrl;
      imgProduct.alt = listProductsBasket.altTxt;

      let cartItemContent = document.createElement("div");
      cartItemContent.className = "cart__item__content";
      cartItem.append(cartItemContent);

      let cartItemContentDescription = document.createElement("div");
      cartItemContentDescription.className = "cart__item__content__description";
      cartItemContent.append(cartItemContentDescription);

      /* TITLE PRODUCT */
      let titleProduct = document.createElement("h2");
      titleProduct.textContent = listProductsBasket.name;
      cartItemContentDescription.appendChild(titleProduct);

      /* COLOR PRODUCT */
      let colorProduct = document.createElement("p");
      colorProduct.textContent = testColor;
      cartItemContentDescription.appendChild(colorProduct);

      /* PRICE */
      let priceProduct = document.createElement("p");
      priceProduct.textContent = listProductsBasket.price + "€";
      cartItemContentDescription.appendChild(priceProduct);

      /* SETTINGS */
      let cartItemContentSettings = document.createElement("div");
      cartItemContentSettings.className = "cart__item__content__settings";
      cartItemContent.append(cartItemContentSettings);

      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

      /* QUANTITY  */
      let pcarItemContentSettingQuantity = document.createElement("p");
      pcarItemContentSettingQuantity.textContent = "Qté : ";
      cartItemContentSettingsQuantity.appendChild(
        pcarItemContentSettingQuantity
      );

      let itemQuantity = document.createElement("input");
      itemQuantity.className = "itemQuantity";
      itemQuantity.type = "number";
      itemQuantity.name = "itemQuantity";
      itemQuantity.min = "1";
      itemQuantity.max = "100";
      itemQuantity.value = productBasket.quantity;
      cartItemContentSettingsQuantity.appendChild(itemQuantity);

      /* DELETE */
      let cartItemDelete = document.createElement("div");
      cartItemDelete.className = "cart__item__content__settings__delete";
      cartItemContentSettings.appendChild(cartItemDelete);

      let pcarItemDelete = document.createElement("p");
      pcarItemDelete.className = "deleteItem";
      pcarItemDelete.textContent = "Supprimer";
      cartItemDelete.appendChild(pcarItemDelete);

      /* ÉVÉNEMENT SUPPRIMER */
      pcarItemDelete.addEventListener("click", (e) => {
        /* Récupération de l'id au clic */
        let idActive = e.composedPath()[4].dataset.id;

        /* Récupération de la couleur au click */
        let colorActive = e.composedPath()[4].dataset.color;

        let basket = localStorage.getItem("basket");
        let newBasket = JSON.parse(basket);

        let monresultest = newBasket.findIndex(
          (b) => b.id == idActive && b.color == colorActive
        );

        newBasket.splice(monresultest, 1);

        cartItem.remove();

        localStorage.setItem("basket", JSON.stringify(newBasket));
      });

      /* ÉVÉNEMENT ENLEVER OU AJOUTER QUANTITÉ */
      itemQuantity.addEventListener("click", (e) => {
        /* Récupération de l'id au clic */
        let idActive = e.composedPath()[4].dataset.id;

        /* Récupération de la couleur au click */
        let colorActive = e.composedPath()[4].dataset.color;

        let newValue = itemQuantity.value;

        /* APPEL LOCAL STORAGE */
        let basket = localStorage.getItem("basket");
        let newBasket = JSON.parse(basket);

        let testing = newBasket.map((b) =>
          b.id == idActive && b.color == colorActive
            ? { ...b, quantity: newValue }
            : b
        );

        localStorage.setItem("basket", JSON.stringify(testing));
        console.log(idActive);
        console.log(newValue);
        console.log(testing);
      });
    });
}

/* Création d'une class Article */
class Article {
  constructor(altTxt, description, imageURL, name, price, _id, colors) {
    this.altTxt = altTxt;
    this.description = description;
    this.imageURL = imageURL;
    this.name = name;
    this.price = price;
    this._id = _id;
    this.colors = colors;
  }
}

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
