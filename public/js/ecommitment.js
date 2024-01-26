(function () {

  //GLOBALS
  const store_id = LS.store.id
  const product_id = window.localStorage.getItem('Ecommitment-product_id');
  const variant_id = window.localStorage.getItem('Ecommitment-variant_id');

  console.log("store_id: " + store_id)
  console.log("product_id: " + product_id)
  console.log("variant_id: " + variant_id)

  //FLUJOS DENTRO DEL JAVASCRIPT

  //VALIDAR QUE EL BONO AMBIENTAL EXISTA EN PRODUCTOS. SI NO EXISTE, CREAR EL PRODUCTO. SINO DEVOLVER ESE DATO

  //ESTO SE PUEDE HACER EN EL PASO ANTERIOR AL CHECKOUT. 

  //MOSTRAR EL BONO AMBIENTAL EN ESE CHECKOUT (EL BONO AMBIENTAL PUEDE SER UNA IMAGEN O MEJORA DEL CHECKOUT)

  



  // Your JavaScript
  let switchCheckbox = document.getElementById('mySwitch');

  //OBTENER INFO DEL SHIPPING Y CALCULAR DISTANCIA Y DEVOLVER EL environmentAmount



  function showEnvironmentDiv(environmentAmount) {
    // Get the div element with class "table-subtotal"
    var subtotalDiv = document.querySelector('.table-subtotal');
    var newDiv = document.createElement('div');

    // Set the HTML content of the subtotalDiv using innerHTML
    newDiv.innerHTML = `
           <div class="switch-container">
           <!-- Rounded switch -->
           <div>
            <label class="switch">
                <input type="checkbox" id="mySwitch">
                <span class="slider round"></span>
            </label>
           </div>
           <!-- Description -->
           <div class="switch-description">Bono ambiental</div>
           <div class="switch-amount">$${environmentAmount}</div>
           
           </div>
        `;

    subtotalDiv.appendChild(newDiv);



    // Set the height of the parent div to 20px
    //subtotalDiv.style.height = '20px';

    // Create a style element
    var style = document.createElement('style');

    // Set the CSS rules as text content
    style.textContent = `
            .switch-container {
                display: flex;
                justify-content: space-between;
            }
            .switch-description {
                display: flex;
                align-items: center;
                padding-left: 10px;
            }
            .switch-amount {
                display: flex;
                align-items: center;
            }
           /* The switch - the box around the slider */
           .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            transition: background-color 0.4s;
           }
           
           /* Hide default HTML checkbox */
           .switch input {
            opacity: 0;
            width: 0;
            height: 0;
           }
           
           /* The slider */
           .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
           .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s; 
          }
           
           input:checked + .slider {
            background-color: #34a77c;
           }
           
           input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
           }
           
           input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
           }
           
           /* Rounded sliders */
           .slider.round {
            border-radius: 34px;
           }
           
           .slider.round:before {
            border-radius: 50%;
             }
           `;

    // Append the style element to the document's head
    //background-image: url('https://juanseferrari.github.io/ecommitment/public/images/earth.svg');

    document.head.appendChild(style);
    switchCheckbox = document.getElementById('mySwitch');
  } //End function add EnvironmentDiv

  function showEnvironmentDivv2(environmentAmount) {
    // Get the div element with class "table-subtotal"
    var reviewDiv = document.querySelector('.review-block-detailed');

    var newDiv = document.createElement('div');

    // Set the HTML content of the subtotalDiv using innerHTML
    newDiv.innerHTML = `
           <div class="switch-container">
           <!-- Rounded switch -->
           <div>
            <label class="switch">
                <input type="checkbox" id="mySwitch">
                <span class="slider round"></span>
            </label>
           </div>
           <!-- Description -->
           <div class="switch-description">Bono ambiental</div>
           <div class="switch-amount">$${environmentAmount}</div>
           
           </div>
        `;

    reviewDiv.insertAdjacentElement('afterend', newDiv);




    // Set the height of the parent div to 20px
    //subtotalDiv.style.height = '20px';

    // Create a style element
    var style = document.createElement('style');

    // Set the CSS rules as text content
    style.textContent = `
            .switch-container {
                display: flex;
                justify-content: space-between;
            }
            .switch-description {
                display: flex;
                align-items: center;
                padding-left: 10px;
            }
            .switch-amount {
                display: flex;
                align-items: center;
            }
           /* The switch - the box around the slider */
           .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            transition: background-color 0.4s;
           }
           
           /* Hide default HTML checkbox */
           .switch input {
            opacity: 0;
            width: 0;
            height: 0;
           }
           
           /* The slider */
           .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
           .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s; 
          }
           
           input:checked + .slider {
            background-color: #34a77c;
           }
           
           input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
           }
           
           input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
           }
           
           /* Rounded sliders */
           .slider.round {
            border-radius: 34px;
           }
           
           .slider.round:before {
            border-radius: 50%;
             }
           `;

    // Append the style element to the document's head
    //background-image: url('https://juanseferrari.github.io/ecommitment/public/images/earth.svg');

    document.head.appendChild(style);
    switchCheckbox = document.getElementById('mySwitch');
  } //End function add EnvironmentDivv2

  //showEnvironmentDivv2(12)

  function addProductToCart(product_id,variant_id,quantity) {
    console.log("addProductToCart")
    if (LS.cart.items) {
      console.log("LSproduct")
      //datos hardocodeados, esto deberia ser dinamico por cada usuario despues. 
      //aplicar la lógica del store_id
      const data = new URLSearchParams();
      data.append('add_to_cart', product_id); //product_id
      data.append('variant_id', variant_id); //variant_id
      data.append('quantity', quantity); //quantity

      fetch('/comprar/', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          if (response.ok) {
            console.log('success');
          } else {
            console.log('error');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });


    }
  }


  async function removeUniqueProductFromCart() {
    let items_on_cart = LS.cart.items
    console.log("items_on_cart")
    console.log(items_on_cart)
    console.log("items_on_cart")

    var result = items_on_cart.filter(obj => {
      return obj.sku === "BSG1234A"
    })
    console.log("result")
    console.log(result)
    console.log("result")
    if (result.length === 1) {

      //Existe un solo SKU
      console.log("EXISTE UN SOLO SKU ")

      let item_id = result[0].id.toString()
      console.log("item_id")
      console.log(item_id)
      console.log("item_id")

      let body = new URLSearchParams();
      body.append(`quantity[${item_id}]`, "0");

      console.log("Request Body:", body.toString());


      await fetch("/cart/update/", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("success remove cart");
            console.log(response)
          } else {
            console.log("error remove cart");
            console.log(response)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    }


  }


  // Wait for 1 second (1000 milliseconds) and then reload the page
  function reloadPageAfterDelay() {
    setTimeout(function () {
      // Reload the page after 1 second1
      window.location.reload();
    }, 200); // 1000 milliseconds = 1 second
    switchCheckbox.checked = true;
    console.log("checked")
  }



  //NEW CHATGPT FUNCTION

  async function calculator(cart_data, store_data) {
    console.log("calculator");

    try {
      console.log(cart_data);
      console.log(store_data);

      let body = JSON.stringify({
        cart: cart_data,
        store: store_data
      });

      const response = await fetch('https://ecommitment-634117e74352.herokuapp.com/api/calculator', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return null;
      }

      const data = await response.json();

      // Log the calculator_response within the async function
      console.log('Parsed JSON data:', data);

      // If you need to return the data from this function, you can do so here
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async function performCalculation() {

    try {
      let calculator_response = await calculator(LS.cart, LS.store);

      return calculator_response;
    } catch (error) {
      console.error('Error during calculation:', error);
      return null;
    }
  }

  async function getProductData(store_id) {
    console.log("getProductData");

    try {
      console.log(store_id);

      const response = await fetch('https://ecommitment-634117e74352.herokuapp.com/api/product-data?store_id='+store_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return null;
      }

      const data = await response.json();

      // Log the calculator_response within the async function
      console.log('Parsed product JSON data:', data);

      // If you need to return the data from this function, you can do so here
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }


  //Check pathname
  console.log(window.location.pathname)

  if(!product_id && !variant_id){
    //get info of product
    getProductData(store_id).then((product_data) => {
      console.log("product_data")
      console.log(product_data)
      console.log("product_data")
      window.localStorage.setItem('Ecommitment-product_id', product_data.product_id);
      window.localStorage.setItem('Ecommitment-variant_id', product_data.variant_id);

    });
  }

  // Check the current URL path
  if (window.location.pathname.startsWith('/checkout/v3/next/')) {
    console.log("next path")

    //Chequear si tiene el producto cargado como bono ambiental.


    //Obtener la data de la calculadora
    performCalculation().then((calculation_response) => {
      console.log("calculation_response")
      console.log(calculation_response)
      console.log("calculation_response")

      if(!LS.cart.shippingAddress.address){
        //Si no hay address de destino (osea no hay nada que pagar, hacer otra cosa. )
        return true
      }

      showEnvironmentDiv(calculation_response.quantity)

      for (let p = 0; p < LS.cart.items.length; p++) {
        if (LS.cart.items[p].variant_id == window.localStorage.getItem('Ecommitment-variant_id')) {
          console.log("variant " + window.localStorage.getItem('Ecommitment-variant_id') + " existe")
          switchCheckbox.checked = true;
        }
      }

      // Check the state of the switch when it is clicked
      switchCheckbox.addEventListener('change', function () {
        if (switchCheckbox.checked) {
          console.log('Switch is ON');
          //Add product to cart for the amount given. 
          addProductToCart(product_id,variant_id,calculation_response.quantity)

          // Call the function to initiate the delay and page reload
          reloadPageAfterDelay();

        } else {
          //REMOVE PRODUCT. 
          console.log('Switch is OFF');
          //Remove product from cart for the amount given. 
          removeUniqueProductFromCart()

          console.log("log after remove product")

          // Call the function to initiate the delay and page reload
          reloadPageAfterDelay();

        }
      });

    })





  } else {
    console.log("start path")




  }

  console.log("LS")
  console.log(LS)
  console.log("LS")
  console.log("CART ITEMS")
  console.log(LS.cart.items)
  console.log("CART ITEMS")
  console.log("CART SHIPPING ADDRESS")
  console.log(LS.cart.shippingAddress)
  console.log("CART SHIPPING ADDRESS")
  console.log("CART SUBTOTAL")
  console.log(LS.cart.subtotal)
  console.log("CART SUBTOTAL")
  console.log("CART CONTACT")
  console.log(LS.cart.contact)
  console.log("CART CONTACT")
})();