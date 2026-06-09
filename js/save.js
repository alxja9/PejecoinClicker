function saveGame() {

    localStorage.setItem(
        "pejeClickerSave",
        JSON.stringify(game)
    );
}

function loadGame() {

    const save =
        localStorage.getItem("pejeClickerSave");

    if (!save) return;

    const data = JSON.parse(save);

    Object.assign(game, data);

    updateUI();
}

setInterval(() => {

    saveGame();

}, 10000);

window.addEventListener(
    "beforeunload",
    saveGame
);
