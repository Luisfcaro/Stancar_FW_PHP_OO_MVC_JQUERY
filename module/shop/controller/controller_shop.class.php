<?php
    class controller_shop {

        function view() {
            // echo 'Hola';
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function list() {
            echo json_encode(common::load_model('shop_model', 'get_list', [$_POST['total_prod'], $_POST['items_page']]));
        }
        
        function details_carousel() {
            echo json_encode(common::load_model('shop_model', 'get_details_carousel', $_POST['id_car']));
        }
        
        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters', [$_POST['filter'], $_POST['total_prod'], $_POST['items_page']]));
        }
        
        function filters_search() {
            // echo json_encode('hola filters search') ;
            echo json_encode(common::load_model('shop_model', 'get_filters_search', [$_POST['filter'], $_POST['total_prod'], $_POST['items_page']]));
        }

        function most_visit() {
            // echo json_encode(common::load_model('shop_model', 'get_most_visit_BLL', $_POST['id']));
        }

        function count() {
            echo json_encode(common::load_model('shop_model', 'get_count'));
        }

        function count_filters() {
            // echo json_encode('hola count filters');
            echo json_encode(common::load_model('shop_model', 'get_count_filters', $_POST['filtros']));
        }

        function count_filters_search() {
            // echo json_encode('hola count search');
            echo json_encode(common::load_model('shop_model', 'get_count_filters_search', $_POST['filters_search']));
        }

        function cars() {
            // echo json_encode('Hola');
            // echo json_encode(common::load_model('shop_model', 'get_cars', [$_POST['category'], $_POST['type'], $_POST['id'], $_POST['loaded'], $_POST['items']]));
        }


        ////////Likes///////

        function load_likes() {
            // echo json_encode($_POST['token']);
            echo json_encode(common::load_model('shop_model', 'get_load_likes', $_POST['token']));
        }

        function control_likes() {
            // echo json_encode($_POST['num_bas']);
            echo json_encode(common::load_model('shop_model', 'get_control_likes', [$_POST['num_bas'], $_POST['token']]));
        }

        ////////////////////


        function count_related() {
            // echo json_encode('hola count related');
            echo json_encode(common::load_model('shop_model', 'get_count_related', $_POST['category_car']));
        }

        
        function cars_related() {
            // echo json_encode('hola cars related');
            echo json_encode(common::load_model('shop_model', 'get_cars_related', [$_POST['type'], $_POST['loaded'], $_POST['items']]));
        }

    }
?>
