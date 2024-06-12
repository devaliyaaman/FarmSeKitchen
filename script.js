function goToAdmin() {
  window.location.href = 'admin.html';
}
function goToUser() {
  window.history.back();
}
function login() {
  document.getElementById("gotoAdminButton").click();
}

document.getElementById("shop").addEventListener("click", function (event) {
  // Check if the clicked element is a "Add to Cart" button
  if (event.target.classList.contains("btn-outline-success")) {
    // Find the relevant product information
    var productCard = event.target.closest(".card");
    var productName = productCard.querySelector(".product-name").innerText;
    var productPrice = productCard.querySelector(".product-price").innerText;

    // Call the addToCart function with the product information
    addToCart(productName, productPrice);
  }
});

function addToCart(name, price) {
  //Removing empty cart div
  const emptyCartElement = document.querySelector(".empty-cart");
  if (emptyCartElement) {
    emptyCartElement.remove();
  }

  var cartItemsList = document.getElementById("cartItems");
  var cartItems = cartItemsList.getElementsByClassName("item");
  var flag = true;
  //find if already present in cart
  for (var i = 0; i < cartItems.length; i++) {
    //if found
    if (name == cartItems[i].getElementsByClassName("name")[0].innerText) {
      var itemQuantity =
        cartItems[i].getElementsByClassName("quantity")[0].innerText;
      itemQuantity = itemQuantity - "0" + 1;
      cartItems[i].getElementsByClassName("quantity")[0].innerText =
        itemQuantity;
      flag = false;
    }
  }

  if (flag) {
    //If Not FOund create new div
    var newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
        <div class="name">${name}</div>
        <div class="quantity" contenteditable="true">1</div>
        <div class="price">${price.substring(1, price.length - 3)}</div>
        `;
    cartItemsList.appendChild(newItem);
  }
  //showing toast upon adding
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}

function openCart() {
  var cart = document.getElementById("cartButton");
  var cartItemsList = document.getElementById("cartItems");
  var cartItems = cartItemsList.getElementsByClassName("item");
  cartItems.innerText = "";

  var totalPrice = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var itemQuantity =
      cartItems[i].getElementsByClassName("quantity")[0].innerText;
    var itemPrice = cartItems[i].getElementsByClassName("price")[0].innerText;
    totalPrice += (itemQuantity - "0") * (itemPrice - "0");
  }
  if (cartItems.length == 0) {
    const emptyCart = document.createElement("div");
    emptyCart.classList.add("empty-cart");
    emptyCart.innerHTML = `Your Cart is Empty`;
    cartItemsList.appendChild(emptyCart);
  }
  document.getElementById("totalPriceOfCart").innerHTML = totalPrice;
  cart.click();
}

function placeOrder() {
  // Get the cart items
  var cartItemsList = document.getElementById("cartItems");
  var cartItems = cartItemsList.getElementsByClassName("item");

  // Construct the message with cart items
  var message = "Cart Items:\n";
  var totalPrice = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var itemName = cartItems[i].getElementsByClassName("name")[0].innerText;
    var itemPrice = cartItems[i].getElementsByClassName("price")[0].innerText;
    var itemQuantity =
      cartItems[i].getElementsByClassName("quantity")[0].innerText;
    totalPrice += (itemQuantity - "0") * (itemPrice - "0");
    message +=
      i +
      1 +
      ". " +
      itemName +
      "  " +
      itemQuantity +
      "Kg" +
      " - ₹" +
      itemQuantity * itemPrice +
      "\n";
  }
  message += "Total Price is : ₹ " + totalPrice;

  // WhatsApp number to send the message
  var whatsappNumber = "+917974603337"; // Replace with the actual WhatsApp number

  // Construct the WhatsApp URL
  var whatsappUrl =
    "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

  // Open the WhatsApp URL in a new tab
  window.open(whatsappUrl, "_blank");
}

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}





