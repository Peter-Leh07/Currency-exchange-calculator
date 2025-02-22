const civ = document.getElementById("change-due");
const money = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const Cashregister = document.getElementById("register");
let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const coinValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
let numberOfUsedCoins = new Array(9).fill(0);
let exchange = 0;

// Initialize register display
const updateRegisterDisplay = () => {
  Cashregister.innerHTML = `
    <p>Peniaze v pokladni:</p>
    <p>Pennies: $${cid[0][1]}</p>
    <p>Nickels: $${cid[1][1]}</p>
    <p>Dimes: $${cid[2][1]}</p>
    <p>Quarters: $${cid[3][1]}</p>
    <p>Ones: $${cid[4][1]}</p>
    <p>Fives: $${cid[5][1]}</p>
    <p>Tens: $${cid[6][1]}</p>
    <p>Twenties: $${cid[7][1]}</p>
    <p>Hundreds: $${cid[8][1]}</p>
  `;
};
updateRegisterDisplay();

const getExchange = (moneyValue, price) => {
  exchange = Math.round((moneyValue - price) * 100) / 100;
  if (exchange < 0) {
    alert("Používateľ nezadal dostatok financií na kúpu predmetu");
    return false;
  } else if (exchange === 0) {
    civ.innerHTML = "Nemožné vydať - nedostatok financií v pokladni";
    return false;
  }
  return true;
};

const calculateChange = (exchange, values, cid) => {
  const change = [];
  for (let i = values.length - 1; i >= 0; i--) {
    let coinValue = values[i];
    let coinAmount = cid[i][1];
    let coinsToGive = 0;

    while (exchange >= coinValue && coinAmount >= coinValue) {
      exchange = Math.round((exchange - coinValue) * 100) / 100;
      coinAmount = Math.round((coinAmount - coinValue) * 100) / 100;
      coinsToGive++;
    }

    change.push(coinsToGive);
    cid[i][1] = coinAmount; // Update the register
  }

  if (exchange > 0) {
    return null;
  }

  return change.reverse(); // Reverse to match original order
};

const register = () => {
  const moneyValue = parseFloat(money.value);
  if (!getExchange(moneyValue, price)) return;

  const change = calculateChange(exchange, coinValues, cid);
  if (change) {
    numberOfUsedCoins = change;
    updateRegisterDisplay();
    civ.innerHTML = `<p>Status: OPEN</p>`;
    change.forEach((coins, index) => {
if (coins > 0) {
        civ.innerHTML += `<p> ${cid[index][0]}: $${coins * coinValues[index]}</p>`;
      }

    });
  }
  else{
    civ.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }
  numberOfUsedCoins = [];
};

purchaseBtn.addEventListener("click", register);   