import { ONLY_SORTED_NUMBERS } from "../config";

export const fibonacciNumbers: number[] = [1, 1, 2, 3, 5, 8, 13, 21]; // just a few for starting

/**
 * Generate Fibonacci numbers until `n` is less than the greatest Fibonacci number we have.
 * 
 * @param n Number, until we generate the numbers
 */
export function generateFibonacciWhile(n: number) {
	let i = fibonacciNumbers.length;

	while (n > fibonacciNumbers[i - 1]) {
		fibonacciNumbers[i] = fibonacciNumbers[i - 1] + fibonacciNumbers[i - 2];
		i++;
	}
}

/**
 * Check a number that it is a Fibonacci number.
 * 
 * @param n Number to check
 * @return Returns `true` if `n` is a Fibonacci number, otherwise `false`.
 */
export function isFibonacci(n: number): boolean {
	// If there is not enough Fibonacci number in our list, generate more.
	if (n > fibonacciNumbers[fibonacciNumbers.length - 1]) generateFibonacciWhile(n);
	
	return fibonacciNumbers.indexOf(n) > -1;
}

/**
 * Get the index of a number in the Fibonacci numbers. It returns -1 if `n` is not a Fibonacci number.
 * 
 * @param n Number to check
 * @return Returns the Fibonacci-index of `n`. If `n` is not a Fibonacci number then returns -1.
 */
export function fibonacciIndex(n: number): number {
	// If there is not enough Fibonacci number in our list, generate more.
	if (n > fibonacciNumbers[fibonacciNumbers.length - 1]) generateFibonacciWhile(n);
	
	return fibonacciNumbers.indexOf(n);
}

/**
 * Check a list that it contains consecutive Fibonacci numbers only.
 * 
 * @param list A list with numbers to check.
 * @return Returns `true` if the numbers are consecutive Fibonacci numbers, otherwise `false`.
 */
export function isConsecutiveFibonacci(list: number[]) {
	// If there is less than 2 then no consecutive numbers.
	if (list.length < 2) return false;
	// List [1, 1] is easier to check here.
	if (list.length === 2 && list[0] === 1 && list[1] === 1) return true;
	// Check the `list` array for Fibonacci numbers. If one of them isn't Fibonacci then return with false.
	for (let i = 0; i < list.length; i++) {
		if (!isFibonacci(list[i])) return false;
	}

	// Sort the numbers if necessary
	if (!ONLY_SORTED_NUMBERS) list.sort((a, b) => a - b);
	// Reverse the list if the first element is greater than the last one
	else if (list[0] > list[list.length - 1]) list.reverse();

	// Start checking from the end of our array (From the front, the double 1 could cause issue.)
	let index = list.length - 1;
	let fibonacciIndex = fibonacciNumbers.indexOf(list[index]);
	do {
		index--;
		fibonacciIndex--;
		// Compare the previous Fibonacci number with the previous number from our `list`
		if (fibonacciNumbers[fibonacciIndex] !== list[index]) return false;
	} while(index > 0)

	return true;
}
