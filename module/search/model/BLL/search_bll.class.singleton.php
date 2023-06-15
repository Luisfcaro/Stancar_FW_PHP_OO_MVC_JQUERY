<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_car_marca_BLL() {
			return $this -> dao -> select_car_marca($this->db);
		}

		public function get_car_categoria_BLL() {
			return $this -> dao -> select_car_categoria($this->db);
		}

        public function get_car_categoria_brand_BLL($args) {
			return $this -> dao -> select_car_categoria_brand($this->db, $args);
		}

        public function get_auto_car_type_brand_BLL($args) {
			return $this -> dao -> select_auto_car_type_brand($this->db, $args[0], $args[1], $args[2]);
		}

        public function get_auto_BLL($args) {
			return $this -> dao -> select_auto($this->db, $args);
		}

		public function get_autocomplete($args) {

			if ($args[0] != "" && $args[1] != "" ){
				return $this -> dao -> select_marca_categoria_auto($this->db, $args[0], $args[1], $args[2]);
			}else if ($args[0] == "" && $args[1] != "" ){
				return $this -> dao -> select_only_categoria_auto($this->db, $args[1], $args[2]);
			}else{
				return $this -> dao -> select_city($this->db, $args[2]);
			}
		}
		
	}
?>