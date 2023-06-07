function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "http://localhost/STANCAR_FW_PHP_OO_MVC_JQUERY" + link;
}

function load_menu() {

    $('.navbar-nav').append(
        '<li class="nav-item"><a href="'+friendlyURL("?module=home") + '" class="nav-link">Home</a></li>' +
        '<li class="nav-item"><a href="'+friendlyURL("?module=shop") + '" class="nav-link">Shop</a></li>' +
        '<li class="nav-item"><a href="'+friendlyURL("?module=contact") + '" class="nav-link">Contactanos</a></li>' +
        '<li class="nav-item login_section"><a href="'+friendlyURL("?module=login&op=view_login") + '" class="nav-link">Login</a></li>' +
        '<li class="nav-item register_section"><a href="'+friendlyURL("?module=login&op=view_register") + '" class="nav-link">Register</a></li>' +
        '<li class="nav-item carrito"><a href="'+friendlyURL("?module=cart") + '" class="nav-link"> <i class="gg-shopping-cart nav-link"></i> </a></li>'
     );
    // console.log('soy una patata util');
    var token = localStorage.getItem('heidi');
    // console.log(token);
    if (token) {
        ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log(data);
                // if (data.type_user == "client") {
                //     console.log("Client loged");
                //     $('.opc_CRUD').empty();
                //     $('.opc_exceptions').empty();
                // } else {
                //     console.log("Admin loged");
                //     $('.opc_CRUD').show();
                //     $('.opc_exceptions').show();
                // }

                $('.login_section').hide();
                $('.register_section').hide();
                $('.carrito').show();
                $('<img src="' + data[0].avatar + '"alt="Robot">').appendTo('.log-icon');
                $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#drop_dwn_inf_user')
                    .html(
                        '<a class="dropdown-item username">' + data[0].username + '<a/>' +
                        '<a class="dropdown-item href="#" id="logout_btn">Logout</a>'
                        

                    )

            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.login_section').show();
        $('.register_section').show();
        $('.container_user').hide();
        $('.carrito').hide();
    }
}



//================CLICK-LOGIUT================
function click_logout() {
    $(document).on('click', '#logout_btn', function() {
        setTimeout('logout(); ', 1000);
    });
}

//================LOG-OUT================
function logout() {
    ajaxPromise(friendlyURL('?module=login&op=logout'), 'POST', 'JSON')
        .then(function(data) {
            console.log(data);
            localStorage.removeItem('heidi');
            window.location.href = friendlyURL('?module=shop');
        }).catch(function() {
            console.log('Something has occured');
        });
}



$(document).ready(function() {
    // console.log('utils activos');
    load_menu();
    click_logout();
});