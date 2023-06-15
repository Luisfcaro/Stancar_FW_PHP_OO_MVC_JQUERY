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
            echo json_encode(common::load_model('search_model', 'get_autocomplete', [$_POST['marca'], $_POST['categoria'], $_POST['complete']]));
        }
    }
?>