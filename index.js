const gameList = document.querySelector("#game-list");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
const apiUrl = ("https://www.freetogame.com/api/games");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    fetch(apiUrl)
        .then(response => response.json())
        .then(games => {
            gameList.innerHTML = "";
            const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
            filteredGames.forEach(game => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("game-card");
                gameCard.innerHTML = `
                    <img src="${game.thumbnail}" alt="${game.title}">
                    <h3>${game.title}</h3>
                    <p>${game.short_description}</p>
                    <a href="${game.game_url}" target="_blank">Play Now</a>
                `;
                gameList.appendChild(gameCard);
            });
        })
        .catch(error => console.error(error));
});