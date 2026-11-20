
const gameList = document.querySelector("#game-list");
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#search-form");
const randomButton = document.querySelector("#random-button");

const apiUrl = "https://www.freetogame.com/api/games";

let allGames = [];

function renderGames(games) {
    gameList.replaceChildren();

    if (games.length === 0) {
        gameList.textContent = "No games found.";
        return;
    }

    games.forEach(game => {
        const card = document.createElement("article");
        card.className = "game-card";

        const image = document.createElement("img");
        image.src = game.thumbnail;
        image.alt = game.title;

        const title = document.createElement("h3");
        title.textContent = game.title;

        const description = document.createElement("p");
        description.textContent = game.short_description;

        const genre = document.createElement("p");
        genre.textContent = "Genre: " + game.genre;

        const link = document.createElement("a");
        link.href = game.game_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Play Now";

        card.append(image, title, description, genre, link);
        gameList.appendChild(card);
    });
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const term = searchInput.value.trim().toLowerCase();

    const filteredGames = allGames.filter(game =>
        game.title.toLowerCase().includes(term)
    );

    renderGames(filteredGames);
});

randomButton.addEventListener("click", () => {
    if (allGames.length === 0) {
        gameList.textContent = "Games are still loading.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * allGames.length);
    const randomGame = allGames[randomIndex];

    renderGames([randomGame]);
});

async function loadGames() {
    gameList.textContent = "Loading games...";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("API returned " + response.status);
        }

        const games = await response.json();

        if (!Array.isArray(games)) {
            throw new Error("Invalid response");
        }

        allGames = games;
        renderGames(allGames);

    } catch (error) {
        gameList.textContent = "Could not load games. Please try again later.";
        console.error("Failed to load games:", error);
    }
}

loadGames();
