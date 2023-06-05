function load_cart(){
    var token = localStorage.getItem('heidi');
    if(token){
        ajaxPromise("module/cart/controller/controller_cart.php?op=load_cart", 'POST', 'JSON', { 'token': token })
        .then(function(data) { 
            console.log(data);
            var total_price = 0;
            for (row in data) {
                $(".cart__products").append(
                    '<div class="basket-product" id="'+ data[row].numero_bastidor +'"><div class="item"><div class="product-image">'+
                    '<img src="'+ data[row].imagen +'" alt="Placholder Image 2" class="product-frame"></div>'+
                    '<div class="product-details"><h1 class="title__cart"><strong><span class="item-quantity">1</span></strong> '+ data[row].numero_matricula +'</h1>'+
                    '<p class="par"><strong>Navy, Size 10</strong></p><p class="par">Product Code - '+ data[row].numero_bastidor +'</p></div></div>'+
                    '<div class="price">' + data[row].precio + '</div><div class="quantity"><input id="'+ data[row].numero_bastidor +'" type="number" value="' + data[row].qty + '" min="1" max="' + data[row].stock + '" class="quantity-field"></div>'+
                    '<div id="'+ data[row].codigo_producto +'" class="subtotal">' + (data[row].precio)*(data[row].qty) + '</div><div class="remove"><button class="button__remove" id="'+ data[row].numero_bastidor +'">Remove</button></div></div></div>'
                )   
                var total_price = total_price + (data[row].precio)*(data[row].qty);
            }    
            $(".subtotal-value").append(total_price);
            $(".total-value").append(total_price);
        }).catch(function() {
            window.location.href = 'index.php?page=error503'
        }); 
    }else{

        // setTimeout(' window.location.href = "index.php?page=controller_login&op=login_view"; ',1000);
        console.log('fallo al cargar el carrito');
    }
}

function remove_cart(){
    $(document).on('click','.button__remove',function () {
        var id_car = this.getAttribute('id');
        var token = localStorage.getItem('heidi');
        if(token){
            ajaxPromise("module/cart/controller/controller_cart.php?op=delete_cart", 'POST', 'JSON', { 'token': token, 'num_bas': id_car })
            .then(function(data) { 
                console.log(data);
                $('div.basket-product#'+ id_car).empty();
            }).catch(function() {
                window.location.href = 'index.php?page=error503'
            });   
        }else{
            // setTimeout(' window.location.href = "index.php?page=controller_login&op=login_view"; ',1000);
            console.log('fallo al eliminar el articulo del carrito');
        }
    });
}

function change_qty(){
    $(document).on('input','.quantity-field',function () {
        // console.log('cambiaste cantidad');
        var token = localStorage.getItem('heidi');
        var id_car =  this.getAttribute('id');
        var qty = $("#" + id_car + ".quantity-field").val();
        // console.log(id_car);
        // console.log(qty);
        if(token){
            ajaxPromise("module/cart/controller/controller_cart.php?op=update_qty", 'POST', 'JSON', { 'token': token, 'num_bas': id_car, 'cantidad': qty })
            .then(function(data) { 
                // console.log(data);
                location.reload();
            }).catch(function() {
                window.location.href = 'index.php?page=error503';
            }); 
        }else{            
            // setTimeout(' window.location.href = "index.php?page=controller_login&op=login_view"; ',1000);
            console.log('fallo al actualizar la cantidad');
        }
    });
}

function checkout(){
    $(document).on('click','.checkout-cta',function () {
        var token = localStorage.getItem('heidi');
        if(token){
            ajaxPromise("module/cart/controller/controller_cart.php?op=checkout", 'POST', 'JSON', { 'token': token })
            .then(function(data) { 
                // console.log(data);
                toastr.success("Checkout Existoso");
                setTimeout(' window.location.href = "index.php?page=controller_shop&op=list"; ',1000);
            }).catch(function() {
                window.location.href = 'index.php?page=error503';
            });   

            
        }else{
            // setTimeout(' window.location.href = "index.php?page=controller_login&op=login_view"; ',1000);
            
            console.log('Fallo en el checkout');
        }
    });
}

$(document).ready(function(){
    // console.log('hola controller cart');
    load_cart();
    remove_cart();
    change_qty();
    checkout();
});