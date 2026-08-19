<?php
/**
 * Handler untuk form RFQ (menggantikan app/api/rfq/route.ts).
 * Sama seperti contact.php - route.ts versi lama HANYA console.log() dan
 * TIDAK PERNAH mengirim email. File ini implementasi pertama yang benar-
 * benar mengirim data RFQ, termasuk file attachment sebagai lampiran email.
 */

header('Content-Type: application/json');

$RECIPIENT_EMAIL = 'sales@gcnusantara.com';
$MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

function field($key) {
    return isset($_POST[$key]) ? trim(strip_tags((string) $_POST[$key])) : '';
}

// Honeypot anti-bot.
$honeypot = field('hp_website');
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$required = [
    'companyName', 'contactPerson', 'email', 'phone', 'industry',
    'productOrService', 'specification', 'quantity',
    'requiredDeliveryDate', 'deliveryLocation',
];

$missing = [];
$data = [];
foreach ($required as $key) {
    $value = field($key);
    if ($value === '') $missing[] = $key;
    $data[$key] = $value;
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields', 'fields' => $missing]);
    exit;
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$budgetRange = field('budgetRange');
$additionalInformation = field('additionalInformation');

$bodyLines = [
    "Company Name: {$data['companyName']}",
    "Contact Person: {$data['contactPerson']}",
    "Email: {$data['email']}",
    "Phone: {$data['phone']}",
    "Industry: {$data['industry']}",
    "Product/Service: {$data['productOrService']}",
    "Specification: {$data['specification']}",
    "Quantity: {$data['quantity']}",
    "Required Delivery Date: {$data['requiredDeliveryDate']}",
    "Delivery Location: {$data['deliveryLocation']}",
    "Budget Range: " . ($budgetRange !== '' ? $budgetRange : '-'),
    "Additional Information: " . ($additionalInformation !== '' ? $additionalInformation : '-'),
];
$mailBody = implode("\n", $bodyLines) . "\n";
$mailSubject = "[GCN RFQ] {$data['companyName']} - {$data['productOrService']}";

$hasAttachment = isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK;

if ($hasAttachment && $_FILES['attachment']['size'] > $MAX_ATTACHMENT_BYTES) {
    http_response_code(400);
    echo json_encode(['error' => 'Attachment too large (max 8MB)']);
    exit;
}

$fromHeader = "From: no-reply@gcnusantara.com\r\nReply-To: {$data['email']}\r\n";

if ($hasAttachment) {
    // Kirim sebagai multipart email dengan lampiran file.
    $boundary = md5(uniqid((string) time()));
    $fileContent = chunk_split(base64_encode(file_get_contents($_FILES['attachment']['tmp_name'])));
    $fileName = basename($_FILES['attachment']['name']);

    $headers = $fromHeader
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: multipart/mixed; boundary=\"$boundary\"";

    $message  = "--$boundary\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $message .= $mailBody . "\r\n";
    $message .= "--$boundary\r\n";
    $message .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
    $message .= $fileContent . "\r\n";
    $message .= "--$boundary--";

    $sent = mail($RECIPIENT_EMAIL, $mailSubject, $message, $headers);
} else {
    $headers = $fromHeader . "Content-Type: text/plain; charset=UTF-8";
    $sent = mail($RECIPIENT_EMAIL, $mailSubject, $mailBody, $headers);
}

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
