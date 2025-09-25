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

    auto.addEventListener('change',async () => {
        let select1 = elements.value;
  let select2 = elements2.value;

      const response = await fetch(`https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/pair/${select1}/${select2}`)
        .catch(error => {
          console.error("Error:", error)
          displayError("Une erreur est survenue")
        });

      console.log(response)
      const data2 = await response.json();

      const container = document.querySelector(".resultat");
      let test;
      let conversion;
      let nombre = document.getElementById('nombre');



      conversion = data2.conversion_rate;

      test = Number(nombre.value) * conversion;

      container.innerHTML = test
    }

    nombre.addEventListener('input', () => {
      update()
    });
    auto.addEventListener('change', () => {
      update()
    });
       console.log(response)
   });




  } else {
    // Status code >= 300
    displayError("Une erreur est survenue")
  }
}
getData2()



