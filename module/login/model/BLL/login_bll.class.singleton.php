<?php

	class login_bll {
		
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = login_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
			// return $args;



			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			$hashavatar = md5(strtolower(trim($args[2]))); 
			$avatar = "https://i.pravatar.cc/500?u=$hashavatar";
			$token_email = common::generate_Token_secure(20);

		


			if (!empty($this -> dao -> select_comprobar_reg($this->db, $args[0], $args[2]))) {
				return 'error';
            } else {
				// return 'el usuario es valido';
				$this -> dao -> insert_user($this->db, $args[0], $hashed_pass, $args[2], $avatar, $token_email);
				$message = [ 'type' => 'validate', 
							 'token' => $token_email, 
							 'toEmail' =>  'lu.fernancar@gmail.com'
							//  'toEmail' =>  $args[0]
							];
				$email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return ;  
				}   
			}
			
		}

		public function get_login_BLL($args) {

			if (!empty($this -> dao -> select_user($this->db, $args[0]))) {
				$user = $this -> dao -> select_user($this->db, $args[0]);
				if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 1  ) {
				    $jwt = jwt_process::encode($user[0]['username']);
					$_SESSION['username'] = $user[0]['username'];
					$_SESSION['tiempo'] = time();
					return $jwt;
				} else if (password_verify($args[1], $user[0]['password']) && $user[0]['activate'] == 0) {
					return 'activate error';
				} else {
					return 'error_passwd';
				}
            } else {
				return 'error_user';
			}

		}

		public function get_social_login_BLL($args) {

			if (!empty($this -> dao -> select_user($this->db, $args[1], $args[2]))) {
				$user = $this -> dao -> select_user($this->db, $args[1], $args[2]);
				$jwt = jwt_process::encode($user[0]['username']);
				return json_encode($jwt);
            } else {
				$this -> dao -> insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
				$user = $this -> dao -> select_user($this->db, $args[1], $args[2]);
				$jwt = jwt_process::encode($user[0]['username']);
				return json_encode($jwt);
			}
		}

		public function get_verify_email_BLL($args) {
			// return 'hola bll verify';

			if(!empty($this -> dao -> select_verify_email($this->db, $args))){
				$this -> dao -> update_verify_email($this->db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}




		public function get_recover_email_BBL($args) {
			// return $args;

			// return $this -> dao -> select_recover_password($this->db, $args);
			$user = $this -> dao -> select_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);

			if (!empty($user)) {
				$this -> dao -> update_recover_password($this->db, $args, $token);
				// return 'patata';
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					return;  
				}   
            }else{
                return 'error_email';
            }
		}

		public function get_verify_token_BLL($args) {
			// return 'hola verify bll';

			// return $this -> dao -> select_verify_email($this->db, $args);

			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			// return $args;
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);

			// return $this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass);

			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}




		public function get_data_user_BLL($args) {
			// return $args;

			$token = explode('"', $args);
			$decode = jwt_process::decode_token($token[0]);
			return $this -> dao -> select_data_user($this->db, $decode['username']);
		}


		public function get_activity_BLL() {

            if (!isset($_SESSION["tiempo"])) {  
				return "inactivo";
			} else {  
				if((time() - $_SESSION["tiempo"]) >= 1800) {  
						return "inactivo";
				}else{
					return (time() - $_SESSION["tiempo"]);
				}
			}
		}

		public function get_controluser_BLL($args) {

			$token = explode('"', $args);
			$void_email = "";
			$decode = middleware::decode_username($token[1]);
			$user = $this -> dao -> select_user($this->db, $decode, $void_email);

			if (!isset ($_SESSION['username']) != $user){
				if(isset ($_SESSION['username']) != $user) {
					return 'not_match';
				}
				return 'match';
			}
		}

		public function get_refresh_token_BLL($args) {

			$token = explode('"', $args);
			$void_email = "";
			$decode = middleware::decode_username($token[1]);
			$user = $this -> dao -> select_user($this->db, $decode, $void_email);

			$new_token = jwt_process::encode($user[0]['username']);

            return $new_token;
		}

		public function get_token_expires_BLL($args) {

			$token = explode('"', $args);
			$decode = middleware::decode_exp($token[1]);
			
            if(time() >= $decode) {  
				return "inactivo"; 
			} else{
				return "activo";
			}
		}


		public function get_logout_BLL() {
			@session_start();
			unset($_SESSION['username']);
			unset($_SESSION['tiempo']);
			session_destroy();
			return 'bll logout';

		}
	}