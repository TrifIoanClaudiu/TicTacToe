const statusDisplay = document.querySelector(".status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winMessage = () => "Player " + currentPlayer + " has won!";
const drawMessage = () => "Draw";
const currentTurn = () => "It's " + currentPlayer+"'s turn";

const winningPositions = [
    [0, 1, 2],  [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

statusDisplay.innerHTML=currentTurn();

function playCell(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML=currentPlayer;
};
function changePlayer(){
    if (currentPlayer === "X"){
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    statusDisplay.innerHTML = currentTurn();
};
function clickOnCell(clickedCellEvent){

    const clickedCell = clickedCellEvent.target;
    
    const clickedCellIndex = parseInt(clickedCell.id);

    if (gameState[clickedCellIndex]!==""|| !gameActive){
        return;
    }
    playCell(clickedCell, clickedCellIndex);
    resultValidation();
};

function resultValidation(){

    let isWinner = false;

    for(let i = 0; i<7; i++){
        const winCondition = winningPositions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === ""){
        continue;
        }
        if (a === b && a === c){
            isWinner = true;
            break 
        }
    }
    if (isWinner){
        statusDisplay.innerHTML = winMessage();
        gameActive = false;
        return;
    }

    let isDraw = !gameState.includes("");
    if (isDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayer();
};

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click',clickOnCell));
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('mouseover', (hoveredCellEvent) =>{

    const hoveredCell = hoveredCellEvent.target;
    const hoveredCellIndex = parseInt(hoveredCell.id);
    if(gameState[hoveredCellIndex] === ""){
        hoveredCell.innerText = currentPlayer;
        hoveredCell.classList.add("hoverx");
    }
}));

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('mouseout', (unhoveredCellEvent) =>{
    const unhoveredCell=unhoveredCellEvent.target;
    const hoveredCellIndex = parseInt(unhoveredCell.id);
    unhoveredCell.innerText = gameState[hoveredCellIndex];
    unhoveredCell.classList.remove("hoverx");
}));
document.querySelector(".resetButton").addEventListener('click',() => {
    gameActive = true;
    currentPlayer="X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
})


