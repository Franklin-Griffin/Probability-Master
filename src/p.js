function parseInput(input) {
	const diceArr = input.trim().split(' ');
	const dice = [];
	
	for (const d of diceArr) {
		const parts = d.split('d');
		if (parts.length === 2) {
		const count = Number(parts[0]) || 1;
		const type = Number(parts[1]) || 0;
		for (let i = 0; i < count; i++) {
			dice.push(type);
		}
		} else {
            const type = Number(parts[0]) || 0;
			dice.push(type);
		}
	}
	
	return dice;
}
	
function calculateSingleDieProbability(dice) {
	const probabilities = {};
	
	for (let i = 1; i <= dice; i++) {
		probabilities[i] = 1 / dice;
	}
	
	return probabilities;
}
	
function combineProbabilities(prob1, prob2) {
	const probabilities = {};
	
	for (const outcome1 in prob1) {
		for (const outcome2 in prob2) {
		    const combinedOutcome = Number(outcome1) + Number(outcome2);
		    const combinedProbability = prob1[outcome1] * prob2[outcome2];
		    probabilities[combinedOutcome] = (probabilities[combinedOutcome] || 0) + combinedProbability;
		}
	}
	
	return probabilities;
}
	
function diceProbability(input) {
	const dice = parseInput(input);
	
	let result = calculateSingleDieProbability(dice[0]);
	for (let i = 1; i < dice.length; i++) {
		const singleDieProbabilities = calculateSingleDieProbability(dice[i]);
		result = combineProbabilities(result, singleDieProbabilities);
	}

	let total = 0;
	for (let outcome in result) {
		total += outcome * result[outcome];
	}

	return {probabilities: result, average: Math.round(total * 10) / 10};
}
	
export default diceProbability;