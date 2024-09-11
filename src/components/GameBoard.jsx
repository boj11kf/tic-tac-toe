import React from 'react';



const GameBoard = ({ onSelectSquare, board }) => {

    return (
        <ol id='game-board'>
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={symbol !== null}
                                >
                                    {symbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
};

export default GameBoard;

/* 
const [gameBoard, setGameBoard] = React.useState(initialGameBoard);

    const handleGameBoardClick = (row, col) => {
        console.log(activeSymbol);
        setGameBoard((prevGameBoard) => {
            const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            newGameBoard[row][col] = activeSymbol;
            return newGameBoard;
        });

        onSelectSquare();
    }
*/