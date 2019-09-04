function refreshData() {
    x = 30;
    fetch('https://api.coincap.io/v2/assets/bitcoin')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById(
                "cryptoPricesBitcoin"
            ).innerHTML = `$` + parseFloat(`${myJson.data.priceUsd}`).toFixed(2);

            console.log(myJson.data.changePercent24Hr)
        });

    setTimeout(refreshData, x * 1000);
}
refreshData();