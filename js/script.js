let coins = 0;

const coin = document.getElementById("cookie");
const counter = document.getElementById("cookieCount");

function updateDisplay() {
    counter.textContent = coins + " Monedas";
}

coin.addEventListener("click", () => {
    coins++;
    updateDisplay();
});

updateDisplay();
