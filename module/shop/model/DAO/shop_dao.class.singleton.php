<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function select_all_cars($db, $total_prod, $items_page) {

            $sql = "SELECT car.*, cat.nombre_categoria, mar.nombre_marca, mot.nombre_motor
            FROM car INNER JOIN categorias cat INNER JOIN marca mar INNER JOIN motor mot
            ON car.cod_categoria = cat.cod_categoria AND car.cod_marca = mar.cod_marca AND car.cod_motor = mot.cod_motor
            ORDER BY car.Visitas DESC
            LIMIT $total_prod, $items_page";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function update_visitas($db, $id){

            $sql = "UPDATE car 
            SET car.Visitas = car.Visitas + 1 
            WHERE car.numero_bastidor = '$id';";

            $db->ejecutar($sql);
        }

        function select_details($db, $id){

            $sql = "SELECT car.*, cat.nombre_categoria, mar.nombre_marca, mot.nombre_motor
            FROM car INNER JOIN categorias cat INNER JOIN marca mar INNER JOIN motor mot
            ON car.cod_categoria = cat.cod_categoria AND car.cod_marca = mar.cod_marca AND car.cod_motor = mot.cod_motor
            WHERE car.numero_bastidor = '$id';";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details_images($db, $id){

            $details = self::select_details($db, $id);
            self::update_visitas($db, $id);

            $sql = "SELECT *
            FROM imagenes img
            WHERE img.n_bastidor = '$id'";

            $stmt = $db->ejecutar($sql);
            
            $array = array();
            
            if (mysqli_num_rows($stmt) > 0) {
                foreach ($stmt as $row) {
                    array_push($array, $row);
                }
            }

            $rdo = array();
            $rdo[0] = $details;
            $rdo[1][] = $array;

            return $rdo;

        }

        public function select_filters($db, $filter, $total_prod, $items_page) {

            $sql = "SELECT car.*, cat.nombre_categoria, mar.nombre_marca, mot.nombre_motor
            FROM car INNER JOIN categorias cat INNER JOIN marca mar INNER JOIN motor mot
            ON car.cod_categoria = cat.cod_categoria AND car.cod_marca = mar.cod_marca AND car.cod_motor = mot.cod_motor";


                for ($i=0; $i < count($filter); $i++){
                    if ($i==0){
                        if ($filter[$i][0] == 'orden'){
                            $sql.= " ORDER BY car." . $filter[$i][1] . " DESC ";

                        }else{
                        $sql.= " WHERE car." . $filter[$i][0] . "=" ."'" . $filter[$i][1] ."'";
                        }
                    }else {
                        if ($filter[$i][0] == 'orden'){
                            $sql.= " ORDER BY car." . $filter[$i][1] . " DESC ";

                        }else{$sql.= " AND car." . $filter[$i][0] . "=" ."'" . $filter[$i][1] ."'";}
                    }        
                }

                $sql.= "LIMIT " . $total_prod ."," . $items_page;
                
                $stmt = $db->ejecutar($sql);
                return $db->listar($stmt);
        }

        public function filters($db, $filter, $total_prod, $items_page) {

            $sql = "SELECT car.*, cat.nombre_categoria, mar.nombre_marca, mot.nombre_motor
            FROM car INNER JOIN categorias cat INNER JOIN marca mar INNER JOIN motor mot
            ON car.cod_categoria = cat.cod_categoria AND car.cod_marca = mar.cod_marca AND car.cod_motor = mot.cod_motor";


            if($filter[0][0] == "city") {

            $sql.= " WHERE car." . $filter[0][0] . " LIKE " ."'" . $filter[0][1] ."%'";

            }else if($filter[1][0] == "city"){

            $sql.= " WHERE car." . $filter[0][0] . " = " ."'" . $filter[0][1] ."'";
            $sql.= " AND car." . $filter[1][0] . " LIKE " ."'" . $filter[1][1] ."%'";

            }else if($filter[2][0] == "city"){

            $sql.= " WHERE car." . $filter[0][0] . " = " ."'" . $filter[0][1] ."'";
            $sql.= " AND car." . $filter[1][0] . " = " ."'" . $filter[1][1] ."'";
            $sql.= " AND car." . $filter[2][0] . " LIKE " ."'" . $filter[2][1] ."%'";

            }

            $sql.= "LIMIT " . $total_prod ."," . $items_page;
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

        }

        public function maps_details($db, $id){

            $sql = "SELECT id, city, lat, lng FROM cars WHERE id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_view($db, $id){

            $sql = "UPDATE cars c SET visits = visits + 1 WHERE id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count($db){

            $sql = "SELECT COUNT(*) contador
            FROM car";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count_filters($db, $filtros){
            $sql = "SELECT COUNT(*) contador
            FROM car INNER JOIN categorias cat INNER JOIN marca mar INNER JOIN motor mot
            ON car.cod_categoria = cat.cod_categoria AND car.cod_marca = mar.cod_marca AND car.cod_motor = mot.cod_motor";
    
    
            for ($i=0; $i < count($filtros); $i++){
                if ($i==0){
                    if ($filtros[$i][0] == 'orden'){
                        $sql.= " ORDER BY car." . $filtros[$i][1] . " DESC ";
    
                    }else{
                        $sql.= " WHERE car." . $filtros[$i][0] . "=" ."'" . $filtros[$i][1] ."'";
                    }
                }else {
                    if ($filtros[$i][0] == 'orden'){
                        $sql.= " ORDER BY car." . $filtros[$i][1] . " DESC ";
    
                    }else{$sql.= " AND car." . $filtros[$i][0] . "=" ."'" . $filtros[$i][1] ."'";}
                }        
            }

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count_filters_search($db, $filters_search){
            $sql = "SELECT COUNT(*) contador
            FROM car INNER JOIN categorias cat INNER JOIN marca mar INNER JOIN motor mot
            ON car.cod_categoria = cat.cod_categoria AND car.cod_marca = mar.cod_marca AND car.cod_motor = mot.cod_motor";
    
    
            if($filters_search[0][0] == "city") {
    
            $sql.= " WHERE car." . $filters_search[0][0] . " LIKE " ."'" . $filters_search[0][1] ."%'";
    
            }else if($filters_search[1][0] == "city"){
    
                $sql.= " WHERE car." . $filters_search[0][0] . " = " ."'" . $filters_search[0][1] ."'";
                $sql.= " AND car." . $filters_search[1][0] . " LIKE " ."'" . $filters_search[1][1] ."%'";
    
            }else if($filters_search[2][0] == "city"){
    
                $sql.= " WHERE car." . $filters_search[0][0] . " = " ."'" . $filters_search[0][1] ."'";
                $sql.= " AND car." . $filters_search[1][0] . " = " ."'" . $filters_search[1][1] ."'";
                $sql.= " AND car." . $filters_search[2][0] . " LIKE " ."'" . $filters_search[2][1] ."%'";
    
            }

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_cars($db, $category, $type, $id, $loaded, $items){

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.type = t.cod_type AND c.category = ct.cod_category WHERE c.category = '$category' AND c.id <> $id OR c.type = '$type' AND c.id <> $id LIMIT $loaded, $items";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_load_likes($db, $username){

            $sql = "SELECT l.id_car FROM likes l WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_likes($db, $num_bas, $username){

    		$sql = "SELECT l.id_car FROM likes l
				WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')
				AND l.id_car = '$num_bas'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $num_bas, $username){

            $sql = "INSERT INTO likes (id_user, id_car) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= '$username') ,'$num_bas');";

            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $num_bas, $username){

            $sql = "DELETE FROM likes WHERE id_car='$num_bas' AND id_user=(SELECT  u.id_user FROM users u WHERE u.username= '$username')";

            $stmt = $db->ejecutar($sql);
            return "unlike";
        }

        public function select_count_related($db, $category_car){

            $sql = "SELECT COUNT(*) AS n_prod
            FROM car c 
            WHERE c.cod_categoria = '$category_car'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_cars_related($db, $type, $loaded, $items){

            $sql = "SELECT * 
            FROM car c, marca m
            WHERE c.cod_marca = m.cod_marca 
            AND c.cod_categoria = '$type'
            LIMIT $loaded, $items";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    }

?>

