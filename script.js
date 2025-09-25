// Création d'une fonction qui affichera les messages d'erreurs
const displayError = (message) => {
  const error = document.createElement('p')
  error.classList.add('red')
  error.textContent = message
  document.body.appendChild(error)
}

const getData = async () => {
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

console.log(conversion)
    

  }
  else {
    // Status code >= 300
    displayError("Une erreur est survenue")
  }
}

// On lance au chargement de la page l'appel API
getData()