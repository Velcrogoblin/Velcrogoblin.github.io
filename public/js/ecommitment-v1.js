(async function () {
  //GLOBALS
  const storeId = LS.store.id;

  //JAVASCRIPT
  const getProductQuantity = async () => {
    let body_object = {
      "ecommerceId": storeId.toString(),
      "shippingAddress": {
          "city": LS.cart.shippingAddress.city,
          "street": LS.cart.shippingAddress.address,
          "number": parseInt(LS.cart.shippingAddress.number),
          "zipcode": parseInt(LS.cart.shippingAddress.zipcode)
      }
    }
    try {

      const response = await fetch('http://localhost:5001/ecommitment-qa/us-central1/calculator/calculate-bond-fraction', {
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

      console.log("me llega esta data como product quantity", data, "y esto es un string de relleno");
      console.log("esta es solo la quantity de la respuesta", data.fractionQuantity.quantity);

      return data.fractionQuantity.quantity;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  
  const showEnvironmentDiv = (quantity, text, price) => {
    var newDiv = document.createElement("div");

   newDiv.innerHTML = `
    <div class="ecomm-container">
    <div class="title-container">
      <!-- Rounded switch -->
        <a href="https://www.ecommitment.online" target="_blank">
          <img class="ecomm-logo" src="https://juanseferrari.github.io/ecommitment/public/images/logo_transparente_blanco.png" alt="">
        </a>
      <div style="display: flex;" class="ecomm-amount">
        <p>$ ${quantity * price}</p>

      </div>
      <!-- Description -->
    </div>
    <div class="ecomm-description-container">
      <div class="ecomm-main-text">
        <p>
          <span>${text}</span>
        </p>
      </div>
      <div class="ecomm-toggle-button">
          <label class="switch">
            <input type="checkbox" id="ecomm-mainSwitch">
            <span class="slider round">
            </span>
          </label>
      </div>

    </div>
      <div class="info-container">
        <div class="info-icon" id="ecomm-infoButton">
        <!-- 
          <svg class="info-icon-svg" xmlns="http://www.w3.org/2000/svg" height="16" width="16"
            viewBox="0 0 512 512">
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg> -->
          <svg class="info-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/></svg>
        </div>
      </div>

      <div class="modal" id="ecomm-infoModal">
      <div class="modal-content">
        <span class="close-btn" id="ecomm-infoClose">&times;</span>
        <div class="ecomm-modal-container">
          <h1 class="modal-main-title">Parque eólico Chubut</h1>
          <div class="modal-main-container">
            <div class="modal-midtext-left">
              <img src="https://ecommitment-634117e74352.herokuapp.com/images/eolico1.png" alt="">
            </div>

              <div class="modal-midtext-right">
                <p>Escalante, Provincia de Chubut, en el sur de Argentina.</p>
                <p>El proyecto consiste en la instalación de una central eólica llamada Greenfield que generará reducciones de emisiones de gases de efecto invernadero al desplazar la electricidad que sería producida por centrales eléctricas a base de combustibles fósiles.<a class="see_more" target="_blank" class="modal-link"  href="https://www.ecommitment.online">Ver más</a>
                </p>
              </div>
          </div>
          <div class="modal-footer">
            <p>Powered by </p>
            <a href="https://www.ecommitment.online" target="_blank">
              <img src="https://ecommitment-634117e74352.herokuapp.com/images/logo_transparente_on.png" alt="">
            </a> 
          </div>
        </div>
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
    .ecomm-main-text {
      padding-right: 10px;
    }
    .see_more {
      color: blue;
      font-size: 20px;
    }
    .see_more:hover {
      color: blue;
    }
  
    .ecomm-description-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    .ecomm-description-container p {
      font-size: 20px;
    }
  
    .ecomm-logo {
      height: 34px;
    }
  
    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 34px;
    }
    .title-container a {
      cursor: pointer;
    }
    .ecomm-amount p{
      font-size: 24px;
      margin: 0;
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
  
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
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
  width: 25%;
  padding: 10px;
  position: relative;

}

.modal-midtext-left img {
  max-width: 100%;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7), 0 -4px 8px rgba(0, 0, 0, 0.7);

}

.modal-midtext-right {
  width: 75%;
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
.modal-link {
  display: flex;
  justify-content: center;
}


           `;

    var reviewDiv4 = document.querySelector(".panel.panel-with-header");

    reviewDiv4.insertAdjacentElement("beforebegin", newDiv);

    document.head.appendChild(style);
   
  }

  
  const productQuantity = await getProductQuantity();

  console.log(` este es el product quantity: ${productQuantity}`);
  
  showEnvironmentDiv(productQuantity, "aporta al medioambiente!", 4);

  let infoButton = document.getElementById('ecomm-infoButton');
  let infoClose = document.getElementById('ecomm-infoClose');

  function closeModal() {
    var modal = document.getElementById("ecomm-infoModal");
    modal.style.display = "none";
  }

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

 


  infoButton.addEventListener('click', function () {
    openModal()
  });

  infoClose.addEventListener('click', function () {
    closeModal()
  });

})();
