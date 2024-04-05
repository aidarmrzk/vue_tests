<?php
// Получение данных из запроса
$login = $_POST['login'];
$right = $_POST['right'];
$wrong = $_POST['wrong'];

// Формируем URL для запроса
$method = '';
$site_name = '';
$token = '';
$queryURL = 'https://'.$site_name.'.bitrix24.ru/rest/1/'.$token.'/'.$method.'.json';

// Параметры запроса
$queryData = http_build_query(array(
    "LOGIN" => $login,
    "RIGHT_ANSWER" => $right,
    "WRONG_ANSWER" => $wrong
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
    echo json_encode(array('success' => false, 'message' => 'Ошибка при выполнении запроса: ' . $result['error_description']));
    exit(); // Прекращаем выполнение скрипта
}

// Обрабатываем результат
if (!empty($result['result'])) {
    echo json_encode(array('success' => true, 'message' => 'Результат успешно отправлен'));
} else {
    echo json_encode(array('success' => false, 'message' => 'Ошибка при отправке результата'));
}
?>

