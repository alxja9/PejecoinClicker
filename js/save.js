function saveGame() {

    localStorage.setItem(
        "pejeClickerSave",
        JSON.stringify(game)
    );

    const saveStatus =
        document.getElementById("saveStatus");

    if (saveStatus) {

        saveStatus.textContent =
            "💾 Juego guardado";

        setTimeout(() => {

            saveStatus.textContent =
                "✔ Guardado automático activo";

        }, 2000);
    }
}

function loadGame() {

    const save =
        localStorage.getItem(
            "pejeClickerSave"
        );

    if (!save) return;

    const data =
        JSON.parse(save);

    Object.assign(
        game,
        data
    );

    updateUI();

    const saveStatus =
        document.getElementById("saveStatus");

    if (saveStatus) {

        saveStatus.textContent =
            "✔ Guardado automático activo";
    }
}

setInterval(() => {

    saveGame();

}, 10000);

window.addEventListener(
    "beforeunload",
    saveGame
);
loadGame();
