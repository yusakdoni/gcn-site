<?php
/**
 * Handler untuk form Contact (menggantikan app/api/contact/route.ts).
 * Next.js static export tidak bisa menjalankan API routes, jadi logic ini
 * dipindah ke PHP dan dijalankan langsung oleh Apache di cPanel - tanpa
 * lewat Node.js sama sekali.
 *
 * PENTING: route.ts versi lama HANYA melakukan console.log() dan TIDAK
 * PERNAH mengirim email ke mana pun. File ini adalah implementasi
 * pertama yang benar-benar mengirim pesan.
 */

header('Content-Type: application/json');

// Ganti dengan alamat email tujuan yang sebenarnya.
$RECIPIENT_EMAIL = 'sales@gcnusantara.com';

// Hanya izinkan POST.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Body dikirim sebagai JSON dari ContactForm.tsx.
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload']);
    exit;
}

function field($body, $key) {
    return isset($body[$key]) ? trim(strip_tags((string) $body[$key])) : '';
}

// Honeypot anti-bot - sama seperti logic aslinya di route.ts.
$honeypot = field($body, 'hp_website');
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name    = field($body, 'name');
$email   = field($body, 'email');
$company = field($body, 'company');
$subject = field($body, 'subject');
$message = field($body, 'message');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$mailSubject = "[GCN Contact] $subject";
$mailBody = "Nama: $name\n"
          . "Email: $email\n"
          . "Perusahaan: " . ($company !== '' ? $company : '-') . "\n\n"
          . "Pesan:\n$message\n";

$headers = "From: no-reply@gcnusantara.com\r\n"
         . "Reply-To: $email\r\n"
         . "Content-Type: text/plain; charset=UTF-8";

$sent = mail($RECIPIENT_EMAIL, $mailSubject, $mailBody, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
