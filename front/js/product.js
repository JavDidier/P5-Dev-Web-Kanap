/* Récupération de l'ID dans la barre d'adresse*/
const callApiProductUrl = "http://localhost:3000/api/products/";
const idProduct = new URLSearchParams(window.location.search).get("id");

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => response.json())
  .then((product) => {
    // /* IMAGE PRODUCT */
    let itemImg = document.querySelector(".item__img");
    let imgProduct = document.createElement("img");
    let imageUrl = product.imageUrl;
    let imageAltTxt = product.altTxt;
    imgProduct.src = imageUrl;
    imgProduct.alt = imageAltTxt;

    itemImg.appendChild(imgProduct);

    /* NAME PRODUCT */
    document.getElementById("title").textContent = product.name;

    /* PRICE PRODUCT */
    document.getElementById("price").textContent = product.price;

    /* DESCRIPTION PRODUCT */
    document.getElementById("description").textContent = product.description;

    /* COLORS PRODUCT */
    let listColors = document.getElementById("colors");

    for (let index = 0; index < product.colors.length; index++) {
      let element = product.colors[index];
      var itemColor = new Option(element, element);
      listColors.appendChild(itemColor);
      console.log(element);
    }

    // /* CLICK ADD BASKET and CHECKED ERROR */
    let monTest = document.getElementById("addToCart");

    monTest.addEventListener("click", function () {
      let returnQuantityProduct = document.getElementById("quantity").value;
      let numberReturnQuantityProduct = Number(returnQuantityProduct);
      if (
        numberReturnQuantityProduct < 1 ||
        numberReturnQuantityProduct > 100
      ) {
        alert("La quantité doit être entre 1 et 100");
        console.log("Impossible de connaitre la quantité de produit à ajouter");
      } else if (!Number.isInteger(numberReturnQuantityProduct)) {
        alert("La quantité de produit ne peut pas etre en décimale ");
        console.log("Veuillez écrire un nombre entier");
      } else {
        console.log("C'est bien un NOMBRE entre 1 et 100, on ajoute au panier");
        addBasket();
      }
    });
  })

  .catch((error) => {
    console.log(error);
  });

/* SAVE BASKET IN LOCAL STRORAGE */
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

/* GET BASKET */
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

/* ADD BASKET */
function addBasket(item) {
  let basket = getBasket();
  let colorProduct = document.getElementById("colors").value;
  let quantityProduct = document.getElementById("quantity").value;

  if (colorProduct == "") {
    alert("Veuillez choisir une couleur");
    console.log("Vous n'avez pas choisis de couleur");
  } else {
    item = {
      id: idProduct,
      color: colorProduct,
      quantity: Number(quantityProduct),
    };

    let foundProduct = basket.find((p) => {
      return p.color == item.color && p.id == item.id;
    });

    console.log(foundProduct);

    if (foundProduct != undefined) {
      foundProduct.quantity =
        Number(foundProduct.quantity) + Number(quantityProduct);

      console.log("La couleur existe déjà ");
    } else {
      console.log("Article ajouté au panier");
      item.quantity = Number(quantityProduct);
      basket.push(item);
    }

    saveBasket(basket);
  }
}
