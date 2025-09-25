// Création d'une fonction qui affichera les messages d'erreurs
const displayError = (message) => {
  const error = document.createElement('p')
  error.classList.add('red')
  error.textContent = message
  document.body.appendChild(error)
}
 
// Création d'une fonction qui appel l'API
const getData = async () => {
  const response = await fetch("https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/latest/USD")
    .catch(error => {
      console.error("Error:", error)
      displayError("Une erreur est survenue")
    });
 
  // Si la réponse est correcte
  if(response.status < 300){
    // On récupère le corps de la requête
    const data = await response.json();
    // On prépare une chaine de caractère vide
    let content = "";
    const rates = data.conversion_rates;
    // On parcours tout ce que l'API a retourné
    Object.entries(rates).forEach(([currency],index) => {
        content += `<option value="${index}>${currency}</option>`;
    });
    // On crée puis affiche le contenu retourné par l'API
    const elements = document.getElementById('money_select')
    elements.innerHTML = content
    document.body.appendChild(elements)
    console.log(content)
  }
  else{
    // Status code >= 300
    displayError("Une erreur est survenue")
  }
}
 
// On lance au chargement de la page l'appel API
getData()