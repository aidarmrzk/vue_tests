<?php 
// Получение данных из запроса
$loginToCheck = $_POST['login'];
$passwordToCheck = $_POST['password'];

// Формируем URL для запроса
$method = '';
$site_name = '';
$token = '';
$queryURL = 'https://'.$site_name.'.bitrix24.ru/rest/1/'.$token.'/'.$method.'.json';

// Логин и пароль для проверки
$loginToCheck = "example@example.com";
$passwordToCheck = "your_password_here";

// Параметры запроса
$queryData = http_build_query(array(
    "LOGIN" => $loginToCheck,
    "PASSWORD" => $passwordToCheck,
));

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $queryURL,
    CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);
$result = json_decode($result, true);

// Проверяем наличие ошибок
if (array_key_exists('error', $result)) {
    die("Ошибка при выполнении запроса: " . $result['error_description']);
}

// Проверяем результат аутентификации
if (!empty($result['result']) && $result['result'] === true) {
	echo json_encode(array('authenticated' => true));
} else {
	echo json_encode(array('authenticated' => false));
}

?>