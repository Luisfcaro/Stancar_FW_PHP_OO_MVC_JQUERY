<?php
    class controller_search {
        function car_marca() {
            echo json_encode(common::load_model('search_model', 'get_car_marca'));
        }

        function car_categoria() {
            if(empty($_POST['marca'])){
                echo json_encode(common::load_model('search_model', 'get_car_categoria'));
            }else{
                echo json_encode(common::load_model('search_model', 'get_car_categoria_brand', [$_POST['marca']]));
            }
        }
        
        function autocomplete() {
            if(!empty($_POST['marca']) && !empty($_POST['categoria'])){
                echo json_encode(common::load_model('search_model', 'get_marca_categoria_auto', [$_POST['marca'], $_POST['complete'], $_POST['categoria']]));
            }else if(empty($_POST['marca']) && !empty($_POST['categoria'])){
                echo json_encode(common::load_model('search_model', 'get_only_categoria_auto', [$_POST['complete'], $_POST['categoria']]));
            }else {
                echo json_encode(common::load_model('search_model', 'get_city', $_POST['complete']));
            }
        }
    }
?>