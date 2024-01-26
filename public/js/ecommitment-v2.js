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
  let infoButton = document.getElementById('ecomm-infoButton');
  let infoClose = document.getElementById('ecomm-infoClose');
  let buttons = document.querySelectorAll('.select-button');
  let total_amount = document.getElementById("ecomm-total-amount")
  //OBTENER INFO DEL SHIPPING Y CALCULAR DISTANCIA Y DEVOLVER EL environmentAmount


  function openModal() {
    var modal = document.getElementById("ecomm-infoModal");
    modal.style.display = "block";

    // Add event listener to close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  function closeModal() {
    var modal = document.getElementById("ecomm-infoModal");
    modal.style.display = "none";
  }


  function showEnvironmentDiv(environmentAmount, text, active_quantity) {

    var newDiv = document.createElement('div');

    // Set the HTML content of the subtotalDiv using innerHTML
    newDiv.innerHTML = `

    <div class="ecomm-container">
    <div class="switch-container">
      <!-- Rounded switch -->
      <div style="display: flex;">
        <div class="ecomm-switch-logo">
          <a href="https://ecommitment-634117e74352.herokuapp.com/" style="cursor:pointer;" target="_blank">
              ${active_quantity > 0 ? `
                <img class="ecomm-logo" src="https://juanseferrari.github.io/ecommitment/public/images/logo_transparente_on.png" alt="">
              ` : `
                <img class="ecomm-logo" src="https://juanseferrari.github.io/ecommitment/public/images/logo_transparente.png" alt="">
                `}
          </a>

        </div>
      </div>
      <div style="display: flex;">
        <div class="info-container">
          <div class="info-icon" id="ecomm-infoButton">
          <svg class="info-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg>
          </div>
        </div>

        <div class="modal" id="ecomm-infoModal">
          <div class="modal-content">
            <span class="close-btn" id="ecomm-infoClose" >&times;</span>
            <div class="ecomm-modal-container">
              <h1 class="modal-main-title">Parque eólico Chubut</h1>
              <div class="modal-main-container">
                <div class="modal-midtext-left">
                  <img src="https://ecommitment-634117e74352.herokuapp.com/images/eolico1.png" alt="">
                </div>

                  <div class="modal-midtext-right">
                    <p>Escalante, Provincia de Chubut, en el sur de Argentina.</p>
                    <a target="_blank" class="modal-link"  href="https://www.google.com.ar/maps/place/45%C2%B040'22.7%22S+67%C2%B048'00.8%22W/@-45.6729722,-67.8008809,19z/data=!3m1!4b1!4m4!3m3!8m2!3d-45.6729722!4d-67.8002222?entry=tts">Ver más</a>
                    <br>
                    <p>El proyecto consiste en la instalación de una central eólica llamada Greenfield que generará reducciones de emisiones de gases de efecto invernadero al desplazar la electricidad que sería producida por centrales eléctricas a base de combustibles fósiles.</p>
                  </div>
              </div>
              <div class="modal-footer">
                <p>Powered by </p>
                <img src="https://ecommitment-634117e74352.herokuapp.com/images/logo_transparente_on.png" alt="">
              </div>
            </div>

          </div>
        </div>



      </div>
      <!-- Description -->
    </div>
    <div class="ecomm-description-container">
      <div class="ecomm-midtext-container">
        <div class="ecomm-midtext-left">
          <p><span>${text}</span></p>
        </div>
        <div class="ecomm-midtext-right">
          <h1 class="ecomm-total-amount" id="ecomm-total-amount">$ ${environmentAmount * 10 * active_quantity}</h1>
        </div>

      </div>
    </div>
    <div class="ecomm-bottom-container">
      <div class="button-container">
        <button class="select-button ${active_quantity === 0 ? 'active' : ''}" data-value="0">0x</button>
        <button class="select-button ${active_quantity === 0.5 ? 'active' : ''}" data-value="0.5">0.5x</button>
        <button class="select-button ${active_quantity === 1 ? 'active' : ''}" data-value="1">1x</button>
        <button class="select-button ${active_quantity === 2 ? 'active' : ''}" data-value="2">2x</button>
        <button class="select-button ${active_quantity === 4 ? 'active' : ''}" data-value="4">4x</button>
      </div>

    </div>
  </div>

        `;


    // Create a style element
    var style = document.createElement('style');

    // Set the CSS rules as text content
    style.textContent = `

    @media only screen and (max-width: 767px) {
      /* Your mobile-specific styles go here */
      .select-button {
        padding: 10px 15px!important;
      }
    
      .modal-midtext-left, .modal-midtext-right  {
        width: 100%!important;
      }
    
      .modal-content {
        max-height: 80vh; /* Set the maximum height, adjust as needed */
        max-width: 90vh;
        overflow-y: auto; /* Enable vertical scroll if content exceeds the height */
      }
    
      .modal-main-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center content vertically */
        text-align: center; /* Center text content */
        width: 100%!important;
      }
    
      .modal-midtext-left img {
        max-width: 100%; /* Make sure images are responsive within the modal */
      }
    }


    .ecomm-container {
      margin: 20px 0;
      border: 1px solid rgba(67,67,67,0.3);
      padding: 10px;
      display: block;
    }
  
    .ecomm-description-container {
      width: 100%;
    }
  
    .ecomm-description-container p {
      font-size: 20px;
    }
  
    .ecomm-description-container span {
      font-weight: bold;
    }
  
    .ecomm-midtext-container {
      display: flex;
      justify-content: space-between;
    }
    .ecomm-midtext-right, .ecomm-midtext-left {
      display: flex;
      align-items: center;
    }
    .ecomm-total-amount {
      white-space: nowrap;
    }
    
    .ecomm-logo {
      height: 34px;
    }
  
    .switch-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 34px;
    }
  
  
    .ecomm-switch-logo {
      height: 34px;
      display: flex;
      align-items: center;
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
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      /* Bootstrap-like box shadow */
  
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
  
    input:checked+.slider {
      background-color: #34a77c;
    }
  
    input:focus+.slider {
      box-shadow: 0 0 1px #2196F3;
    }
  
    input:checked+.slider:before {
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
      background-position: center;
      background-size: cover;
      background-image: url(https://juanseferrari.github.io/ecommitment/public/images/earth.svg);
      background-repeat: no-repeat;
      background-color: rgba(255, 0, 0, 0);
      filter: invert(100%)
        /* Para hacer el mundo negro, lo podemos hacer con esto. */
    }
    
    .info-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    .info-icon {
      color: grey;
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
  
    .info-icon-svg {
      height: 100%;
      width: 100%;
      fill: grey;
      border: 2px grey solid;
      border-radius: 50%;
      padding: 4px;
    }
  
    .info-icon-2 {
      color: grey;
      cursor: pointer;
      height: 20px;
      width: 20px;
      padding-left: 5px;
    }
    .info-icon-svg-2 {
      fill: grey;
      cursor: pointer;
      height: 10px;
      width: 10px;
      border: 2px grey solid;
      border-radius: 50%;
      padding: 3px;
    }
  
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  
    .modal-content {
      border-radius: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease, transform 0.3s ease;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      color: black;
    }
  
    .modal.active {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: all 1s ease;
  
    }
    .modal-link {
      display: flex;
      justify-content: center;
    }
  
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
    }


    /** BUTTON CSS */

.button-container {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin-left: 10%;
}

.select-button {
  padding: 10px 30px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 16px;
  color: black;
}

.select-button.active {
  background-color: #34a77c; /* Change to your desired active color */
  color: #fff; /* Change to your desired text color when active */
}






/** MODAL CONTENT */


.ecomm-modal-container {
  display: block;
}
.modal-main-title {
  text-align: center;
}
.modal-main-container {
  display: flex;
  width: 70vw;
}
.modal-midtext-left {
  width: 50%;
  padding: 10px;
  position: relative;

}

.modal-midtext-left img {
  max-width: 100%;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7), 0 -4px 8px rgba(0, 0, 0, 0.7);

}

.modal-midtext-right {
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
}


.modal-midtext-right p{
  font-size: 20px;
  font-weight: lighter;
}

.modal-footer {
  display: flex;
  justify-content: end;
  align-items: center;
}
.modal-footer img {
  width: 200px;
  margin-left: 5px;
}
.modal-footer p {
  width: 100px;
  display: flex;
  justify-content: end;
}


           `;

    // Append the style element to the document's head
    //background-image: url('https://juanseferrari.github.io/ecommitment/public/images/earth.svg');


    var reviewDiv4 = document.querySelector('.panel.panel-with-header');

    reviewDiv4.insertAdjacentElement('beforebegin', newDiv);



    document.head.appendChild(style);
    infoButton = document.getElementById('ecomm-infoButton');
    infoClose = document.getElementById('ecomm-infoClose');
    buttons = document.querySelectorAll('.select-button');
    total_amount = document.getElementById("ecomm-total-amount")
  } //End function add EnvironmentDivv2

  function addProductToCart(product_id, variant_id, quantity) {
    console.log("addProductToCart")
    if (LS.cart.items) {
      console.log("LSproduct")
      //datos hardocodeados, esto deberia ser dinamico por cada usuario despues. 
      //aplicar la lógica del store_id
      const data = new URLSearchParams();
      data.append('add_to_cart', product_id); //product_id
      data.append('variant_id', variant_id); //variant_id
      data.append('quantity', quantity); //quantity

      console.log("data")
      console.log(data)
      console.log("data")

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
            console.log("response")
            console.log(response)
            console.log("response")

            reloadPageAfterDelay()
          } else {
            console.log('error');
            reloadPageAfterDelay()
          }
        })
        .catch(error => {
          console.error('Error:', error);
          reloadPageAfterDelay()
        });


    }
  }


  async function updateUniqueProductFromCart(pid, vid, quantity) {
    let items_on_cart = LS.cart.items
    console.log("items_on_cart")
    console.log(items_on_cart)
    console.log("items_on_cart")

    var result = items_on_cart.filter(obj => {
      return obj.variant_id == vid
    })
    console.log("result")
    console.log(result)
    console.log("result")
    if (result.length === 1) {

      //Existe un solo SKU
      console.log("EXISTE UN SOLO SKU con variant_id")

      let item_id = result[0].id.toString()
      console.log("item_id")
      console.log(item_id)
      console.log("item_id")

      let body = new URLSearchParams();
      body.append(`quantity[${item_id}]`, quantity.toString());

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
            reloadPageAfterDelay()
          } else {
            console.log("error remove cart");
            console.log(response)
            reloadPageAfterDelay()

          }
        })
        .catch((error) => {
          console.error("Error:", error);
          reloadPageAfterDelay()
        });

    } else if (result.length === 0) {
      addProductToCart(pid, vid, quantity)
    }

  }


  // Wait for 1 second (1000 milliseconds) and then reload the page
  function reloadPageAfterDelay() {
    setTimeout(function () {
      // Reload the page after 1 second1
      window.location.reload();
    }, 200); // 1000 milliseconds = 1 second
    console.log("reloaded")
  }



  //NEW CHATGPT FUNCTION

  async function calculator() {
    console.log("calculator");

    let body_object = {
      "ecommerceId": LS.store.id.toString(),
      "shippingAddress": {
          "city": LS.cart.shippingAddress.city,
          "street": LS.cart.shippingAddress.address,
          "number": parseInt(LS.cart.shippingAddress.number),
          "zipcode": parseInt(LS.cart.shippingAddress.zipcode)
      }
    }
    try {
      console.log("body_object");
      console.log(body_object);
      console.log("body_object");

      const response = await fetch('https://us-central1-ecommitment-qa.cloudfunctions.net/calculator/calculate-bond-fraction', {
        method: 'POST',
        body: JSON.stringify(body_object),
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
      let calculator_response = await calculator();

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

      const response = await fetch('https://ecommitment-634117e74352.herokuapp.com/api/product-data?store_id=' + store_id, {
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

  if (!product_id && !variant_id) {
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


    //Obtener la data de la calculadora
    performCalculation().then((calculation_response) => {
      console.log("calculation_response")
      console.log(calculation_response)
      console.log("calculation_response")

      let message = ""
      let qty = calculation_response.quantity
      console.log("qty: " + qty)

      //Validar si tiene el producto en el carrito. Si no lo tiene, crearlo y refrescar. Si lo tiene, mostrar el div. 
      let bono_exists = false
      let bono_item = {}
      for (let p = 0; p < LS.cart.items.length; p++) {
        if (LS.cart.items[p].variant_id == window.localStorage.getItem('Ecommitment-variant_id')) {
          console.log("variant " + window.localStorage.getItem('Ecommitment-variant_id') + " existe")
          bono_exists = true
          bono_item = LS.cart.items[p]
        }
      }
      console.log("bono_item")
      console.log(bono_item)
      console.log("bono_item")

      if (qty === 0) {
        console.log("cantidad de emisiones: " + qty)
        //Pasar cantidad a 1? 
        qty = 2
      }
      if(qty % 2 !== 0){
        //Sumo 1 en caso que sea impar para que den bien los calculos
        qty = qty + 1
      }
     

      //Validar el address
      if (!LS.cart.shippingAddress.address) {
        //Si no hay address de destino (osea no hay nada que pagar, hacer otra cosa. )
        console.log("NO TIENE ADDRESS")
        message = "¡Compensa el impacto ambiental de tu envío!"
      } else {
        console.log("TIENE ADDRESS")
        message = "¡Compensa el impacto ambiental de tu envío!"
      }

      if (bono_exists) {
        console.log("bono_exists")
        let new_quantity = bono_item.quantity / qty
        showEnvironmentDiv(qty, message, new_quantity)
      } else {
        showEnvironmentDiv(qty, message, 0)
        /**  
        if(qty !== 0){
          addProductToCart(product_id,variant_id,qty)
          reloadPageAfterDelay();
        } else {
          showEnvironmentDiv(qty, calculation_response.distance, calculation_response.co2_emitted, message, 0)
        }
        */
      }

      buttons.forEach(button => {
        button.addEventListener('click', function (e) {
          e.preventDefault()
          buttons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');

          const selectedValue = this.getAttribute('data-value');
          console.log(`Selected value: ${selectedValue}`);
          total_amount.textContent = "$ " + (10 * selectedValue * qty)

          updateUniqueProductFromCart(product_id, variant_id, (qty * selectedValue))
        });
      });


      infoButton.addEventListener('click', function () {
        openModal()
      })
      infoClose.addEventListener('click', function () {
        closeModal()
      })


    })





  } else {
    console.log("start path")

    getProductData(store_id).then((product_data) => {
      console.log("product_data")
      console.log(product_data)
      console.log("product_data")
      window.localStorage.setItem('Ecommitment-product_id', product_data.product_id);
      window.localStorage.setItem('Ecommitment-variant_id', product_data.variant_id);

    });


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