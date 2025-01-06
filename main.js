const http = require('http');  // Importation du module http

// Créer un serveur
const server = http.createServer((req, res) => {
  // Définir l'en-tête de la réponse HTTP (type de contenu)
  res.setHeader('Content-Type', 'text/html');

  // Si la requête est de type POST sur /submit
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    // Collecte des données envoyées dans le corps de la requête
    req.on('data', chunk => {
      body += chunk;
    });

    // Lorsque toutes les données sont reçues, les traiter et afficher
    req.on('end', () => {
      // Décoder les données envoyées (par exemple, dans le format application/x-www-form-urlencoded)
      const params = new URLSearchParams(body);
      const name = params.get('name');
      const email = params.get('email');
      const password = params.get('password');
      const phone = params.get('phone');

      // Répondre avec les informations reçues
      res.statusCode = 200;
      res.end(`
        <h1>Informations reçues :</h1>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mot de passe:</strong> ${password}</p>
        <p><strong>Numéro de téléphone:</strong> ${phone}</p>
      `);
    });
  } else if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('<h1>Bienvenue sur mon serveur Web !</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>Page non trouvée</h1>');
  }
});

// Spécifier le port d'écoute du serveur
const port = 3000;
server.listen(port, '127.0.0.1', () => {
  console.log(`Le serveur écoute sur http://127.0.0.1:${port}`);
});
