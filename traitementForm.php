<?php

header("Access-Control-Allow-Origin: index.html");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données JSON depuis la requête POST
    $data = json_decode(file_get_contents("php://input"), true);
    // Extraire les valeurs
    $nom = $data['nom'];
    $mail = $data['mail'];
    $numero = $data['numero'];
    $message = $data['message'];

    // Envoyer l'e-mail
    $to = "esdrone83@gmail.com";
    $subject = "Nouveau message du formulaire de contact";
    $headers = "From: $mail\r\n";

    $messageContent = "Nom: $nom\n";
    $messageContent .= "E-mail: $mail\n";
    $messageContent .= "Numéro: $numero\n";
    $messageContent .= "Message:\n$message";

    // Utilisez la fonction mail pour envoyer l'e-mail
    mail($to, $subject, $messageContent, $headers);
} 