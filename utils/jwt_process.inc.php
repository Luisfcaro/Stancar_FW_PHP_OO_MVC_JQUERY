<?php
class jwt_process {
    public static function encode($user) {
        $jwt = parse_ini_file(MODEL_PATH . "php.ini");
        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (60 * 60), 'username' => $user]);
        $JWT = new jwt();
        return $JWT -> encode($header, $payload, $secret);
    }

    public static function decode_token($token) {
        $jwt = parse_ini_file(MODEL_PATH . "php.ini");
        $JWT = new jwt();
        $token_dec = $JWT -> decode($token, $jwt['secret']);
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }
}