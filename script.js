const getData2 = async () => {
const key = "423d70fb928c5caf0e35b2d2";
const api = "https://v6.exchangerate-api.com/v6/"
  const response2 = await fetch(`${api}${key}/latest/USD`)

  if (response2.status < 300) {
    const data = await response2.json();
    let content = "";
    const rates = data.conversion_rates;
    let auto = document.getElementById('auto');

    for (let All_devise in rates) {
      content += `<option value="${All_devise}">${All_devise}</option>`;
    }
    let elements = document.getElementById('money_select')
    elements.innerHTML = content

    let elements2 = document.getElementById('money_select2')
    elements2.innerHTML = content
    async function update() {
      let select1 = elements.value;
      let select2 = elements2.value;

      const response = await fetch(`${api}${key}/pair/${select1}/${select2}`)
        .catch(error => {
          console.error("Error:", error)
          displayError("Une erreur est survenue")
        });


      const data2 = await response.json();

      const container = document.querySelector(".resultat");
      let test;
      let conversion;
      let nombre = document.getElementById('nombre');



      conversion = data2.conversion_rate;

      test = Number(nombre.value) * conversion;

      container.innerHTML = test + "&nbsp" + select2 + "<br>" 
      
      let hist = localStorage.getItem('historique') || "";


      const Date_actuelle = new Date()

      let tout =  `${Date_actuelle.getDay()}/${Date_actuelle.getMonth()}/${Date_actuelle.getFullYear()}  : ${Number(nombre.value)} ${select1} = ${test} ${select2} <br>`;
      hist += tout 
      console.log(hist);
      localStorage.setItem('historique', hist);
      let histAff = document.getElementsByClassName('historique')[0];
      histAff.innerHTML = hist + "<br>" 
    }

    nombre.addEventListener('input', () => {
      update()
    });
    auto.addEventListener('change', () => {
      update()

    }); 






  } else {
    // Status code >= 300
    displayError("Une erreur est survenue")
  }
}
getData2()