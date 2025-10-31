<?php
/**
 * SpaceCode Technologies - Contact Form Handler
 * Procesa el formulario de contacto y envía emails
 * 
 * @version 1.0
 * @date 2025-10-31
 */

// Configuración de seguridad
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Permitir CORS solo desde tu dominio
$allowed_origins = ['https://spacecode.com.co', 'http://localhost:8000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Configuración de email
$to_email = 'info@spacecode.com.co';
$from_email = 'noreply@spacecode.com.co';
$site_name = 'SpaceCode Technologies';

// Función para sanitizar datos
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Validar y obtener datos del formulario
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');

// Validaciones
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'El nombre es requerido y debe tener al menos 2 caracteres';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email inválido';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'El mensaje debe tener al menos 10 caracteres';
}

// Validación de teléfono (opcional pero si existe debe ser válido)
if (!empty($phone) && !preg_match('/^[0-9\s\+\-\(\)]+$/', $phone)) {
    $errors[] = 'Formato de teléfono inválido';
}

// Protección anti-spam básica
$honeypot = $_POST['website'] ?? '';
if (!empty($honeypot)) {
    // Campo honeypot detectado (probablemente un bot)
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Solicitud rechazada']);
    exit;
}

// Si hay errores, retornar
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Preparar el email
$subject = "Nuevo mensaje de contacto - $site_name";

// Email en formato HTML
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #667eea; }
        .field-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .field-value { color: #333; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🚀 Nuevo Mensaje de Contacto</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='field-label'>👤 Nombre:</div>
                <div class='field-value'>$name</div>
            </div>
            <div class='field'>
                <div class='field-label'>📧 Email:</div>
                <div class='field-value'><a href='mailto:$email'>$email</a></div>
            </div>
            " . (!empty($phone) ? "
            <div class='field'>
                <div class='field-label'>📱 Teléfono:</div>
                <div class='field-value'><a href='tel:$phone'>$phone</a></div>
            </div>
            " : "") . "
            <div class='field'>
                <div class='field-label'>💬 Mensaje:</div>
                <div class='field-value'>" . nl2br($message) . "</div>
            </div>
            <div class='footer'>
                <p><strong>SpaceCode Technologies</strong></p>
                <p>Este mensaje fue enviado desde el formulario de contacto en spacecode.com.co</p>
                <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Headers del email
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $site_name . ' <' . $from_email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'Importance: High'
];

// Intentar enviar el email
$mail_sent = mail($to_email, $subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Email enviado exitosamente
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente. Te contactaremos pronto.'
    ]);
    
    // Log opcional (comentar si no se necesita)
    $log_file = __DIR__ . '/contact-logs.txt';
    $log_entry = date('Y-m-d H:i:s') . " - Email enviado desde: $email ($name)\n";
    @file_put_contents($log_file, $log_entry, FILE_APPEND);
    
} else {
    // Error al enviar
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar el mensaje. Por favor, intenta contactarnos por WhatsApp.'
    ]);
    
    // Log del error
    error_log("Error sending email from contact form - From: $email");
}

exit;
