import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

/**
 * Challenge:
 *
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components
 *   - Hints: Create a container to hold the 10 instances
 *        of the Die component, and use CSS Grid to lay them
 *        out evenly in 2 rows of 5 columns
 *   - Use flexbox on main to center the dice container
 *        in the center of the page
 */
export default function App() {
	/**
	 * Challenge:
	 * 1. Add new state called `tenzies`, default to false. It
	 *    represents whether the user has won the game yet or not.
	 * 2. Add an effect that runs every time the `dice` state array
	 *    changes. For now, just console.log("Dice state changed").
	 */

	/**
	 * Challenge: Tie off loose ends!
	 * 1. If tenzies is true, Change the button text to "New Game"
	 * 2. If tenzies is true, use the "react-confetti" package to
	 *    render the <Confetti /> component 🎉
	 *
	 *    Hint: don't worry about the `height` and `width` props
	 *    it mentions in the documentation.
	 */

	/**
	 * Challenge:
	 *
	 * - Write a function (allNewDice) that returns an array
	 *   of 10 random numbers between 1-6 inclusive.
	 * - Log the array of numbers to the console for now
	 */

	const [dice, setDice] = React.useState(allNewDice())
	const [tenzies, setTenzies] = React.useState(false)

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
		} else {
			setDice((prevDice) => {
				return prevDice.map((die) => {
					return die.isHeld !== true ? generateNewDie() : die
				})
			})
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
	/**
	 * Challenge: Update the `rollDice` function to not just roll
	 * all new dice, but instead to look through the existing dice
	 * to NOT role any that are being `held`.
	 *
	 * Hint: this will look relatively similiar to the `holdDice`
	 * function below. When creating new dice, remember to use
	 * `id: nanoid()` so any new dice have an `id` as well.
	 */

	/**
	 * Challenge: Allow the user to play a new game when the
	 * button is clicked and they've already won
	 */

	/**
	 * Challenge: Update the `holdDice` function to flip
	 * the `isHeld` property on the object in the array
	 * that was clicked, based on the `id` prop passed
	 * into the function.
	 *
	 * Hint: as usual, there's > 1 way to accomplish this.
	 * I'll be using `dice.map()` and checking for the `id`
	 * of the die to determine which one to flip `isHeld` on,
	 * but you can do whichever way makes the most sense to you.
	 */

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
		</main>
	)
}
