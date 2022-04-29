//Ensuring page has loaded to allow JS to implement
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
    } else {
      ready()
    }

function ready() {
    //getting remove item function ready
    var removeCartItems = document.getElementsByClassName('btn-danger')
    //iterate through each item within the array/object
    for (var i = 0; i < removeCartItems.length; i++) {
        var button = removeCartItems[i]
        //on click remove cart item 
        button.addEventListener('click', removeCartItem)
    }
    //getting item quantity function ready
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i=0 ; i < quantityInputs.length; i++ ) {        
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //adding items to cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

//expanding menu items
document.querySelectorAll('.section__header').forEach(button => {
    button.addEventListener('click', () => {
        // const buttonContent = button.nextElementSibling;

        button.classList.toggle('section__header--active');

        // if(button.classList.contains('section__header--active')) {
        //     buttonContent.style.maxHeight = buttonContent.scrollHeight + 'px';
        // } else {
        //     buttonContent.style.maxHeight = 0;
        // }
    })
})



//remove Cart Item
function removeCartItem(event) {
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
}

//preventing negative(-) quantities 
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

//addtoCart on Click
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

//addToCart the event
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
           price++
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    //setting inital value to 0
    var total = 0
    //for loop
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        //removing the $ from value to allow for multiplication
        var price = parseFloat(priceElement.innerText.replace('£', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    //Rounding the total to 2s.f
    total = Math.round(total * 100) / 100
    //Adding $ back to show costs
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
}