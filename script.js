const getData2 = async () => {

  const response2 = await fetch("https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/latest/USD")

  if (response2.status < 300) {
    const data = await response2.json();
    let content = "";
    const rates = data.conversion_rates;
    let auto = document.getElementById('auto');

    for (let currency in rates) {
      content += `<option value="${currency}">${currency}</option>`;
    }
    let elements = document.getElementById('money_select')
    elements.innerHTML = content

    let elements2 = document.getElementById('money_select2')
    elements2.innerHTML = content
    async function update() {
      let select1 = elements.value;
      let select2 = elements2.value;

      const response = await fetch(`https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/pair/${select1}/${select2}`)
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

      container.innerHTML += test + "&nbsp" + select2 + "<br>" 
      
      let hist = localStorage.getItem('historique');

      let tout =  `${new Date()} : ${Number(nombre.value)} ${select1} = ${test} ${select2} \n`;
      hist += tout 
      console.log(hist);
      localStorage.setItem('historique', hist);
    localStorage.clear();
      let histAff = document.getElementsByClassName('historique')[0];
      histAff.innerHTML += hist
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


