<?php
// require_once(DAO_HOME . 'home_dao.class.singleton.php');
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_insert_cart_BLL($args) {

			$token = explode('"', $args[1]);
			$decode = jwt_process::decode_token($token[0]);

			if ($this -> dao -> select_product($this->db, $args[0], $decode['username'])) {
				// return 'actualizar';
				return $this -> dao -> select_update_cart($this->db, $args[0], $decode['username']);
			}

				return $this -> dao -> select_insert_cart($this->db, $args[0], $decode['username']);
			

		}


		public function get_load_cart_BLL($args) {
			// return 'load acart bll';

			$token = explode('"', $args);
			$decode = jwt_process::decode_token($token[0]);
	
			return $this -> dao -> select_load_cart($this->db, $decode['username']);

		}

		public function get_delete_cart_BLL($args) {
			

			$token = explode('"', $args[1]);
			$decode = jwt_process::decode_token($token[0]);

			return $this -> dao -> select_delete_cart($this->db, $args[0], $decode['username']);
		}

		public function get_update_cart_BLL($args) {
			// return $args;

			$token = explode('"', $args[1]);
			$decode = jwt_process::decode_token($token[0]);

			return $this -> dao -> select_update_qty_cart($this->db, $args[0], $decode['username'], $args[2]);
		}

		public function get_checkout_BLL($args) {
			// return 'load acart bll';

			$token = explode('"', $args);
			$decode = jwt_process::decode_token($token[0]);

			
	
			$carrito = $this -> dao -> select_checkout($this->db, $decode['username']);

			return $this -> dao -> select_insert_checkout($this->db, $decode['username'], $carrito);;

		}


	}
?>