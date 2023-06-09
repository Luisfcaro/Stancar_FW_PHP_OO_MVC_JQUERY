<?php
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_car_marca() {
            return $this -> bll -> get_car_marca_BLL();
        }

        public function get_car_categoria() {
            return $this -> bll -> get_car_categoria_BLL();
        }

        public function get_car_categoria_brand($args) {
            return $this -> bll -> get_car_categoria_brand_BLL($args);
        }

        public function get_auto_car_type_brand($args) {
            return $this -> bll -> get_auto_car_type_brand_BLL($args);
        }

        public function get_auto($args) {
            return $this -> bll -> get_auto_BLL($args);
        }

        public function get_autocomplete($args) {
            // return $args;
            return $this -> bll -> get_autocomplete($args);
        }

    }