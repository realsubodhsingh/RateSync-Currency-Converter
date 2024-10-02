
        const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
        const dropdowns = document.querySelectorAll(".dropdown select"); // Selects both dropdowns
        const btn = document.querySelector("form button")
        const fromCurr = document.querySelector(".from select")
        const toCurr = document.querySelector(".to select")
        const msg = document.querySelector(".msg");

        document.addEventListener("load", () => {
            updateExchangeRate()
        })

        for (let select of dropdowns) { // Loop over both dropdowns
            for (let currCode in countryList) { // Loop over the countryList to populate options
                let newOption = document.createElement("option");
                newOption.innerText = currCode;
                newOption.value = currCode;
                if (select.name == "from" && currCode == "USD") {
                    newOption.selected = "selected";
                }
                else if (select.name == "to" && currCode == "INR") {
                    newOption.selected = "selected"
                }
                select.append(newOption); // Append options to each dropdown
            }

            select.addEventListener("change", (event) => {
                updateFlag(event.target)
            })
        }

        // logic for the conversion of the money
        const updateExchangeRate = async () => {

            let amount = document.querySelector(".amount input")
            let amtVal = amount.value
            if (amtVal === "" || amtVal < 1) {
                amtVal = 1
                amount.value = "1"
            }
            const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
            let response = await fetch(URL)
            let data = await response.json()
            let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
            let finalAmount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
        }


        // logic for updating the country flags with the country selected
        const updateFlag = (element) => {
            let currCode = element.value
            let countryCode = countryList[currCode]; // IN, EU
            let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
            let img = element.parentElement.querySelector("img")
            img.src = newSrc
        }


        btn.addEventListener("click", (evt) => {
            evt.preventDefault()
            updateExchangeRate()
        })


        window.addEventListener("load", () => {
            updateExchangeRate();
        });
    