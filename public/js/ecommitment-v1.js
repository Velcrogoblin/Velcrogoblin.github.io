(function () {
  //GLOBALS
  const store_id = LS.store.id;

  function showEnvironmentDiv() {
    var newDiv = document.createElement("div");

    // Set the HTML content of the subtotalDiv using innerHTML
    newDiv.innerHTML = `
    <div class="ecomm-container">
    HOLA
    </div>
        `;

    // Create a style element
    var style = document.createElement("style");

    // Set the CSS rules as text content
    style.textContent = `
    .ecomm-container {
      width: 100px;
      height: 70px;
      background-color: blue;
      border: none;
      border-radius: 7px;
    }
     `;

    var reviewDiv4 = document.querySelector(".panel.panel-with-header");

    reviewDiv4.insertAdjacentElement("beforebegin", newDiv);

    document.head.appendChild(style);
  }
  showEnvironmentDiv();
})();
