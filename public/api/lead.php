<?php
// public/api/lead.php  ->  https://opensite.gr/api/lead.php
// Δέχεται τις φόρμες του site και τις στέλνει με email στο info@opensite.gr.
// Δεν αποθηκεύει τίποτα στον server εκτός από έναν μετρητή ανά ώρα (hash της IP, όχι η ίδια η IP).
declare(strict_types=1);
ini_set('display_errors', '0'); // a PHP warning must never leak into the JSON answer

const LEAD_TO        = 'info@opensite.gr';
const LEAD_FROM      = 'no-reply@opensite.gr';   // πρέπει να υπάρχει ως διεύθυνση στο domain
const LEAD_ORIGINS   = ['https://opensite.gr', 'https://www.opensite.gr'];
const LEAD_MAX_HOUR  = 10;                        // αιτήματα ανά IP την ώρα
const LEAD_MAX_BYTES = 20000;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function lead_out(int $code, bool $ok, string $message): void
{
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Κείμενο πολλών γραμμών: βγάζει χαρακτήρες ελέγχου και κόβει στο όριο. */
function lead_text($value, int $max): string
{
    $s = is_scalar($value) ? (string) $value : '';
    $s = str_replace(["\r\n", "\r"], "\n", $s);
    $s = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]/u', '', $s) ?? '';
    return mb_substr(trim($s), 0, $max, 'UTF-8');
}

/** Κείμενο μίας γραμμής: όπως το παραπάνω, χωρίς αλλαγές γραμμής. */
function lead_line($value, int $max): string
{
    return trim(preg_replace('/\s+/u', ' ', lead_text($value, $max)) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    lead_out(405, false, 'method');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!in_array($origin, LEAD_ORIGINS, true)) {
    lead_out(403, false, 'origin');
}

$raw = file_get_contents('php://input', false, null, 0, LEAD_MAX_BYTES + 1);
if ($raw === false || strlen($raw) > LEAD_MAX_BYTES) {
    lead_out(413, false, 'size');
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    lead_out(400, false, 'json');
}

// Όριο ανά IP. Στον δίσκο μένει μόνο ένα hash που αλλάζει κάθε μέρα.
$bucket = sys_get_temp_dir() . '/os_lead_' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . date('Y-m-d') . '|' . __FILE__);
$since  = time() - 3600;
$hits   = [];
if (is_file($bucket)) {
    foreach (explode("\n", (string) file_get_contents($bucket)) as $t) {
        if ((int) $t > $since) {
            $hits[] = (int) $t;
        }
    }
}
if (count($hits) >= LEAD_MAX_HOUR) {
    lead_out(429, false, 'rate');
}
$hits[] = time();
@file_put_contents($bucket, implode("\n", $hits), LOCK_EX);

// Μόνο αυτά τα πεδία περνούν στο email, με αυτή τη σειρά.
$labels = [
    'name'          => 'Όνομα',
    'phone'         => 'Τηλέφωνο',
    'email'         => 'Email',
    'need'          => 'Τι χρειάζεται',
    'website'       => 'Site',
    'business_type' => 'Είδος επιχείρησης',
    'service'       => 'Υπηρεσία',
    'date'          => 'Ημέρα',
    'time'          => 'Ώρα',
    'message'       => 'Μήνυμα',
    'page'          => 'Φόρμα',
    'landing_page'  => 'Σελίδα εισόδου',
    'utm_source'    => 'utm_source',
    'utm_medium'    => 'utm_medium',
    'utm_campaign'  => 'utm_campaign',
    'utm_term'      => 'utm_term',
    'utm_content'   => 'utm_content',
    'gclid'         => 'gclid',
    'gbraid'        => 'gbraid',
    'wbraid'        => 'wbraid',
    'honeypot'      => 'Κρυφό πεδίο',
];

$lines = [];
foreach ($labels as $key => $label) {
    if (!array_key_exists($key, $data)) {
        continue;
    }
    $value = $key === 'message' ? lead_text($data[$key], 4000) : lead_line($data[$key], 300);
    if ($value !== '') {
        $lines[] = $label . ': ' . $value;
    }
}

$name  = lead_line($data['name'] ?? '', 100);
$phone = lead_line($data['phone'] ?? '', 40);
$email = filter_var(lead_line($data['email'] ?? '', 200), FILTER_VALIDATE_EMAIL) ?: '';
if ($name === '' || ($phone === '' && $email === '')) {
    lead_out(422, false, 'fields');
}

$subject = lead_line($data['subject'] ?? '', 150);
if ($subject === '') {
    $subject = 'Νέο αίτημα από το site';
}
if (lead_line($data['honeypot'] ?? '', 300) !== '') {
    $subject = '[πιθανό spam] ' . $subject;
}

$headers = [
    'From: OpenSite <' . LEAD_FROM . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(
    LEAD_TO,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    implode("\n", $lines) . "\n",
    implode("\r\n", $headers),
    '-f' . LEAD_FROM
);

lead_out($sent ? 200 : 502, $sent, $sent ? 'sent' : 'mail');
