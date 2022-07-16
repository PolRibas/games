const mainHome = () => {
    const root = document.querySelector("#root");
    const buildDom = (html) => {
        root.innerHTML = html;
        return root;
    };
    const setGameCard = (game) => {
        return `<a href="${game.route}" >
            <div class="game-card">
                <h2>${game.title}</h2>
                <p><small>${game.creator}</small></p>
            </div>
        </a>`
    }
    const createHomePage = (gameList) => {
        buildDom(`
        <div class="container">
        ${getNavbar()}
            <div class="game-list">
                ${gameList.reduce((acc, x) => acc + setGameCard(x), '')}
            </div >
        </div>
    `)
    }
    const gameList = [
        { title: 'Snake', creator: 'Ferran', route: './snake.html' },
        { title: 'Parashoot', creator: 'Gabo', route: './parashoot.html' },
        { title: 'Invation', creator: 'Grizzly', route: './invation.html' },
    ]
    createHomePage(gameList)
}

window.addEventListener('load', mainHome)