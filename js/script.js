const game = {
    coins: 0,
    totalCoins: 0,

    clickPower: 1,

    currentRole: "Vagabundo",

    pps: 0,

    clicks: 0,

    playTime: 0
};

const roles = [
    {
        name: "Vagabundo",
        multiplier: 1,
        price: 0
    },
    {
        name: "Limosnero",
        multiplier: 2,
        price: 1000
    },
    {
        name: "Limpia vidrios",
        multiplier: 5,
        price: 10000
    },
    {
        name: "Botarga Dr. Simi",
        multiplier: 10,
        price: 100000
    },
    {
        name: "Cajero del Oxxo",
        multiplier: 25,
        price: 1000000
    },
    {
        name: "Taquero",
        multiplier: 50,
        price: 10000000
    },
    {
        name: "Empresario",
        multiplier: 100,
        price: 100000000
    },
    {
        name: "Narco",
        multiplier: 250,
        price: 1000000000
    },
    {
        name: "AMLO",
        multiplier: 1000,
        price: 10000000000
    }
];

const coin = document.getElementById("coin");
const counter = document.getElementById("coinCount");
const ppsText = document.getElementById("pps");
const roleText = document.getElementById("currentRole");

const shopButton =
    document.getElementById("shopButton");

const shopPanel =
    document.getElementById("shopPanel");

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

    if (roleText) {

        roleText.textContent =
            `Rol: ${game.currentRole} (${game.clickPower}x)`;
    }
}

function buyRole(index) {

    const role = roles[index];

    if (game.coins < role.price) {

        return false;

    }

    game.coins -= role.price;

    game.currentRole =
        role.name;

    game.clickPower =
        role.multiplier;

    updateUI();

    if (typeof saveGame === "function") {

        saveGame();

    }

    return true;
}

coin.addEventListener("click", (event) => {

    game.coins += game.clickPower;

    game.totalCoins +=
        game.clickPower;

    game.clicks++;

    createFloatingText(event);

    updateUI();
});

function createFloatingText(event) {

    const text =
        document.createElement("div");

    text.className =
        "floating-text";

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

shopButton.addEventListener(
    "click",
    () => {

        shopPanel.classList.toggle(
            "open"
        );

    }
);

function renderRoles() {

    const container =
        document.getElementById(
            "rolesContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    roles.forEach((role, index) => {

        const item =
            document.createElement("div");

        item.className =
            "shop-item";

        item.innerHTML = `
            <div>
                <strong>${role.name}</strong><br>
                ${formatNumber(role.price)} PC
            </div>

            <button>
                Comprar
            </button>
        `;

        const button =
            item.querySelector("button");

        button.addEventListener(
            "click",
            () => {

                const purchased =
                    buyRole(index);

                if (purchased) {

                    renderRoles();

                    alert(
                        "Ahora eres " +
                        role.name
                    );

                } else {

                    alert(
                        "No tienes suficientes PejeCoins"
                    );

                }

            }
        );

        container.appendChild(item);

    });

}

setInterval(() => {

    game.playTime++;

}, 1000);

updateUI();

renderRoles();
