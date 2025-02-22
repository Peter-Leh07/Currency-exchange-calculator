//vytvorenie premenných input output
let inputCurrency = null;
let outputCurrency = null;

//načítanie elementov z DOM
const dateOutput = document.getElementById("date");
const input = document.getElementById("input");
const btn = document.getElementById("convert-btn");
const switchBtn = document.getElementById("switch-btn")
const output = document.getElementById("output");
const table = document.getElementById("table")

//vytvorenie premenných na prepočet financií
let inputToEuroes = 0;
let euroesToOutput = 0;

// Zmena textu tlačidiel pre výber meny a získanie danej meny - input
document.querySelectorAll('.currency-input').forEach(item => {
    item.addEventListener('click', function () {
        const selectedText = this.innerHTML.trim();
        const selectedValue = this.getAttribute('data-value');
        document.getElementById('buttonInput').innerHTML = selectedText;
        inputCurrency = selectedValue;
        return inputCurrency
    });
});

// Zmena textu tlačidiel pre výber meny a získanie danej meny - output
document.querySelectorAll('.currency-output').forEach(item => {
    item.addEventListener('click', function () {
        const selectedText = this.innerHTML.trim();
        const selectedValue = this.getAttribute('data-value');
        document.getElementById('buttonOutput').innerHTML = selectedText;
        outputCurrency = selectedValue;
        return outputCurrency
    });
});

//kontorla či meny nie sú rovanké
const arentCurrencysSame = (curr1 , curr2) => {
    if(curr1 === curr2){
        alert("konverzia nie je potrebná - zadávate rovnakú menu")

        return false 
    }
    return true
}

//kontorla správneho vstupu 
const isInputInRightFormat = (inp) => {
    if(inp < 0){
        alert("hodnota meny nemôže byť menšia než nula")
        return false
    }
    if(inp === 0){
        alert("Vami zadaná hodnota je nula. Nula je nula v každej mene")
        return false
    }
    return true
}

//kontorla či bola zadaná nejaká mena
const areCurrencysValid = (curr1 , curr2) => {
    if(curr1 == null || curr2 == null){
        alert("Zadajte meny")
        return false
    }
    return true
}

//zmení input zo vstupnej meny do eur
const getExchangeToEuroes = (data , value , curr) => {
    if(value != null){
    const currencyData = data.currencys.find(item => item["acronym"] === curr);
    const exchangeRate = currencyData["exchange rate"]
    inputToEuroes = Math.floor(value / exchangeRate * 1000) /1000;
    console.log(inputToEuroes)
    }
    }

//zmení eurá na požadovanú menu
const getExchangeFromEuroes = (data , value , curr) => {
    if(value != null){
        const currencyData = data.currencys.find(item => item["acronym"] === curr);
        const exchangeRate = currencyData["exchange rate"]
        euroesToOutput =Math.floor(value * exchangeRate *1000) /1000;
        console.log(euroesToOutput)
        }
}

//získa dáta, spracuje zavolané funkcie slúžiace ako podmienky pre spustenie, vykreslí dáta
const fetchData = async () => {
    const url = "https://raw.githubusercontent.com/Peter-Leh07/Currency-exchange-calculator/refs/heads/main/currency.json";
    try {
        const res = await fetch(url);
        const data = await res.json(); 
        console.log(data)
        if(areCurrencysValid(inputCurrency , outputCurrency) && arentCurrencysSame(inputCurrency , outputCurrency) && isInputInRightFormat(input.value) ){
        getExchangeToEuroes(data , input.value, inputCurrency)
        getExchangeFromEuroes(data , inputToEuroes , outputCurrency)
        output.innerHTML = euroesToOutput}
    } catch (error) {
        alert("Pre načítanie dát sa pripojte k internetu")
    }
};


//spracovanie dátumu 
const getDate = () => {
    let date = new Date()
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    date = `Konverzie platné k dátumu: ${day}. ${month}. ${year}`
    dateOutput.innerHTML = date
}

//vytvorenie tabulky z arry-u
const createTable = (array , parentElement) => {
    for(let i = 0; i < array.length ; i++){
        let tr = document.createElement("tr");

        let name = document.createElement("td")
        let acronym = document.createElement("td")
        let exchangeRate = document.createElement("td")

        name.classList.add("text-start")
        name.classList.add("padding-left")
        acronym.classList.add("text-center")
        exchangeRate.classList.add("text-center")


        name.innerHTML = `<span class ="flag-icon ${array[i]["flag"]}"></span> ${array[i]["name"]}`
        acronym.textContent = `${array[i]["acronym"]}`
        exchangeRate.textContent = `${array[i]["exchange rate"]}`
        
        tr.appendChild(name);
        tr.appendChild(acronym);
        tr.appendChild(exchangeRate)

        parentElement.appendChild(tr)
    }
}

//funkcia na vypísanie tabulky na základe dát
const getTable = async() => {
    const url = "https://raw.githubusercontent.com/Peter-Leh07/Currency-exchange-calculator/refs/heads/main/currency.json";
    try {
        const res = await fetch(url);
        const data = await res.json(); 
        const arrayForTable = data.currencys
        createTable(arrayForTable , table)
    } catch (error) {
        alert("Pre načítanie dát sa pripojte k internetu")
    }
}
//addEvdntListener na spustenie výpočtu
btn.addEventListener("click" , () => {
    fetchData();
})


//zavolanie získania dátumu a vykreslenia tabulky hneď pri načítaní stránky
getDate()
getTable()

