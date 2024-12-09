import React from 'react'
import { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) { //记得加上花括号解构props对象，如果括号内直接传props，下面读取要变成onClick={props.onSquareClick}
	// const [value,setValue] = useState(null);

	return (
		// <button className="square"  onClick={handleClick}>{value}</button>
		<button className="square" onClick={onSquareClick}>{value}</button>
	)
}

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xisNext, setXIsNext] = useState(true)
	const [status, setStatus] = useState("Next Player：默认X")

	useEffect(() => {
		const winner = calculateWinner(squares);

		if (winner) {
			// status = "Winner:" + winner;
			setStatus("Winner:" + winner);
		} else if (
			// status = "Next Player:" + (xisNext ? "X" : "〇")
			squares.every(square => square !== null)) {
			setStatus("Draw!")
		} else if (squares.some(square => square !== null)){
			setStatus("Next Player:" + (xisNext ? "〇" : "X"))
		}
}, [squares, xisNext]);


function handleClick(i) {
	// console.log('clicked!');
	// setValue('X')


	// 检测玩家是否获胜
	if (squares[i] || calculateWinner(squares)) {
		return;
	}

	// if (squares[i]) {
	// 	return
	// }

	const nextSquares = squares.slice();
	if (xisNext) {
		nextSquares[i] = "X";
	} else {
		nextSquares[i] = "〇";
	}

	setSquares(nextSquares);
	setXIsNext(!xisNext)
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
			return squares[a]
		}
	}

	return null;
}


return (
	<>
		<div>{status}</div>
		<div className="board-row">
			<Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
			<Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
			<Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
		</div>
		<div className="board-row">
			<Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
			<Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
			<Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
		</div>
		<div className="board-row">
			<Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
			<Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
			<Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
		</div>
	</>
)
}
