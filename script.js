const gameBoard = (function() {
    let board = [[null, null, null],[null,null,null],[null,null,null]];

    let render = () => console.table(board)

    let place = function(coordArray, symbol) {
        board[coordArray[0]][coordArray[1]] = symbol
    }

    let clearBoard = function() {
        board = [[null, null, null],[null,null,null],[null,null,null]];
    }

    let validPos = function(input) {
        if (board[input[0]][input[1]] === null) {
            return true
        } else {
            return false
        }
    }

    let flatten = function() {
        return !board.flat(Infinity).includes(null)
    }


    return {render,place, clearBoard, validPos, flatten,board}
})();

function player() {

    const picks = [];
    let name;
    let symbol

    function createPlayer(playerName,playerSymbol) {
        name = playerName;
        symbol = playerSymbol;

    }

   function displayName() {
        return name
    }

    function displaySymbol() {
        return symbol
    }

    function placeSymbol() {
        let input = prompt('what are the coordinates of your symbol?')

        if (gameBoard.validPos(input.split(",")))
        {
            gameBoard.place(input.split(","),this.displaySymbol())
            picks.push(parseInt(coordDef(input)))

        } else
        {
            this.placeSymbol()
        }



    }

    function coordDef(input) {
        coords = input.split(",");
        coord_x = 3 * coords[0]
        coord_y = 1 * coords[1]
        return coord_x + coord_y + 1
    }

    let checkWinner = function() {
        for (let i = 0; i < winningCombos.length; i++)
        {
            if(winningCombos[i].every(r => picks.includes(r))){
                return true
              }

        }
        return false
    }

    let checkTie = function() {
        return gameBoard.flatten()
    }

    return {displayName,displaySymbol,createPlayer,placeSymbol, checkWinner, checkTie}
}



const game = function() {
    let player1 = player();
    let player2 = player();
    player1.createPlayer(prompt('What is the name of player 1?'), prompt('what is the symbol of player 1'))
    player2.createPlayer(prompt('What is the name of player 2?'), prompt('what is the symbol of player 2'))
    let currentPlayer = player1;
    let gameWon = false;

    while (!gameWon && !currentPlayer.checkTie())
    {
        currentPlayer.placeSymbol()

        if (currentPlayer.checkWinner())
        {
            gameWon = true
        } else {
            if (currentPlayer === player1)
            {
                currentPlayer = player2
            } else {
                currentPlayer = player1
            }

        }
        gameBoard.render()
    }

    if (gameWon) {
        console.log(`${currentPlayer.displayName()} is the winner`)
    } else {
        console.log('the game is a tie')
    }





}

const winningCombos = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

//carray board
// [0,0],[0,1],[0,2]
// [1,0],[1,1],[1,2]
// [2,0],[2,1],[2,2]

//coordinate based
// [0,0],[0,1],[0,2] top across
// [1,0],[1,1],[1,2] mid across
// [2,0],[2,1],[2,2] bottom across
// [0,0],[1,0],[2,0] left down
// [0,1],[1,1],[2,1] mid down
// [0,2],[1,2],[2,2] right down
// [0,0],[1,1],[2,2] top left diagonal
// [0,2],[1,1],[2,0] top right diagonal

// number based
// [1],[2],[3] top across
// [4],[5],[6] mid across
// [7],[8],[9] bottom across
// [1],[4],[7] left down
// [2],[5],[8] mid down
// [3],[6],[7] right down
// [1],[5],[9] top left diagonal
// [3],[5],[7] top right diagonal
