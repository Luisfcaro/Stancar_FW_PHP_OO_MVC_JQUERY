<?php
    // require_once(MODEL_PATH . 'connect.php'); 
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_carrusel($db) {
            $sql= "SELECT * FROM `marca` ORDER BY descripcion ASC LIMIT 30;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {
            $sql= "SELECT * FROM categorias";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_type($db) {
			$sql= "SELECT * FROM motor ORDER BY cod_motor DESC";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

		public function select_data_viewed($db) {
			$sql= "SELECT * FROM car ORDER BY Visitas DESC LIMIT 4";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>