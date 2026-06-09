const game = {
    coins: 0,
    totalCoins: 0,

    clickPower: 1,

    currentRole: "Vagabundo",

    pps: 0,

    clicks: 0
};

const coin = document.getElementById("coin");
const counter = document.getElementById("coinCount");
const ppsText = document.getElementById("pps");

function formatNumber(num){
    return num.toLocaleString();
}

function updateUI(){

    counter.textContent =
        formatNumber(game.coins) + " PejeCoins";

    ppsText.textContent =
        game.pps + " PPS";
}

coin.addEventListener("click", () => {

    game.coins += game.clickPower;
    game.totalCoins += game.clickPower;
    game.clicks++;

    updateUI();

});

updateUI();
