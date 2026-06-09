const game = {
    coins: 0,
    totalCoins: 0,

    clickPower: 1,

    currentRole: "Vagabundo",

    pps: 0,

    clicks: 0,

    playTime: 0
};

const coin = document.getElementById("coin");
const counter = document.getElementById("coinCount");
const ppsText = document.getElementById("pps");

function formatNumber(num) {

    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + "T";
    }

    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + "B";
    }

    if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + "M";
    }

    if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + "K";
    }

    return Math.floor(num).toString();
}

function updateUI() {

    counter.textContent =
        formatNumber(game.coins) + " PejeCoins";

    ppsText.textContent =
        formatNumber(game.pps) + " PPS";
}

coin.addEventListener("click", (event) => {

    game.coins += game.clickPower;
    game.totalCoins += game.clickPower;
    game.clicks++;

    createFloatingText(event);

    updateUI();
});

function createFloatingText(event) {

    const text = document.createElement("div");

    text.className = "floating-text";

    text.textContent =
        "+" + game.clickPower;

    text.style.left =
        event.pageX + "px";

    text.style.top =
        event.pageY + "px";

    document.body.appendChild(text);

    setTimeout(() => {
        text.remove();
    }, 1000);
}

setInterval(() => {

    game.playTime++;

}, 1000);

updateUI();

loadGame();
