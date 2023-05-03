import React, { useState } from 'react'
import Square from './Square'

export default function Board() {
    const initialState = Array(9).fill(null); // Intitialize the empty array of length 9
    const [state, setState] = useState(initialState); // State that changes array with "X" or "O"
    const [isXTurn, setIsXTurn] = useState(true); // State that checks if "X" turn
    let isWon = false;
    const getGame = JSON.parse(localStorage.getItem("game"));

    /* Function to check winner */
    const checkWinner = () => {
        const winnerChecks = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let checks of winnerChecks) {
            const [a, b, c] = checks;
            // Checks if "X" or "O" is winner
            if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
                isWon = true;
                return `${state[a]} won the match`;
            }
            // Checks if the game is draw
            if (!state.includes(null) && state[a] !== state[b] && state[a] !== state[c]) {
                isWon = false;
                return `Game Draw`;
            }
        }
        return false;
    };

    let isWinner = checkWinner();

    /* Function to handle on click */
    const handleClick = (index) => {
        // Stops overwriting on existing "X" or "O"
        if (state[index] !== null) {
            return;
        }
        // Checks if anyone is winner and stops the game
        if (isWon === true) {
            return;
        }
        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState); // Sets the state of either "X" or "O" at specified index
        localStorage.setItem("game", JSON.stringify(copyState));
        setIsXTurn(!isXTurn);
    };

    /* Function to reset the game */
    const handleReset = () => {
        setState(initialState);
        localStorage.setItem("game", JSON.stringify(initialState));
    };

    return (
        <>
            <div className="board-container">
                <h1><span className="light-blue">TIC</span><span className="light-gray">TAC</span><span className="yellow">TOE</span></h1>
                <div className="board-info">
                    <h4 className="square sqaure-turn"><span>{isXTurn ? "X" : "O"}</span>&nbsp;&nbsp;TURN</h4>
                    <button onClick={handleReset}>&#x21bb;</button>
                </div>
                {isWinner ? <>
                    <span className="winner-text">{isWinner}</span>
                </> : null}
                <div className="board-row">
                    <Square onClick={() => handleClick(0)} value={getGame[0]} color={getGame[0] === "X" ? "light-blue" : "yellow"} />
                    <Square onClick={() => handleClick(1)} value={getGame[1]} color={getGame[1] === "X" ? "light-blue" : "yellow"} />
                    <Square onClick={() => handleClick(2)} value={getGame[2]} color={getGame[2] === "X" ? "light-blue" : "yellow"} />
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(3)} value={getGame[3]} color={getGame[3] === "X" ? "light-blue" : "yellow"} />
                    <Square onClick={() => handleClick(4)} value={getGame[4]} color={getGame[4] === "X" ? "light-blue" : "yellow"} />
                    <Square onClick={() => handleClick(5)} value={getGame[5]} color={getGame[5] === "X" ? "light-blue" : "yellow"} />
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(6)} value={getGame[6]} color={getGame[6] === "X" ? "light-blue" : "yellow"} />
                    <Square onClick={() => handleClick(7)} value={getGame[7]} color={getGame[7] === "X" ? "light-blue" : "yellow"} />
                    <Square onClick={() => handleClick(8)} value={getGame[8]} color={getGame[8] === "X" ? "light-blue" : "yellow"} />
                </div>
            </div>
        </>
    )
}
