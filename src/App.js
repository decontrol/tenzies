import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
	const [dice, setDice] = React.useState(allNewDice())
	const [tenzies, setTenzies] = React.useState(false)
	const [rollCount, setRollCount] = React.useState(0)

	// keeping two diffrent states (dice and tenzies) in sync
	// is a good reason to use Side Effects.
	React.useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld)
		const firstValue = dice[0].value
		const allSameValue = dice.every((die) => die.value === firstValue)

		if (allHeld && allSameValue) {
			setTenzies(true)
			console.log('You won!')
		}
	}, [dice])

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}
	}

	function allNewDice() {
		const newDice = []

		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie())
		}
		// console.log(newDice)
		return newDice
	}

	function rollDice() {
		if (tenzies) {
			setTenzies(false)
			setDice(allNewDice())
			setRollCount(0)
		} else {
			setDice((prevDice) => {
				return prevDice.map((die) => {
					return die.isHeld !== true ? generateNewDie() : die
				})
			})
			setRollCount((prevVal) => prevVal + 1)
		}
	}

	function holdDice(id) {
		setDice((prevDice) =>
			prevDice.map((die) =>
				die.id === id ? { ...die, isHeld: !die.isHeld } : die
			)
		)
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			// id={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	))

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className='title'>Tenzies</h1>
			<p className='instructions'>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className='dice-container'>{diceElements}</div>
			<button className='roll-dice' onClick={rollDice}>
				{tenzies ? 'New Game' : 'Roll'}
			</button>

			<h2 className={!tenzies ? 'counting' : 'win'}>
				{tenzies
					? `You won after ${rollCount} tries!`
					: `Roll Count: ${rollCount}`}
			</h2>
		</main>
	)
}
