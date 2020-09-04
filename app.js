//ExchangeRate-API
//https://www.exchangerate-api.com/
//https://open.exchangerate-api.com/v6/latest
//API key
//c4f8d9e7b93e1781e094878b
//sample request
//https://v6.exchangerate-api.com/v6/c4f8d9e7b93e1781e094878b/latest/USD

//global variables
const currencyEL_one = document.querySelector("#currency-one");
const currencyEL_two = document.querySelector("#currency-two");
const amountEL_one = document.querySelector("#amount-one");
const amountEL_two = document.querySelector("#amount-two");
const rateEl = document.querySelector("#rate");
const swapBtn = document.querySelector("#swap");
const baseCurrencyExchangeURL =
  "https://v6.exchangerate-api.com/v6/c4f8d9e7b93e1781e094878b/latest/";

//fecth exchange rates and update the DOM accordingly
function calculate() {
  const currency_one = currencyEL_one.value;
  // console.log(currency_one);
  const currency_two = currencyEL_two.value;
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

    amountEL_two = (amountEL_one.value * rate).toFixed(2);
  });
}

//event listeners
currencyEL_one.addEventListener("change", calculate);
amountEL_one.addEventListener("input", calculate);
currencyEL_two.addEventListener("change", calculate);
amountEL_two.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  const temp = currencyEL_one.value;
  currencyEL_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
})

calculate();
