

// Création d'une fonction qui appel l'API
const getData = async () => {
  const response2 = await fetch("https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/latest/USD")
    .catch(error => {
      console.error("Error:", error)
      displayError("Une erreur est survenue")
    });
 
  // Si la réponse est correcte
  if(response2.status < 300){
    // On récupère le corps de la requête
    const data = await response2.json();
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
    const elements2 = document.getElementById('money_select2')
    elements2.innerHTML = content
    document.body.appendChild(elements2)
    console.log(content)
  }
  else{
    // Status code >= 300
    displayError("Une erreur est survenue")
  }
}
 
// On lance au chargement de la page l'appel API
getData()

const getData2 = async () => {
  let devise1 = document.getElementById('money_select').value;
  let devise2 = document.getElementById('money_select2').value;
  const response = await fetch(`https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/pair/${devise1}/${devise2}`)
    .catch(error => {
      console.error("Error:", error)
      displayError("Une erreur est survenue")
    });

    console.log(response)
  if (response.status < 300) {
    const data = await response.json();

    const container = document.querySelector(".resultat");
    let test;
    let conversion;
    let nombre = document.getElementById('nombre');
    conversion = data.conversion_rate;
    nombre.addEventListener('input', () => {
     
      test = Number(nombre.value) * conversion;
      container.innerHTML = test
    });
    

  }
  else {
    // Status code >= 300
    displayError("Une erreur est survenue")
  }
}

// On lance au chargement de la page l'appel API
getData2()