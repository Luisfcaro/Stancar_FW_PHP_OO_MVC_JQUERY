function load_marcas() {
        ajaxPromise(friendlyURL('?module=search&op=car_marca'), 'POST', 'JSON')
        .then(function (data) {
            $('<option>Marca</option>').attr('selected', true).attr('disabled', true).appendTo('.search_marca')
            for (row in data) {
                $('<option value="' + data[row].cod_marca + '">' + data[row].nombre_marca + '</option>').appendTo('.search_marca')
            }
        }).catch(function () {
            window.location.href = "index.php?page=503";
        });
}

function load_categorias(marca) {
    $('.search_categoria').empty();

    if (marca === undefined) {

        ajaxPromise(friendlyURL('?module=search&op=car_categoria'), 'POST', 'JSON' , { 'marca' : marca })
        .then(function (data) {
            $('<option>Categoria</option>').attr('selected', true).attr('disabled', true).appendTo('.search_categoria')
            for (row in data) {
                $('<option value="' + data[row].cod_categoria + '">' + data[row].nombre_categoria + '</option>').appendTo('.search_categoria')
            }
        }).catch(function () {
            window.location.href = "index.php?page=503";
        });
    } else {

        ajaxPromise(friendlyURL('?module=search&op=car_categoria'), 'POST', 'JSON', marca)
        .then(function (data) {
            for (row in data) {
                $('<option value="' + data[row].cod_categoria + '">' + data[row].nombre_categoria + '</option>').appendTo('.search_categoria')
            }
        }).catch(function () {
            window.location.href = "index.php?page=503";
        });
    }
}

function launch_search() {
    load_marcas();
    load_categorias();
    $(document).on('change', '.search_marca', function () {
        let marca = $(this).val();
        if (marca === 0) {
            load_categorias();
        } else {
            load_categorias({ marca });
        }
    });
}

function autocomplete() {
    $("#autocom").on("keyup", function () {
        let sdata = { complete: $(this).val() };
        
        
        if (($('.search_marca').val() != 0)) {
            sdata.marca = $('.search_marca').val();
            if (($('.search_marca').val() != 0) && ($('.search_categoria').val() != 0)) {
                sdata.categoria = $('.search_categoria').val();
            }
        }
        if (($('.search_marca').val() == undefined) && ($('.search_categoria').val() != 0)) {
            sdata.categoria = $('.search_categoria').val();
        }
        ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', sdata)
            .then(function (data) {
                console.log(data);
                $('#searchAuto').empty();
                $('#searchAuto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({ 'class': 'searchElement', 'id': data[row].city });
                }
                $(document).on('click', '.searchElement', function () {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#search_auto').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_auto').fadeOut(1000);
                    }
                });
            }).catch(function () {
                $('#search_auto').fadeOut(500);
            });
    });
}

function button_search() {
    $('#search-btn').on('click', function () {
        var search = [];
        
        if ($('.search_marca').val() != undefined) {
            search.push(['cod_marca', $('.search_marca').val()])
            if ($('.search_categoria').val() != undefined) {
                search.push(['cod_categoria', $('.search_categoria').val()])
            }
            if ($('#autocom').val() != undefined) {
                search.push(['city', $('#autocom').val()])
            }
        } else if ($('.search_marca').val() == undefined) {
            if ($('.search_categoria').val() != undefined) {
                search.push(['cod_categoria', $('.search_categoria').val()])
            }
            if ($('#autocom').val() != undefined) {
                search.push(['city', $('#autocom').val()])
            }
        }
        localStorage.removeItem('filter');
        localStorage.removeItem('filter_search');
        if (search.length != 0) {
            localStorage.setItem('filter_search', JSON.stringify(search));
        }
        window.location.href = '?module=shop';
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});