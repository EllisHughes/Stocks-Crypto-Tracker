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


document.getElementById("Test").onclick = function () {

    fetch('https://api.coincap.io/v2/assets/bitcoin')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var price = parseFloat(myJson.data.priceUsd).toFixed(2);
            var GBP = price * 0.8;
            console.log
            bitcoinUSD = document.getElementById(
                "cryptoPricesBitcoin"
            ).innerHTML = `£` + parseFloat(`${GBP}`).toLocaleString('en');


            document.getElementById(
                "btc24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;
        });

}