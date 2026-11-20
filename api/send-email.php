<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/config.php';

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');

// Ograničenje ukupne veličine zahtjeva na 26 MB
$maxRequestSize = 26 * 1024 * 1024;

if (
    isset($_SERVER['CONTENT_LENGTH']) &&
    (int) $_SERVER['CONTENT_LENGTH'] > $maxRequestSize
) {
    http_response_code(413);

    echo json_encode([
        'success' => false,
        'message' => 'Ukupna veličina zahtjeva ne smije biti veća od 26 MB.'
    ]);

    exit;
}

// Provjera HTTP metode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Nedozvoljena metoda zahtjeva.'
    ]);

    exit;
}


// Primanje podataka iz React forme
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

// Honeypot zaštita od spam botova
if (!empty($_POST['website'])) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Neispravan zahtjev.'
    ]);

    exit;
}

// Provjera obaveznih polja
if ($name === '' || $email === '' || $service === '' || $message === '') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Molimo ispunite sva obavezna polja.'
    ]);

    exit;
}

// Provjera nedopuštenih kontrolnih znakova
if (
    preg_match('/[\x00-\x1F\x7F]/', $name) ||
    preg_match('/[\x00-\x1F\x7F]/', $email) ||
    preg_match('/[\x00-\x1F\x7F]/', $phone) ||
    preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $message)
) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Uneseni podaci sadrže nedopuštene znakove.'
    ]);

    exit;
}

// Provjera e-mail adrese
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Unesite ispravnu e-mail adresu.'
    ]);

    exit;
}

// Dopuštene vrste usluga
$allowedServices = [
    'Tapeciranje namještaja',
    'Auto interijeri',
    'Nautika',
    'Moto',
    'Ostalo'
];

// Provjera duljine podataka
if (
    mb_strlen($name) > 100 ||
    mb_strlen($email) > 254 ||
    mb_strlen($phone) > 30 ||
    mb_strlen($message) < 15 ||
    mb_strlen($message) > 5000
) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Provjerite duljinu unesenih podataka.'
    ]);

    exit;
}

// Provjera dopuštene usluge
if (!in_array($service, $allowedServices, true)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Odabrana vrsta usluge nije valjana.'
    ]);

    exit;
}

// Zaštita od prečestog slanja upita
$maxAttempts = 5;
$timeWindow = 600; // 10 minuta

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Jedinstvena datoteka za svaku IP adresu
$rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR .
    'mkm_rate_' . hash('sha256', $clientIp) . '.json';

$rateLimitHandle = fopen($rateLimitFile, 'c+');

if ($rateLimitHandle === false) {
    error_log('MKM: Nije moguće otvoriti datoteku za ograničenje zahtjeva.');

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Došlo je do pogreške. Pokušajte ponovno.'
    ]);

    exit;
}

flock($rateLimitHandle, LOCK_EX);

// Čitanje prethodnih pokušaja
$storedAttempts = stream_get_contents($rateLimitHandle);
$attempts = json_decode($storedAttempts, true);

if (!is_array($attempts)) {
    $attempts = [];
}

// Zadržavanje samo pokušaja unutar posljednjih 10 minuta
$attempts = array_filter(
    $attempts,
    fn($timestamp) => $timestamp > time() - $timeWindow
);

// Provjera ograničenja
if (count($attempts) >= $maxAttempts) {
    flock($rateLimitHandle, LOCK_UN);
    fclose($rateLimitHandle);

    http_response_code(429);

    echo json_encode([
        'success' => false,
        'message' => 'Poslali ste previše upita. Pokušajte ponovno za nekoliko minuta.'
    ]);

    exit;
}

// Bilježenje novog pokušaja
$attempts[] = time();

rewind($rateLimitHandle);
ftruncate($rateLimitHandle, 0);

fwrite($rateLimitHandle, json_encode(array_values($attempts)));
fflush($rateLimitHandle);

flock($rateLimitHandle, LOCK_UN);
fclose($rateLimitHandle);


 // Obrada fotografija
$uploadedPhotos = [];

if (isset($_FILES['photos'])) {

    $photos = $_FILES['photos'];

    $allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];

    $maxSize = 5 * 1024 * 1024;
    $maxPhotos = 5;

  if (
    !isset($photos['name'], $photos['tmp_name'], $photos['error'], $photos['size']) ||
    !is_array($photos['name']) ||
    !is_array($photos['tmp_name']) ||
    !is_array($photos['error']) ||
    !is_array($photos['size']) ||
    count($photos['name']) !== count($photos['tmp_name']) ||
    count($photos['name']) !== count($photos['error']) ||
    count($photos['name']) !== count($photos['size'])
) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Neispravan format fotografija.'
        ]);

        exit;
    }

    if (count($photos['name']) > $maxPhotos) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Možete poslati najviše 5 fotografija.'
        ]);

        exit;
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);

    foreach ($photos['tmp_name'] as $index => $tmpName) {

        if ($photos['error'][$index] === UPLOAD_ERR_NO_FILE) {
            continue;
        }

        if ($photos['error'][$index] !== UPLOAD_ERR_OK) {
            http_response_code(400);

            echo json_encode([
                'success' => false,
                'message' => 'Došlo je do pogreške prilikom učitavanja fotografije.'
            ]);

            exit;
        }

        if (
            !is_uploaded_file($tmpName) ||
            !is_file($tmpName) ||
            $photos['size'][$index] <= 0 ||
            $photos['size'][$index] > $maxSize
        ) {
            http_response_code(400);

            echo json_encode([
                'success' => false,
                'message' => 'Fotografija je neispravna ili prelazi dopuštenu veličinu od 5 MB.'
            ]);

            exit;
        }

        $mimeType = $finfo->file($tmpName);

        $allowedExtensions = [
    'image/jpeg' => ['jpg', 'jpeg'],
    'image/png' => ['png'],
    'image/webp' => ['webp']
];

$extension = strtolower(
    pathinfo($photos['name'][$index], PATHINFO_EXTENSION)
);

if (!in_array($extension, $allowedExtensions[$mimeType] ?? [], true)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Ekstenzija fotografije ne odgovara njezinu formatu.'
    ]);

    exit;
}

        if (!in_array($mimeType, $allowedTypes, true)) {
            http_response_code(400);

            echo json_encode([
                'success' => false,
                'message' => 'Dozvoljene su samo JPG, PNG i WebP fotografije.'
            ]);

            exit;
        }

        // Dodatna provjera je li datoteka stvarno slika
        if (@getimagesize($tmpName) === false) {
            http_response_code(400);

            echo json_encode([
                'success' => false,
                'message' => 'Jedna od fotografija nije valjana slika.'
            ]);

            exit;
        }

        // Siguran naziv datoteke za e-mail privitak
$originalName = basename($photos['name'][$index]);

$safeFileName = preg_replace(
    '/[^a-zA-Z0-9._-]/',
    '_',
    $originalName
);

$uploadedPhotos[] = [
    'tmp_name' => $tmpName,
    'name' => substr($safeFileName, 0, 100)
];
    }
}

// Priprema podataka za HTML e-mail
$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safePhone = htmlspecialchars($phone ?: 'Nije navedeno', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeService = htmlspecialchars($service, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(
    htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
);

// Priprema i slanje e-maila
try {

    // Inicijalizacija PHPMailera
    $mail = new PHPMailer(true);

    // Način slanja
    $mail->isMail();

    // Postavke pošiljatelja
    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);

    // Kodiranje
    $mail->CharSet = MAIL_CHARSET;

// Primatelj i odgovor na upit
$mail->addAddress(MAIL_TO);
$mail->addReplyTo($email, $name);

// Naslov e-maila
$mail->Subject = 'Novi upit – ' . $service;

// Dodavanje provjerenih fotografija kao privitaka
foreach ($uploadedPhotos as $photo) {

    $mail->addAttachment(
        $photo['tmp_name'],
        $photo['name']
    );
}

// HTML format poruke
$mail->isHTML(true);

$mail->Body = "
<div style='font-family: Arial, sans-serif; color: #292929; max-width: 650px; margin: 0 auto;'>
    <div style='background-color: #292929; padding: 25px; color: #ffffff;'>
        <h2 style='margin: 0;'>Novi upit putem MKM web stranice</h2>
    </div>

    <div style='padding: 25px; background-color: #f7f7f7;'>
        <p><strong>Ime i prezime:</strong><br>{$safeName}</p>

        <p><strong>E-mail:</strong><br>{$safeEmail}</p>

        <p><strong>Telefon:</strong><br>{$safePhone}</p>

        <p><strong>Vrsta usluge:</strong><br>{$safeService}</p>

        <hr style='border: 0; border-top: 1px solid #dddddd; margin: 25px 0;'>

        <p><strong>Opis upita:</strong></p>
        <p style='line-height: 1.6;'>{$safeMessage}</p>
    </div>

    <div style='padding: 15px; color: #888888; font-size: 12px;'>
        Ova poruka poslana je putem kontakt forme na MKM web stranici.
    </div>
</div>
";

// Tekstualna verzija poruke za klijente čiji e-mail program ne prikazuje HTML
$mail->AltBody =
    "Novi upit putem MKM web stranice\n\n" .
    "Ime i prezime: {$name}\n" .
    "E-mail: {$email}\n" .
    "Telefon: " . ($phone ?: 'Nije navedeno') . "\n" .
    "Vrsta usluge: {$service}\n\n" .
    "Opis upita:\n{$message}";

// Slanje e-maila
    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Vaš upit uspješno je poslan. Hvala na javljanju!'
    ]);

} catch (Throwable $e) {

    // Detalje greške zapisujemo u PHP log
    error_log('MKM mail error: ' . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Došlo je do pogreške prilikom slanja upita. Pokušajte ponovno.'
    ]);
}
