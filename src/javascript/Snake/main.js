
let nickname = 'Default'

const getStoreObjects = () => JSON.parse(localStorage.getItem('ranking'))

const saveNewStoreObject = (object) => {
    let array = getStoreObjects()
    if (array) {
        array.push(object)
    } else {
        array = [object]
    }
    localStorage.setItem('ranking', JSON.stringify(array))
}



const main = () => {
    const root = document.querySelector("#root");
    const buildDom = (html) => {
        root.innerHTML = html;
        return root;
    };

    const createSpawnPage = (internalRouter) => {
        buildDom(`<div class="container">
        <label>Nickname:
        <input value="${nickname}" id="nickInput" style="margin-bottom: 20px"></input>
        </label>
        <button id="start-game">Start Ferran Amazing Snake Game</button>
        </div>`)
        const startButton = document.querySelector('#start-game')
        startButton.addEventListener('click', () => internalRouter.createGamePage(internalRouter))
        const nickInput = document.querySelector('#nickInput')
        nickInput.addEventListener('change', (event) => {
            nickname = event.target.value
        })

    }
    const createGamePage = (internalRouter) => {
        buildDom(`
            <div class="container" >
                <canvas id="canvas" width="${window.innerWidth - 60}" height="${window.innerHeight - 60}"></canvas>
            </div>
        `);
        var canvas = document.querySelector('canvas');
        var game = new Game(canvas);
        game.gameOberCallback((pointsObject) => internalRouter.createGameOverPage(internalRouter, pointsObject));
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 38) {
                game.pushRow(1);
            } else if (event.keyCode === 39) {
                game.player.setDirectionX(1);
            } else if (event.keyCode === 37) {
                game.player.setDirectionX(-1);
            }
        })
        game.startGame();

    }
    const createGameOverPage = (internalRouter, pointsObject) => {
        const id = `${Math.floor(Math.random() * 10000000)}`
        saveNewStoreObject({
            nickname,
            ...pointsObject,
            id
        })
        const rankingList = getStoreObjects()
            .sort((a, b) => b.points - a.points)
            .filter((x, i) => i < 10)
            .reduce((html, item) => html + `
            <tr class="${id === item.id ? 'last-item' : ''}">
                <td>${item.nickname}</td>
                <td>${item.level}</td>
                <td>${item.points}</td>
            </tr>
        `, '')
        buildDom(`<div class="container">
        <h2>Game Over</h2>
        <table>
        <tr>
            <th>Nickname</th>
            <th>Level</th>
            <th>Points</th>
        </tr>
        ${rankingList}
        </table>
        <button id="start-game">Back Start</button>
        <button id="play-game">Play Again</button>
        </div>`)
        const startButton = document.querySelector('#start-game')
        startButton.addEventListener('click', () => internalRouter.createSpawnPage(internalRouter))
        const startGame = document.querySelector('#play-game')
        startGame.addEventListener('click', () => internalRouter.createGamePage(internalRouter))
    }

    createSpawnPage({
        createSpawnPage,
        createGamePage,
        createGameOverPage
    })
}

window.addEventListener('load', main)