<?php
    class controller_cart {


        function view() {
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
            // echo 'hola';
        }

        
        function insert_cart() {
            // echo json_encode('hola insertar carrito');
            echo json_encode(common::load_model('cart_model', 'get_insert_cart', [$_POST['num_bas'], $_POST['token']]));
            // echo 'hola';
        }

        function load_cart() {
            // echo json_encode('hola load carrito');
            echo json_encode(common::load_model('cart_model', 'get_load_cart', $_POST['token']));
            // echo 'hola';
        }

        function delete_cart() {
            // echo json_encode('borrando del carrito');
            echo json_encode(common::load_model('cart_model', 'get_delete_cart', [$_POST['num_bas'], $_POST['token']]));
            // echo 'hola';
        }

        
        function update_qty() {
            // echo json_encode('updated qty');
            echo json_encode(common::load_model('cart_model', 'get_update_cart', [$_POST['num_bas'], $_POST['token'], $_POST['cantidad']]));
            // echo 'hola';
        }

        function checkout() {
            // echo json_encode('checkouted');
            echo json_encode(common::load_model('cart_model', 'get_checkout', $_POST['token']));
            // echo 'hola';
        }


    }
?>