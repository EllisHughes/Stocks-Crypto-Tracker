/* FETCH BITCOIN PRICE */
function refreshData() {
    x = 10;
    fetch('https://api.coincap.io/v2/assets/bitcoin')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById(
                "cryptoPricesBitcoin"
            ).innerHTML = `$` + parseFloat(`${myJson.data.priceUsd}`).toLocaleString('en');


            document.getElementById(
                "btc24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;



        });

    fetch('https://api.coincap.io/v2/assets/ethereum')
        .then(function (response) {
            return response.json();

        })
        .then(function (myJson) {
            document.getElementById(
                "cryptoPricesEthereum"
            ).innerHTML = `$` + parseFloat(`${myJson.data.priceUsd}`).toFixed(2);

            document.getElementById(
                "eth24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;

        });

    fetch('https://api.coincap.io/v2/assets/litecoin')
        .then(function (response) {
            return response.json();

        })
        .then(function (myJson) {
            document.getElementById(
                "cryptoPricesLitecoin"
            ).innerHTML = `$` + parseFloat(`${myJson.data.priceUsd}`).toFixed(2);

            document.getElementById(
                "ltc24"
            ).innerHTML = parseFloat(`${myJson.data.changePercent24Hr}`).toFixed(2) + `%`;

        });

    setTimeout(refreshData, x * 1000);
}
refreshData();

/* FETCH ETHEREUM PRICE */


