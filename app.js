//ExchangeRate-API
//https://www.exchangerate-api.com/
//https://open.exchangerate-api.com/v6/latest
//API key
//c4f8d9e7b93e1781e094878b
//sample request
//https://v6.exchangerate-api.com/v6/c4f8d9e7b93e1781e094878b/latest/USD

//global variables
const currencyEl_one = document.querySelector("#currency-one");
const currencyEl_two = document.querySelector("#currency-two");
const amountEl_one = document.querySelector("#amount-one");
const amountEl_two = document.querySelector("#amount-two");
const rateEl = document.querySelector("#rate");
const swapBtn = document.querySelector("#swap");
const baseCurrencyExchangeURL =
  "https://v6.exchangerate-api.com/v6/c4f8d9e7b93e1781e094878b/latest/";

//fecth exchange rates and update the DOM accordingly
function calculate() {
  const currency_one = currencyEl_one.value;
  // console.log(currency_one);
  const currency_two = currencyEl_two.value;
  // console.log(currency_two);
  searchCurrencyExchangeURL = baseCurrencyExchangeURL + currency_one;

  $.ajax({
    url: searchCurrencyExchangeURL,
    method: "GET",
  }).then((currencyData) => {
    console.log(currencyData);
    const rate = currencyData.conversion_rates[currency_two];
    // console.log(rate);
    rateEl.innerText = `1 ${currency_one} is equal to ${rate} ${currency_two}`;

    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
  });
}

//event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swapBtn.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
})

calculate();
