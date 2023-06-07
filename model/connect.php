<?php
	class connect{
		public static function con(){
			$Host = 'localhost';
			$DBname = 'stancar';
			$Username = 'root';
			$Password = '';
			$puerto = 3306;
    		
    		$conexion = mysqli_connect($Host, $Username, $Password, $DBname, $puerto)or die();
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}