<?php
    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_car_marca($db){

			$sql = "SELECT * FROM marca";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_car_categoria($db){


            $sql = "SELECT DISTINCT * FROM categorias";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_car_categoria_brand($db, $marca){
            
            // return $marca[0];

            $sql = "SELECT ca.*
            FROM car, categorias ca
            WHERE ca.cod_categoria = car.cod_categoria AND car.cod_marca = '$marca[0]'";

            // return $sql;
			
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_only_categoria_auto($db, $complete, $categoria){
            // return 'hola dao only cat';

            $sql="SELECT DISTINCT city FROM car WHERE car.cod_categoria = '$categoria' AND car.city LIKE '$complete%'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_marca_categoria_auto($db, $marca, $complete, $categoria){
            // return 'Dao marca categoria';

            $sql="SELECT DISTINCT city FROM car WHERE car.cod_marca = '$marca' AND car.cod_categoria = '$categoria' AND car.city LIKE '$complete%'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_car_type_brand($db, $car_type, $car_brand, $auto){

            $sql = "SELECT DISTINCT c.city FROM cars c INNER JOIN type t INNER JOIN brand b ON c.brand = b.cod_brand AND c.type = t.cod_type WHERE t.type_name='$car_type' AND b.brand_name='$car_brand' AND c.city LIKE '$auto%'";
			
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto($db, $auto){

            $sql = "SELECT DISTINCT city FROM cars WHERE city LIKE '$auto%'";

			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_city($db, $complete){

            $sql="SELECT DISTINCT car.city
            FROM car 
            WHERE car.city LIKE '$complete%'";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
    }

?>