(function(){

    var myAppJavaScript = function($){
      console.log("Commerxia jQuery version "+$.fn.jquery);
      console.log("LS", LS);

      var head = document.getElementsByTagName('head')[0];

      // Create new link Element
      var link = document.createElement('link');

      // set the attributes for link element
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://ventacruzada.commerxia.com/javascript/responsiveModal.css';

      // Append link element to HTML head
      head.appendChild(link);

      //Producto
      if (LS.product) {

         //Cacheo ofertas si las hay
         $.get('https://ventacruzada.commerxia.com/ventacruzada/rest/GetOfferPopup?Productid=' + LS.product.id, function(data) {
                 if (data.html) {
                         //Guardo ID de oferta para informar eventos
                         LS.offerId = data.OfferId;
                         window.sessionStorage.setItem('Commerxia-offerId', LS.offerId);

                         //Guardo popup en cache
                         LS.popupCache = data.html;

                         //Limpio flag
                         window.sessionStorage.removeItem('Commerxia-productId');

                         //Cart legacy: Escribo flag en caso de submitear y navegar a pagina de cart
                         window.sessionStorage.setItem('Commerxia-productId', LS.product.id);

                         //Cart modal: muestro al agregar
                         if ($('#modal-cart, #ajax-cart-details, #ajax-cart').length) {
                                 //Escucho el click de submit para mostrar Popup
                                 if ($('#product_form input.js-prod-submit-form').length) {
                                         $('#product_form input.js-prod-submit-form').click(function() {
                                                 LS.showPopup();
                                                 //Registro vista
                                                 LS.registerView(LS.offerId);
                                         });
                                 } else {
                                          if ($('form.js-product-form input.js-prod-submit-form').length) {
                                                 $('form.js-product-form input.js-prod-submit-form').click(function() {
                                                         LS.showPopup();
                                                         //Registro vista
                                                         LS.registerView(LS.offerId);
                                                 });
                                          }
                                 }
                         }
                 }
         });
      }

      //Cart legacy
          if ($('#shoppingCartPage').length && $('#ajax-cart').length == 0) {
                  LS.offerId = window.sessionStorage.getItem('Commerxia-offerId');
          //Chequear flag de open popup. Si existe, levantar popup
                  var productId = window.sessionStorage.getItem('Commerxia-productId');

                  if (productId) {
                          //Abrir popup con sugerencias de inmediato
                          $.get('https://ventacruzada.commerxia.com/ventacruzada/rest/GetOfferPopup?Productid=' + productId, function(data) {
                                  if (data.html) {
                                          LS.popupCache = data.html;
                                          LS.showPopup();
                                          //Registro vista
                                          LS.registerView(LS.offerId)
                                  }
                          });
                  }
      }
    };

        useJquery().then( (jq) => {
                console.log(`I'm using jQuery version ${jq().jquery}`)
                myAppJavaScript(jq);
        });

    LS.addToCartCustom = function(productId, variantId, variantDesc, msgId){

        var form = "<form action><input type='hidden' name='add_to_cart' value='" + productId + "'>";
                if (variantDesc) {
                  const variants = variantDesc.split(" / ");
                  console.log("variants: ", variants);
                  if (variants.length > 1) {
                        for (let i = 0; i < variants.length; i++) {
                          const element = variants[i];
                          form +=
                                "<input type='hidden' name='variation[" +
                                i +
                                "]' value='" +
                                element +
                                "'>";
                        }
                  } else {
                        form +=
                          "<input type='hidden' name='variation[0]' value='" +
                          variantDesc +
                          "'><input type='hidden' name='variant_id' value='" +
                          variantId +
                          "'>";
                  }
                }
        form += "<input type='hidden' name='quantity' value='1'></form>";

        LS.addToCartEnhanced(
                $(form),
                '{{ "Agregar al carrito" | translate }}',
                '{{ "Agregando..." | translate }}',
                '{{ "No hay suficiente stock para agregar este producto al carrito." | translate }}');

        $('#' + msgId).show();
        $('#VerCarrito' + msgId).show();
        $('#RechazarOferta').hide();
        $('#Product' + msgId).hide();
        $('#btn' + msgId).class='ctl-btn.clear';


            //Informar evento ATC al back end
            var offerId = LS.offerId ? LS.offerId : window.sessionStorage.getItem('Commerxia-offerId');
            LS.registerATC(offerId,variantId, function() {
                //Si estoy en cart legacy, refrescar luego de 1 segundo para que se vea el cartel verde
//              if ($('body.template-cart').length) {
//                      setTimeout(function() {
//                              window.location.reload();
//                      },1000);
//              }
                });

                //Guardar en local storage que se agrego la variant al cart
                var addedOfferVariants = JSON.parse(window.localStorage.getItem('Commerxia-addedOfferVariants'));
//          var offerVariant = {"OfferId":offerId,"ProductId":variantId};
            var offerVariant = {"OfferId":offerId,"VarianteId":variantId};
            if (addedOfferVariants) {
                addedOfferVariants.push(offerVariant);
            } else {
                addedOfferVariants = [offerVariant];
            }
            window.localStorage.setItem('Commerxia-addedOfferVariants', JSON.stringify(addedOfferVariants));
        }

    LS.resolveCart = function() {
        if ($('body.template-cart').length) {
            window.sessionStorage.removeItem('Commerxia-productId');
            window.location.reload();
        } else if ($('#modal-cart').length) {
            $('#modal-cart').show().addClass('modal-show');
            $('#modal-cart').prev().show();
            LS.closeCommerxia();
        } else {
            LS.closeCommerxia();
        }
    }

    LS.closeCommerxia = function() {
        $('#commerxia_window').remove();
        //Limpio flag

        window.sessionStorage.removeItem('Commerxia-productId');

        if (isMobile()) {
                $("#ajax-cart-backdrop").hide();
        }
        return false;
    }

    LS.showPopup = function() {
        var html = LS.popupCache;
        if (html) {
                var width = null;
                var id = 'commerxia';
                var caption = 'Commerxia';
//              var w = '<div id="commerxia_window"><div class="modal-backdrop fade in"></div><div class="modal fade in" style=" border-radius: 0!important;  position: fixed!important; top: 10%!important;                z-index: 999999!important; height: auto;             background-color: #fff!important;               border: 1px solid #b5b5b5!important;            border: 1px solid rgba(0, 0, 0, 0.3)!important;    left: auto!important;            display:block; ">' +
                        var w = '<div id="commerxia_window"><div class="modal-backdrop fade in"></div><div class="modal fade in" style=" border-radius: 0!important;  position: fixed!important; top: 10%!important;            z-index: 999999!important; height: auto;             background-color: #fff!important;            border: 1px solid #b5b5b5!important;            border: 1px solid rgba(0, 0, 0, 0.3)!important;    left: 0!important;    right:0!important;        display:block; padding: 0 !important; bottom: auto !important;">' +
//              '<div class="modal-dialog"' + (width ? 'style="width:' + width + 'px"' : '') + '>' +

                        '<div class="modal-dialog" style="width: auto!important; margin: 0 !important;"' + (width ? 'style="width:' + width + 'px"' : '') + '>' +

                '<div class="modal-content" style="width: auto!important; margin: 0 !important; padding: 0 !important"' + (width ? 'style="width:' + width + 'px"' : '') + '>' +
//              '<div class="modal-header" style="padding:0px;">' +
//              '<button type="button" class="close" aria-label="Close" onclick="$(\'#' + id + '_window\').remove()"><i class="fa fa-close"></i></button>' +
//              '</div>' +
                '<div class="modal-body">' +
                '<div id="' + id + '">' + html + '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
                $('body').append(w);
        }
    }


    LS.registerView = function(offerId, callback) {
        LS.registerEvent('V', offerId, null, callback);
    }

    LS.registerATC = function(offerId, productId, callback) {
        LS.registerEvent('A', offerId, productId, callback);
    }

    LS.registerEvent = function(eventId, offerId, variantId, callback) {
        var json = {
                          "OfferEventsOfferId": offerId,
                          "OfferEventsType": eventId,
//                        "OfferEventsProductAddedId": productId ? productId : '',
                          "OfferEventsProductVarianteAddedId": variantId ? variantId : '',

                          "OfferEventsValue":"0"};
        $.ajax({
                  type: "POST",
                  url: 'https://ventacruzada.commerxia.com/ventacruzada/rest/OfferEventWS',
                  data: JSON.stringify(json),
                  success: function(data) {
                          if (callback) {
                                  callback();
                          }
                          console.log('Evento informado (' + eventId + '): ' + data);
                  },
                  contentType: "application/json"
                });
    }

        function isMobile(){
                return (
                        (navigator.userAgent.match(/Android/i)) ||
                        (navigator.userAgent.match(/webOS/i)) ||
                        (navigator.userAgent.match(/iPhone/i)) ||
                        (navigator.userAgent.match(/iPod/i)) ||
                        (navigator.userAgent.match(/iPad/i)) ||
                        (navigator.userAgent.match(/BlackBerry/i))
                );
        }

        LS.cmx_changeVariant = function(msgId) {
                $('#' + msgId).hide();
                $('#VerCarrito' + msgId).hide();
                $('#RechazarOferta').show();
                $('#Product' + msgId).show();
        }

})();
