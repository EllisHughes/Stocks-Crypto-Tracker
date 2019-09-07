// FETCH FX RATES UPON PAGE LOAD //
fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
    .then(function (response) {
        return response.json()
    })
    .then(function (myJson) {
        var GBP = (myJson.rates.GBP)
    });

fetch(`https://api.exchangeratesapi.io/latest?base=GBP`)
    .then(function (response) {
        return response.json()
    })
    .then(function (myJson) {
        var USD = (myJson.rates.USD)
    });

function refreshData() {
    x = 30;
    fetch('https://api.coincap.io/v2/assets/bitcoin')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var price = parseFloat(myJson.data.priceUsd).toFixed(2);
            bitcoinUSD = document.getElementById(
                "cryptoPricesBitcoin"
            ).innerHTML = `$` + parseFloat(`${price}`).toLocaleString('en');


            document.getElementById(
                "btc24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;
        });

    fetch('https://api.coincap.io/v2/assets/ethereum')
        .then(function (response) {
            return response.json();

        })
        .then(function (myJson) {
            var price = parseFloat(myJson.data.priceUsd).toFixed(2);
            document.getElementById(
                "cryptoPricesEthereum"
            ).innerHTML = `$` + parseFloat(`${price}`).toLocaleString('en');

            document.getElementById(
                "eth24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;

        });

    fetch('https://api.coincap.io/v2/assets/litecoin')
        .then(function (response) {
            return response.json();

        })
        .then(function (myJson) {
            var price = parseFloat(myJson.data.priceUsd).toFixed(2);
            document.getElementById(
                "cryptoPricesLitecoin"
            ).innerHTML = `$` + parseFloat(`${price}`).toLocaleString('en');

            document.getElementById(
                "ltc24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;

        });

    setTimeout(refreshData, x * 1000);
}
refreshData();



