<?php
// ===========================
// Mamazu BnB Contact Form Handler
// ===========================

// Set headers for JSON response
header('Content-Type: application/json');

// Enable CORS if needed (adjust domain in production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Sanitize and validate input data
    $name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
    $preferredContact = isset($_POST['preferredContact']) ? trim(strip_tags($_POST['preferredContact'])) : 'email';
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    // If there are validation errors
    if (!empty($errors)) {
        $response['message'] = implode(', ', $errors);
        echo json_encode($response);
        exit;
    }
    
    // Prepare email content
    $to = 'mamazu@gmail.com'; // Replace with actual Mamazu BnB email
    $subject = 'New Contact Form Submission - Mamazu BnB';
    
    // Preferred contact method mapping
    $contactMethods = array(
        'email' => 'Email',
        'phone' => 'Phone Call',
        'whatsapp' => 'WhatsApp'
    );
    
    $contactMethodLabel = isset($contactMethods[$preferredContact]) ? $contactMethods[$preferredContact] : $preferredContact;
    
    // Email body
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0891b2, #0e7490); color: white; padding: 20px; text-align: center; }
            .content { background: #f8fafc; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0891b2; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🏠 New Contact Form Submission</h2>
                <p>Mamazu BnB - Greendale, Harare</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Phone:</div>
                    <div class='value'>" . htmlspecialchars($phone ? $phone : 'Not provided') . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Preferred Contact Method:</div>
                    <div class='value'>" . htmlspecialchars($contactMethodLabel) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from the contact form on Mamazu BnB website</p>
                <p>Received on: " . date('F j, Y, g:i a') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: Mamazu BnB Website <noreply@mamazubnb.com>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Send email
    $mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));
    
    if ($mailSent) {
        $response['success'] = true;
        $response['message'] = 'Thank you for contacting us! We will get back to you soon.';
        
        // Optional: Send auto-reply to the user
        $autoReplySubject = 'Thank you for contacting Mamazu BnB';
        $autoReplyBody = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0891b2, #0e7490); color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>🏠 Thank You for Contacting Mamazu BnB!</h2>
                </div>
                <div class='content'>
                    <p>Dear " . htmlspecialchars($name) . ",</p>
                    <p>Thank you for your interest in Mamazu BnB. We have received your message and will respond to your inquiry as soon as possible.</p>
                    <p>In the meantime, if you have any urgent questions, please feel free to contact us directly:</p>
                    <ul>
                        <li>Phone: +263 772 363 429</li>
                        <li>Email: mamazu@gmail.com</li>
                        <li>Location: Greendale, Harare</li>
                    </ul>
                    <p>We look forward to welcoming you to our executive luxury property!</p>
                    <p>Best regards,<br>Mamazu BnB Team</p>
                </div>
                <div class='footer'>
                    <p>Mamazu BnB - Executive Luxury Living in Greendale, Harare</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $autoReplyHeaders = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=utf-8',
            'From: Mamazu BnB <mamazu@gmail.com>',
            'X-Mailer: PHP/' . phpversion()
        );
        
        mail($email, $autoReplySubject, $autoReplyBody, implode("\r\n", $autoReplyHeaders));
        
    } else {
        $response['message'] = 'Sorry, there was an error sending your message. Please try again or contact us directly at +263 772 363 429';
    }
    
} else {
    $response['message'] = 'Invalid request method';
}

// Return JSON response
echo json_encode($response);
exit;
?>
