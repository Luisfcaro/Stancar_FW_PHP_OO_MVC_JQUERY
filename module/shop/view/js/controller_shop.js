function ajaxForSearch(url, filter, total_prod = 0, items_page = 3) {
    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filter': filter, 'total_prod': total_prod, 'items_page': items_page })
        .then(function (data) {
            console.log(data);
        $('.map').empty();
        $('#content_shop_cars').empty();
        $('.date_car' && '.date_img').empty();
        $('.glider-prev').hide();
        $('.glider-next').hide();

        
       // Mejora para que cuando no hayan resultados en los filtros aplicados
        if (data == "error") {
            $('.glider-prev').empty();
            $('.glider-next').empty();
            $('<div></div>').appendTo('#content_shop_cars')
                .html(
                    '<h3>¡No se encuentarn resultados con los filtros aplicados!</h3>'
                )
        } else {
            for (row in data) {
                $('<div></div>').attr({ 'id': data[row].numero_bastidor, 'class': 'list_content_shop' }).appendTo('#content_shop_cars')
                    .html(

                        "<div class='polaroid'>" +

                        "<div class='fav-btn list_heart' id='" + data[row].numero_bastidor + "'>" +
                            "<i class='fa fa-heart-o' id='" + data[row].numero_bastidor + "'>" +
                            "</i>" +
                        "</div>" +

                        "<div class='img-container'>" +
                        "<img src= '" + data[row].imagen + "'" + "</img>" +
                        "</div>" +

                        "<div class='container'>" + 

                        "<p>" + data[row].nombre_marca + "</p>" +

                        "<ul>" +
                        "<li> " + data[row].km + " KM" + "</li>" +
                        "<li> " + data[row].nombre_motor + "</li>" +
                        "<li> " + data[row].color + "</li>" +
                        "</ul>" +


                        "<div class='buttons'>" +
                        "<button id='" + data[row].numero_bastidor + "' class='more_info_list button add' >More Info</button>" +
                        "<button class='button custom-btn add_cart' id='"+ data[row].numero_bastidor +"' >Add to cart</button>" +
                        "<span class='button' id='price'>" + data[row].precio + '€' + "</span>" +
                        "</div>" +
                        
                        "</div>" +

                        "</div>"
                    )
            }
            load_likes_user();
            mapBox_all(data);
        }

        }).catch(function (e) {
            $("#containerShop").empty();
            $('<div></div>').appendTo('#containerShop').html('<h1>No hay coches con estos filtros</h1>');
        });
}

function loadCars(total_prod = 0, items_page = 3) {
    var filtro = JSON.parse(localStorage.getItem('filter'));
    var filtro_search = JSON.parse(localStorage.getItem('filter_search'));
    var visita = JSON.parse(localStorage.getItem('Id_visitas'));
    var redirect_like = localStorage.getItem('redirect_like');
    // localStorage.removeItem('Id_Visitas');
   
    // console.log(filtro);

    if (filtro) {
        if (filtro[0][0] == 'default'){
            console.log('default');
            ajaxForSearch("?module=shop&op=list", undefined, total_prod, items_page);
        }else{
            console.log('filtros js');
            ajaxForSearch("?module=shop&op=filters", filtro, total_prod, items_page);
        }
    }else if (filtro_search) {
        // console.log('filtros js search');
        ajaxForSearch("?module=shop&op=filters_search", filtro_search, total_prod, items_page);
    }else if (visita) {
        // console.log('visitas');
        loadDetails(visita[0]);
    }else if (redirect_like) {
        console.log('redirect');
        redirect_login_like();
    }else{
        
        // console.log('all');
        ajaxForSearch("?module=shop&op=list", undefined, total_prod, items_page);
    }
}

function clicks() {
    
    $(document).on("click", ".more_info_list", function() {
         var id_car = this.getAttribute('id');
        //  console.log(id_car);
        loadDetails(id_car);
    });

    $(document).on("click", ".shop", function() {
        localStorage.removeItem('Id_visitas');
        location.reload();
   });


   $(document).on("click", ".pag", function () {
    // console.log('patata');
    var num = this.getAttribute('id');
    total_prod = 3 * (num - 1);
    loadCars(total_prod, 3);
  });


  $(document).on("click", ".list_heart", function() {
    var id_car = this.getAttribute('id');
    // console.log(id_car);
    click_like(id_car, "list_all");
});

$(document).on("click", ".details_heart", function() {
    var id_car = this.getAttribute('id');
    // console.log('heart details');
    click_like(id_car, "details");
});


$(document).on("click", ".add_cart", function() {
    var id_car = this.getAttribute('id');
    add_cart(id_car, "cart");
});

}

function loadDetails(id_car) {
    ajaxPromise(friendlyURL("?module=shop&op=details_carousel"), 'POST', 'JSON', { 'id_car' : id_car })
    .then(function(data) {
        // console.log(data);
        // console.log(data);
        $('.pagination').hide();
        $('.glider-prev').show();
        $('.glider-next').show();
        $('#content_shop_cars').empty();
        $('.date_img_dentro').empty();
        $('.date_car_dentro').empty();
        $('.filters').empty();
        $('.results').empty();
        

        for (row in data[1][0]) {
            $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                .html(
                    "<div class='content-img-details'>" +
                    "<img src= '" + data[1][0][row].imagen + "'" + "</img>" +
                    "</div>"
                )
        }

        $('<div></div>').attr({ 'id': data[0][0].numero_bastidor, class: 'date_car_dentro' }).appendTo('.date_car')
            .html(
                "<div class='list_product_details'>" +
                "<div class='product-info_details'>" +
                "<div class='product-content_details'>" +
                "<h1><b>" + data[0][0].numero_matricula + " " + data[0][0].nombre_marca + "</b></h1>" +
                "<hr class=hr-shop>" +
                "<table id='table-shop'> <tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-road fa-2xl'></i> &nbsp;" + data[0][0].km + "KM" + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp;" + data[0][0].cilindrada + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp;" + data[0][0].nombre_categoria + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0][0].puertas + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp;" + data[0][0].nombre_motor + "</td>" +
                "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0][0].fecha_matriculacion + "</td>  </tr>" +
                "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp;" + data[0][0].color + "</td>" +
                "<td> <i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + data[0][0].city + "</td> </tr>" +
                "</table>" +
                "<hr class=hr-shop>" +
                "<h3><b>" + "More Information:" + "</b></h3>" +
                "<p>This vehicle has a 2-year warranty and reviews during the first 6 months from its acquisition.</p>" +
                "<div class='buttons_details'>" +
                "<button class='button custom-btn add_cart' id='"+ data[0][0].numero_bastidor +"' >+ Cart</button>" +
                "<button class='button buy' href='#'>Buy</button>" +
                "<span class='button' id='price_details'>" + data[0][0].precio + "<i class='fa-solid fa-euro-sign'></i> </span>" +
                "<div class='fav-btn details_heart' id='" + data[0][0].numero_bastidor + "'>" +
                    "<i class='fa fa-heart-o' id='" + data[0][0].numero_bastidor + "'>" +
                    "</i>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
            )
                load_likes_user();
                more_cars_related(data[0][0].cod_categoria);

            new Glider(document.querySelector('.date_img'), {             
                slidesToShow: 5,             
                slidesToScroll: 5,            
                draggable: true,             
                dots: '.dots',            
                arrows: {                 
                    prev: '.glider-prev',                 
                    next: '.glider-next'             
                }         
            });

            mapBox(data[0][0]);

    }).catch(function() {
        window.location.href = "index.php?page=503";
    });
}

function print_filters() {
    $('<div class="div-filters"></div>').appendTo('.filters')
        .html('<select class="filter_type">' +
            '<option value="4">Electrico</option>' +
            '<option value="3">Hibrido</option>' +
            '<option value="1">Diesel</option>' +
            '<option value="2">Gasolina</option>' +
            '</select>' +
            '<select class="filter_category">' +
            '<option value="1">Nuevo</option>' +
            '<option value="2">Seminuevo</option>' +
            '<option value="3">KM0</option>' +
            '<option value="4">Renting</option>' +
            '</select>' +
            '<select class="filter_brand">' +
            '<option value="1">Audi</option>' +
            '<option value="2">BMW</option>' +
            '<option value="3">Wolfsvaguen</option>' +
            '</select>' +
            '<select class="filter_color">' +
            '<option value="Azul">Azul</option>' +
            '<option value="Marron">Marron</option>' +
            '<option value="Negro">Negro</option>' +
            '<option value="Rojo">Rojo</option>' +
            '<option value="Blanco">Blanco</option>' +
            '</select>' +
            '<select class="orden">' +
            '<option value="km">KM</option>' +
            '<option value="precio">Precio</option>' +
            '</select>' +
            '<div id="overlay">' +
            '<div class= "cv-spinner" >' +
            '<span class="spinner"></span>' +
            '</div >' +
            '</div > ' +
            '</div>' +
            '</div>' +
            '<p> </p>' +
            '<button class="filter_button button_spinner" id="Button_filter">Filter</button>' +
            '<button class="filter_remove" id="Remove_filter">Remove</button>');
}

function filter_button() {
    //Filtro type
   
        $('.filter_type').change(function () {
            localStorage.setItem('filter_type', this.value);
        });
        if (localStorage.getItem('filter_type')) {
            $('.filter_type').val(localStorage.getItem('filter_type'));
        }


    //Filtro category

        $('.filter_category').change(function () {
            localStorage.setItem('filter_category', this.value);
        });
        if (localStorage.getItem('filter_category')) {
            $('.filter_category').val(localStorage.getItem('filter_category'));
        }


    //Filtro marca
 
        $('.filter_brand').change(function () {
            localStorage.setItem('filter_brand', this.value);
        });
        if (localStorage.getItem('filter_brand')) {
            $('.filter_brand').val(localStorage.getItem('filter_brand'));
        }


    //Filtro de color

        $('.filter_color').change(function () {
            localStorage.setItem('filter_color', this.value);
        });
        if (localStorage.getItem('filter_color')) {
            $('.filter_color').val(localStorage.getItem('filter_color'));
        }


     //Filtro de orden

        $('.orden').change(function () {
            localStorage.setItem('orden', this.value);
        });
        if (localStorage.getItem('orden')) {
            $('.orden').val(localStorage.getItem('orden'));
        }
  

    $(document).on('click', '.filter_button', function () {
        var filter = [];

        if (localStorage.getItem('filter_type')) {
            filter.push(['cod_motor', localStorage.getItem('filter_type')])
        }
        if (localStorage.getItem('filter_category')) {
            filter.push(['cod_categoria', localStorage.getItem('filter_category')])
        }
        if (localStorage.getItem('filter_brand')) {
            filter.push(['cod_marca', localStorage.getItem('filter_brand')])
        }
        if (localStorage.getItem('filter_color')) {
            filter.push(['color', localStorage.getItem('filter_color')])
        }
        if (localStorage.getItem('orden')) {
            filter.push(['orden', localStorage.getItem('orden')])
        }
        if (!localStorage.getItem('orden') && !localStorage.getItem('filter_color') && !localStorage.getItem('filter_brand') && !localStorage.getItem('filter_category') && !localStorage.getItem('filter_type')) {
            filter.push(['default', 'patata'])
        }

        localStorage.setItem('filter', JSON.stringify(filter));
        localStorage.removeItem('filter_search');

        // if (filter) {
        //     ajaxForSearch("module/shop/controller/controller_shop.php?op=filter", filter);
        // }
        // else {
        //     ajaxForSearch("module/shop/controller/controller_shop.php?op=all_cars");
        // }

        
        location.reload();


        // highlight(filter);


    });
}

function remove_filter() {
    $(document).on('click', '.filter_remove', function () {
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_brand');
        localStorage.removeItem('filter_color');
        localStorage.removeItem('orden');
        localStorage.removeItem('filter');
        localStorage.removeItem('filter_search');

        location.reload();

    });
}

function mapBox_all(data) {
    // console.log(data);
    // console.log('hola mapbox all');
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.61667, 38.83966492354664], // starting position [lng, lat]
        zoom: 11 // starting zoom
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<h3 style="text-align:center;">' + data[row].nombre_marca + '</h3><p style="text-align:center;">Modelo: <b>' + data[row].nombre_categoria + '</b></p>' +
            '<p style="text-align:center;">Precio: <b>' + data[row].precio + '€</b></p>' +
            '<img src=" ' + data[row].imagen + '" style="width: 60px; height: 60px;"/>' +
            '<a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall more_info_list" data-wow-delay=".4s" id="' + data[row].numero_bastidor + '">Read More</a>')
        marker.setPopup(minPopup)
            .setLngLat([data[row].lon, data[row].lat])
            .addTo(map);
    }
}

function mapBox(id) {
    // console.log(id);
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [id.lon, id.lat], // starting position [lng, lat]
        zoom: 14 // starting zoom
    });
    const markerOntinyent = new mapboxgl.Marker()
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML('<h4>' + id.nombre_marca + '</h4><p>Modelo: ' + id.nombre_categoria + '</p>' +
        '<p>Precio: ' + id.precio + '€</p>' +
        '<img src=" ' + id.imagen + '" style="width: 100px; height: 100px;"/>')
    markerOntinyent.setPopup(minPopup)
        .setLngLat([id.lon, id.lat])
        .addTo(map);
}

function cars_related(loadeds = 0, category_car, total_items) {
    let items = 3;
    let loaded = loadeds;
    let type = category_car;
    let total_item = total_items;

    ajaxPromise(friendlyURL('?module=shop&op=cars_related'), 'POST', 'JSON', { 'type': type, 'loaded': loaded, 'items': items })
        .then(function(data) {
            // console.log(data);
            if (loaded == 0) {
                $('<div></div>').attr({ 'id': 'title_content', class: 'title_content' }).appendTo('.results')
                    .html(
                        '<h2 class="cat">Cars related</h2>'
                    )
                for (row in data) {
                    if (data[row].numero_bastidor != undefined) {
                        $('<div></div>').attr({ 'id': data[row].numero_bastidor, 'class': 'more_info_list' }).appendTo('.title_content')
                            .html(
                                "<li class='portfolio-item'>" +
                                "<div class='item-main'>" +
                                "<div class='portfolio-image'>" +
                                "<img src = " + data[row].imagen + " alt='imagen car' </img> " +
                                "</div>" +
                                "<h5>" + data[row].nombre_marca + "  " + data[row].cilindrada + "</h5>" +
                                "</div>" +
                                "</li>"
                            )
                    }
                }
                $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                    .html(
                        '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                    )
            }
            if (loaded >= 3) {
                for (row in data) {
                    if (data[row].numero_bastidor != undefined) {
                        console.log(data);
                        $('<div></div>').attr({ 'id': data[row].numero_bastidor, 'class': 'more_info_list' }).appendTo('.title_content')
                            .html(
                                "<li class='portfolio-item'>" +
                                "<div class='item-main'>" +
                                "<div class='portfolio-image'>" +
                                "<img src = " + data[row].imagen + " alt='imagen car' </img> " +
                                "</div>" +
                                "<h5>" + data[row].nombre_marca + "  " + data[row].cilindrada + "</h5>" +
                                "</div>" +
                                "</li>"

                            )
                    }
                }
                var total_cars = total_item - 3;
                if (total_cars <= loaded) {
                    $('.more_car__button').empty();
                    $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                        .html(
                            "</br><button class='btn-notexist' id='btn-notexist'></button>"
                        )
                } else {
                    $('.more_car__button').empty();
                    $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
        }).catch(function() {
            console.log("error cars_related");
        });
}

function more_cars_related(category_car) {
    // var category_car = category_car;
    
    var items = 0;
    ajaxPromise(friendlyURL('?module=shop&op=count_related'), 'POST', 'JSON', { 'category_car': category_car })
        .then(function(data) {
            // console.log(data);
            var total_items = data[0].n_prod;
            cars_related(0, category_car, total_items);
            $(document).on("click", '.load_more_button', function() {
                items = items + 3;
                $('.more_car__button').empty();
                cars_related(items, category_car, total_items);
            });
        }).catch(function() {
            console.log('error total_items');
        });
}

function pagination(){
    var filters_search = JSON.parse(localStorage.getItem('filter_search'));
    var filtros = JSON.parse(localStorage.getItem('filter'));
    // console.log(filtros);
    if (filters_search) {
        // console.log('tenemos search');
        var url = "?module=shop&op=count_filters_search";
    } else if (filtros) {
        if (filtros[0][0] == 'default'){
        var url = "?module=shop&op=count";
        } else {
        var url = "?module=shop&op=count_filters"; 
        }
    } else {
        var url = "?module=shop&op=count";
    }
    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filtros': filtros, 'filters_search': filters_search })
        .then(function(data) {

            // console.log(data);
            var total_prod = data[0].contador;

            if (total_prod >= 3) {
                total_pages = Math.ceil(total_prod / 3)
            } else {
                total_pages = 1;
            }


            for (i=1; i<=total_pages; i++) {
                $('<div></div>').attr({ 'class': 'botones' }).appendTo('.pagination')
                .html(
                    "<button id='" + i + "' class='pag button' >"+ i + "</button>" 
                )
            }

        })
}

function click_like(id_car, lugar) {
    var token = localStorage.getItem('heidi');
    // console.log(token);
    if (token) {
        ajaxPromise(friendlyURL('?module=shop&op=control_likes'), 'POST', 'JSON', { 'num_bas': id_car, 'token': token })
            .then(function(data) {
                // console.log(data);
                if(data == 'like'){
                    $("#" + id_car + ".fa").addClass('fa-heart');
                    $("#" + id_car + ".fa").removeClass('fa-heart-o');
                }else{
                    $("#" + id_car + ".fa").addClass('fa-heart-o');
                    $("#" + id_car + ".fa").removeClass('fa-heart');
                }
                
            }).catch(function() {
                window.location.href = "index.php?module=controller_exceptions&op=503&type=503&lugar=Function click_like SHOP";
                // console.log('fallo');
            });

    } else {
        // console.log('no has iniciado sesion');
        const redirect = [];
        redirect.push(id_car, lugar);

        localStorage.setItem('redirect_like', redirect);
        localStorage.setItem('id_car', id_car);

        toastr.warning("Debes de iniciar session");
        setTimeout(' window.location.href = friendlyURL("?module=login&op=view_login"); ', 1000);
    }
}

function load_likes_user() {
    var token = localStorage.getItem('heidi');
    // console.log('cargando los likes del usuario');
    if (token) {
        ajaxPromise(friendlyURL('?module=shop&op=load_likes'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                // console.log(data);
                for (row in data) {
                    $("#" + data[row].id_car + ".fa").addClass('fa-heart');
                    $("#" + data[row].id_car + ".fa").removeClass('fa-heart-o');
                }
            }).catch(function() {
                window.location.href = "index.php?module=controller_exceptions&op=503&type=503&lugar=Function load_like_user SHOP";
                // console.log('fallo load');
            });
    }
}

function redirect_login_like() {
    var id_car = localStorage.getItem('id_car');
    var token = localStorage.getItem('heidi');
    var redirect = localStorage.getItem('redirect_like').split(",");

    // console.log('redirect like funcion');

    ajaxPromise(friendlyURL('?module=shop&op=control_likes'), 'POST', 'JSON', { 'num_bas': id_car, 'token': token })
    .then(function(data) {
        // console.log(data);
        if(data == 'like'){
            $("#" + id_car + ".fa").addClass('fa-heart');
            $("#" + id_car + ".fa").removeClass('fa-heart-o');
        }else{
            $("#" + id_car + ".fa").addClass('fa-heart-o');
            $("#" + id_car + ".fa").removeClass('fa-heart');
        }
        
    }).catch(function() {
        window.location.href = "index.php?module=controller_exceptions&op=503&type=503&lugar=Function click_like SHOP";
        // console.log('fallo');
    });

    if (redirect[1] == "details") {
        loadDetails(redirect[0]);
        localStorage.removeItem('redirect_like');
        localStorage.removeItem('id_car');
    } else if (redirect[1] == "list_all") {
        localStorage.removeItem('redirect_like');
        localStorage.removeItem('id_car');
        // console.log('patata');
        location.reload();
    }
  
}

function add_cart(id_car, lugar){
    // console.log('patata');
    var token = localStorage.getItem('heidi');
    if(token){
        ajaxPromise(friendlyURL('?module=cart&op=insert_cart'), 'POST', 'JSON', { 'num_bas': id_car, 'token': token })
        .then(function(data) { 
            console.log(data);
            //toastr
        }).catch(function() {
            window.location.href = 'index.php?page=error503'
        });  
    }else{

        const redirect = [];
        redirect.push(id_car, lugar);

        localStorage.setItem('redirect_like', redirect);
        localStorage.setItem('id_car', id_car);

        toastr.warning("Debes de iniciar session");
        setTimeout(' window.location.href = friendlyURL("?module=login&op=view_login"); ', 1000);
    }
}

$(document).ready(function() {
    // friendlyURL("?module=home&op=type")
    // console.log('hola js');
    loadCars();
    clicks();
    remove_filter();
    print_filters();
    filter_button();
    pagination();
});
