<?php
class middleware{
    public static function decode_username($get_token){
        // return $get_token;
		// $jwt = parse_ini_file(MODEL_PATH . "php.ini");
		// $secret = $jwt['secret'];
		// $token = $get_token;

		// $JWT = new JWT;
		// $json = $JWT -> decode($token, $secret);
		// $json = json_decode($json, TRUE);

        // $decode_user = $json['username'];
        // return $decode_user;
    }

	public static function decode_exp($get_token){
		$jwt = parse_ini_file(MODEL_PATH. "php.ini");
		$secret = $jwt['secret'];
		$token = $get_token;

		$JWT = new JWT;
		$json = $JWT -> decode($token, $secret);
		$json = json_decode($json, TRUE);

        $decode_exp = $json['exp'];
        return $decode_exp;
    }

	public static function encode($user) {
        $jwt = parse_ini_file(MODEL_PATH. "php.ini");

        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'username' => $user]);

        $JWT = new jwt();
        return $JWT -> encode($header, $payload, $secret);
    }
}