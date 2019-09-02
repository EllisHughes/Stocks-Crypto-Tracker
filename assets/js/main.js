// var companies = [

//     'Abeona Therapeutics Inc. ABEO',
//     'Abeona Therapeutics Inc. ABEOW',
//     'Ability Inc. ABIL',
//     'ABIOMED, Inc. ABMD',
//     'Abraxas Petroleum Corporation AXAS',
//     'AC Immune SA ACIU',
//     'Acacia Communications, Inc. ACIA',
//     'Acacia Research Corporation ACTG',
//     'Acadia Healthcare Company, Inc. ACHC',
//     'ACADIA Pharmaceuticals Inc. ACAD',
//     'Acamar Partners Acquisition Corp. ACAM',
//     'Acamar Partners Acquisition Corp. ACAMU',
//     'Acamar Partners Acquisition Corp. ACAMW',
//     'Acasti Pharma, Inc. ACST',
//     'Accelerate Diagnostics, Inc. AXDX',
//     'Acceleron Pharma Inc. XLRN',
//     'Accuray Incorporated ARAY',
//     'AcelRx Pharmaceuticals, Inc. ACRX',
//     'Acer Therapeutics Inc. ACER',
//     'Bitcoin BTC',
//     'Ethereum ETH',
// ];

var typingTimer; //timer identifier
var doneTypingInterval = 1; //time in ms, 5 second for example
var $input = $("#myInput");

//on keyup, start the countdown
$input.on("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on("keydown", function () {
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping() {
    console.log($input.val());
    var search = $input.val();
    // fetch(
    //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=1YK0TA3NL2XSK2QF`
    // )
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(myJson) {

    //     for (let i = 0; i < 5; i++) {
    //     const match = myJson.bestMatches[i];
    //     const symbol = match["1. symbol"];
    //     const name = match["2. name"];
    //     companies.push(`${name} (${symbol})`);
    // }
    // console.log(companies);
    autocomplete(document.getElementById("myInput"), companies);
    // });
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML =
                    "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var tag = this.getElementsByTagName("input")[0].value;

                    function test(input) {
                        var n = input.split(" ");
                        return n[n.length - 1];
                    }
                    //tag.match(/\((.*)\)/);
                    var n = tag.split(" ");
                    n = n[n.length - 1];
                    console.log(n)

                    fetch(
                        `https://cloud.iexapis.com/stable/stock/${
                        n
                        }/quote?token=pk_e9e24d928d1f4b4e8b5565d2561c4bb1`
                    )

                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (myJson) {
                            console.log(myJson.latestPrice);

                            document.getElementById(
                                "price"
                            ).innerHTML = `$${myJson.latestPrice}`;

                            inp.addEventListener("keydown", function (e) {
                                if (e.keyCode == 8) {
                                    document.getElementById(
                                        "price"
                                    ).innerHTML = ``;
                                    document.getElementById(
                                        "myInput"
                                    ).innerHTML = ``;
                                }
                            })
                        });

                       
                    // fetch(
                    //     `https://min-api.cryptocompare.com/data/price?fsym=${
                    //     n
                    //     }&tsyms=USD&api_key={c41d7c8ed5f3e85062a7e70d68d0c98810bb7caab5310dadf7bfa649db78e350}`)

                    //     .then(function (response) {
                    //         return response.json();

                    //     })
                    //     .then(function (myJson) {
                    //         console.log(myJson.USD);

                    //         document.getElementById(
                    //             "price"
                    //         ).innerHTML = `$${myJson.USD}`;
                    //     });

                    /*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
		except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });


    /* Clears text in price when backspace is pressed*/
    // inp.addEventListener("keydown", function (e) {
    //     if (e.keyCode == 8) {
    //         document.getElementById(
    //             "price"
    //         ).innerHTML = ``;
    //         document.getElementById(
    //             "myInput"
    //         ).innerHTML = ``;
    //     }
    // })
}
