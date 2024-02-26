const iconeMenu = document.querySelector(".fa-bars"); // pour le menu mobile
const menuMobile = document.querySelector(".div-menu-mobile"); // pour le menu mobile

// regex email
// Fonction pour valider une adresse e-mail avec une expression régulière
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const msgError = document.querySelectorAll('.error') //pour les div erreurs du formulaire






// Traitements

// traitements pour le menu mobile

iconeMenu.addEventListener("click", function () {
  menuMobile.classList.toggle("div-monte-descend");
  iconeMenu.classList.toggle("rotation");
});

menuMobile.addEventListener("click", function () {
  menuMobile.classList.toggle("div-monte-descend");
  iconeMenu.classList.toggle("rotation");
});


// Gestion du formulaire

// verification puis stockage des données apres appuie sur le bouton envoyer
// je stock dans des constantes les inputs
const monFormulaire = document.getElementById("monFormulaire");
const nom = document.getElementById("nom");
const mail = document.getElementById("mail");
const numero = document.getElementById("numero");
const message = document.getElementById("message");
const captcha = document.getElementById("captcha");
// gestion du captcha
const captchaLabel = document.getElementById('labelCaptcha')
// Générer deux nombres aléatoires
const nombre1 = Math.floor(Math.random() * 10); // Vous pouvez ajuster la plage selon vos besoins
const nombre2 = Math.floor(Math.random() * 10);

// Calculer la somme des deux nombres
const resultatAttendu = nombre1 + nombre2;

// Afficher la somme dans l'input captcha
captchaLabel.innerHTML = ` Captcha : Combien font ${nombre1} + ${nombre2} ?`;

// Au moment du click je recupère les valeurs des inputs
monFormulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  // reinitialisons les messages d'erreur du formulaire 
  msgError.forEach(error =>{
    error.classList.add('invisible');
  })


  console.log("formulaire envoyé");
  const nomValue = nom.value.trim();
  console.log(nomValue);
  const mailValue = mail.value.trim();
  console.log(mailValue);
  const numeroValue = numero.value.trim();
  console.log(numeroValue);
  const messageValue = message.value.trim();
  console.log(messageValue);
  const captchaValue = captcha.value.trim();
  console.log(captchaValue);


  // verifications données formulaire avant envoie au serveur

  let verificationNom, verificationMail, verificationMessage, verificationCaptcha;


if(nomValue.length<2 || nomValue.length>20)
{
  console.log("Veuillez entrer une valeur comprise entre 2 et 20 carcatères s'il vous plait")
  nom.nextElementSibling.classList.remove('invisible');
} else 
{
   console.log('nom Ok') ; 
   verificationNom = 1;
}

if (!isValidEmail(mailValue))
  {console.log("Erreur : Email invalide")  ;
  mail.nextElementSibling.classList.remove('invisible');
} else {
  console.log('Email ok');
   verificationMail = 1;

}

if (messageValue.length < 5 || messageValue.length>100 ){
  console.log("Veuillez saisir un message compris entre minimum 5 et maximum 100 cractères s'il vous plait");
  message.nextElementSibling.classList.remove('invisible');
} else {
  console.log('Message ok ');
  verificationMessage = 1;
}

if (captchaValue != resultatAttendu) {
  console.log("Erreur : la saisie du cpatcha n'est pas correcte");
  captcha.nextElementSibling.classList.remove('invisible');
} else {
  ( console.log("Captcha ok "))
  verificationCaptcha =1}


// validation du formulaire et envoie des données !

if (verificationNom === 1 && verificationMail === 1 && verificationMessage === 1 && verificationCaptcha === 1) {
  console.log("bien ouej bébé ");
  nom.disabled = true;
  mail.disabled = true;
  numero.disabled = true;
  message.disabled = true;
  captcha.disabled = true;
  document.querySelector('.paragraphe-contacts-invisible').style.opacity = 1
  setTimeout(() => {
    document.querySelector('.paragraphe-contacts-invisible2').style.opacity = 1
   
    
  }, 400);

  // gestion de l'envoi au server des données , encodées en JSON

   // Validation réussie, préparer les données pour l'envoi
   const formData = {
    nom: nomValue,
    mail: mailValue,
    numero: numeroValue,
    message: messageValue,
    captcha: captchaValue,
  };

  // Envoyer les données JSON à traitementForm.php via AJAX
  fetch('traitementForm.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nom: nomValue,
        mail: mailValue,
        numero: numeroValue,
        message: messageValue,
        captcha: captchaValue,
    }),
})
    .then(response => response.json())
    .then(data => {
        console.log(data); // Afficher la réponse JSON reçue du serveur
        // Traiter la réponse ici
    })
    .catch(error => {
        console.error('Erreur lors de la requête fetch :', error);
        // Afficher un message d'erreur dans la console ou prendre d'autres mesures nécessaires
    });

}

});
