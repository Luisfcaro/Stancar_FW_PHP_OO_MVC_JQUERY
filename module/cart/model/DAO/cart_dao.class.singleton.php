<?php
    class cart_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function select_insert_cart($db, $num_bas, $username) {

            $sql = "INSERT INTO cart (username, codigo_producto, qty) VALUES ('$username','$num_bas', '1')";


            $stmt = $db->ejecutar($sql);
            return "insertado";

        }

        public function select_update_cart($db, $num_bas, $username) {

            $sql = "UPDATE cart SET qty = qty+1 WHERE username='$username' AND codigo_producto='$num_bas'";


            $stmt = $db->ejecutar($sql);
            return "actualizado en shop/details";

        }

        public function select_product($db, $num_bas, $username) {

            // return 'consulta';
            $sql = "SELECT * FROM cart WHERE username='$username' AND codigo_producto='$num_bas'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

        }

        public function select_load_cart($db, $username) {
            // return 'consulta';
            $sql = "SELECT p.numero_bastidor, p.numero_matricula, p.color, p.imagen, p.precio, p.city, p.stock, c.qty FROM cart c, car p WHERE c.codigo_producto = p.numero_bastidor AND username = '$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

        }

        public function select_delete_cart($db, $num_bas, $username) {
            // return 'consulta';
            $sql = "DELETE FROM cart WHERE username = '$username' AND codigo_producto = '$num_bas'";
          
            $stmt = $db->ejecutar($sql);
            return 'deleted';

        }

        public function select_update_qty_cart($db, $num_bas, $username, $qty) {
            // return $qty;
            $sql = "UPDATE cart SET qty = $qty WHERE username = '$username' AND codigo_producto = '$num_bas'";
          
            $stmt = $db->ejecutar($sql);
            return 'updated qty';

        }


        public function select_checkout($db, $username) {
            // return 'consulta';
            $sql = "SELECT p.numero_bastidor, p.numero_matricula, p.color, p.imagen, p.precio, p.city, p.stock, c.qty FROM cart c, car p WHERE c.codigo_producto = p.numero_bastidor AND username = '$username'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

        }


        public function select_insert_checkout($db, $username, $data) {
            $username_pedido = md5($username);

            foreach($data as $fila){
                $cod_ped = $username_pedido;
                $cod_prod = $fila["numero_bastidor"];
                $matricula = $fila["numero_matricula"];
                $cantidad = $fila["qty"];
                $precio = $fila["precio"];
                $total_precio = $fila["precio"] * $fila["qty"];
    
    
    
                $sql = "INSERT INTO pedidos (cod_ped, username, cod_prod, matricula, cantidad, precio, total_precio, fecha) 
                        VALUES ('$cod_ped', '$username', '$cod_prod', '$matricula', '$cantidad', '$precio', '$total_precio', 'now()')";

                // return $sql;
                $stmt = $db->ejecutar($sql);
                return 'checkout realizado correctamente';

            }

            // $stmt = $db->ejecutar($sql);
            // return $db->listar($stmt);

        }

        

    }

?>

