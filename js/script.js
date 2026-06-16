const game = {
    coins: 0,
    totalCoins: 0,

    clickPower: 1,

    currentRole: "Vagabundo",

    ownedRoles: ["Vagabundo"],

    ownedGenerators: {
        "Refinería": 0,
        "Tren Maya": 0,
        "Aeropuerto": 0,
        "Becas Bienestar": 0,
        "Pemex": 0,
        "Palacio Nacional": 0,
        "Cámara de Diputados": 0,
        "Presidencia": 0
    },

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

const generators = [
    {
        name: "Refinería",
        pps: 1,
        basePrice: 25
    },
    {
        name: "Tren Maya",
        pps: 5,
        basePrice: 150
    },
    {
        name: "Aeropuerto",
        pps: 25,
        basePrice: 1000
    },
    {
        name: "Becas Bienestar",
        pps: 100,
        basePrice: 7500
    },
    {
        name: "Pemex",
        pps: 500,
        basePrice: 50000
    },
    {
        name: "Palacio Nacional",
        pps: 2500,
        basePrice: 500000
    },
    {
        name: "Cámara de Diputados",
        pps: 10000,
        basePrice: 5000000
    },
    {
        name: "Presidencia",
        pps: 50000,
        basePrice: 50000000
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

    roleText.textContent =
        `Rol: ${game.currentRole} (${game.clickPower}x)`;
}

function buyRole(index) {

    const role = roles[index];

    if (
        game.ownedRoles.includes(
            role.name
        )
    ) {
        return;
    }

    if (game.coins < role.price) {

        alert(
            "No tienes suficientes PejeCoins"
        );

        return;
    }

    game.coins -= role.price;

    game.currentRole =
        role.name;

    game.clickPower =
        role.multiplier;

    game.ownedRoles.push(
        role.name
    );

    updateUI();

    renderRoles();

    if (
        typeof saveGame ===
        "function"
    ) {
        saveGame();
    }
}

function renderRoles() {

    const container =
        document.getElementById(
            "rolesContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    roles.forEach((role, index) => {

        const item =
            document.createElement(
                "div"
            );

        item.className =
            "shop-item";

        let buttonHTML = "";

        if (
            role.name ===
            game.currentRole
        ) {

            buttonHTML =
                `
                <button disabled>
                    ACTIVO
                </button>
                `;

        } else if (
            game.ownedRoles.includes(
                role.name
            )
        ) {

            buttonHTML =
                `
                <button disabled>
                    COMPRADO
                </button>
                `;

        } else {

            buttonHTML =
                `
                <button class="buy-btn">
                    Comprar
                </button>
                `;
        }

        item.innerHTML = `
            <div>
                <strong>
                    ${role.name}
                </strong>
                <br>
                ${formatNumber(role.price)}
                PC
            </div>

            ${buttonHTML}
        `;

        const button =
            item.querySelector(
                ".buy-btn"
            );

        if (button) {

            button.addEventListener(
                "click",
                () => {
                    buyRole(index);
                }
            );
        }

        container.appendChild(
            item
        );

    });
}

coin.addEventListener(
    "click",
    (event) => {

        game.coins +=
            game.clickPower;

        game.totalCoins +=
            game.clickPower;

        game.clicks++;

        createFloatingText(
            event
        );

        updateUI();
    }
);

function createFloatingText(
    event
) {

    const text =
        document.createElement(
            "div"
        );

    text.className =
        "floating-text";

    text.textContent =
        "+" +
        game.clickPower;

    text.style.left =
        event.pageX +
        "px";

    text.style.top =
        event.pageY +
        "px";

    document.body.appendChild(
        text
    );

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

setInterval(() => {

    game.playTime++;

}, 1000);

updateUI();
const devButton =
    document.getElementById(
        "devButton"
    );

const devPanel =
    document.getElementById(
        "devPanel"
    );

devButton.addEventListener(
    "click",
    () => {

        devPanel.classList.toggle(
            "open"
        );

    }
);

document
.getElementById(
    "addCoinsButton"
)
.addEventListener(
    "click",
    () => {

        const amount =
            Number(
                document.getElementById(
                    "addCoinsInput"
                ).value
            );

        if (!amount) return;

        game.coins += amount;

        updateUI();

        if (
            typeof saveGame ===
            "function"
        ) {
            saveGame();
        }
    }
);

document
.getElementById(
    "removeCoinsButton"
)
.addEventListener(
    "click",
    () => {

        const amount =
            Number(
                document.getElementById(
                    "removeCoinsInput"
                ).value
            );

        if (!amount) return;

        game.coins -= amount;

        if (game.coins < 0) {

            game.coins = 0;

        }

        updateUI();

        if (
            typeof saveGame ===
            "function"
        ) {
            saveGame();
        }
    }
);

renderRoles();

function calculatePPS() {

    let total = 0;

    generators.forEach(generator => {

        total +=
            generator.pps *
            game.ownedGenerators[
                generator.name
            ];

    });

    game.pps = total;
}

function buyGenerator(index) {

    const generator =
        generators[index];

    const owned =
        game.ownedGenerators[
            generator.name
        ];

    const price =
        Math.floor(
            generator.basePrice *
            Math.pow(1.15, owned)
        );

    if (
        game.coins < price
    ) {
        return;
    }

    game.coins -= price;

    game.ownedGenerators[
        generator.name
    ]++;

    calculatePPS();

    updateUI();

    renderGenerators();

    saveGame();
}

function renderGenerators() {

    const container =
        document.getElementById(
            "generatorsContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    generators.forEach(
        (generator, index) => {

            const owned =
                game.ownedGenerators[
                    generator.name
                ];

            const price =
                Math.floor(
                    generator.basePrice *
                    Math.pow(
                        1.15,
                        owned
                    )
                );

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "shop-item";

            item.innerHTML = `
                <div>
                    <strong>
                        ${generator.name}
                    </strong>
                    <br>
                    ${owned} comprados
                    <br>
                    +${formatNumber(
                        generator.pps
                    )} PPS
                </div>

                <button>
                    ${formatNumber(
                        price
                    )} PC
                </button>
            `;

            item
            .querySelector(
                "button"
            )
            .addEventListener(
                "click",
                () => {
                    buyGenerator(
                        index
                    );
                }
            );

            container.appendChild(
                item
            );
        }
    );
}

setInterval(() => {

    game.coins +=
        game.pps;

    game.totalCoins +=
        game.pps;

    updateUI();

}, 1000);

calculatePPS();

renderGenerators();
