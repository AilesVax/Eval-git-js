fetch("https://url.https://v6.exchangerate-api.com/v6/7008e2ab61722b071e7bf8fe/endpoint")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

  