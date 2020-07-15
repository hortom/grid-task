import { ONLY_SORTED_NUMBERS } from '../config';
import {
	generateFibonacciWhile,
	fibonacciNumbers,
	isFibonacci,
	fibonacciIndex,
	isConsecutiveFibonacci
} from './Fibonacci';

test('Fibonacci generateFibonacciWhile function', () => {
	generateFibonacciWhile(80);
	expect(fibonacciNumbers.pop()).toBe(89);

	generateFibonacciWhile(55);
	expect(fibonacciNumbers.pop()).toBe(55);
});

test('Fibonacci isFibonacci function', () => {
	expect(isFibonacci(-10)).toBeFalsy();
	expect(isFibonacci(0)).toBeFalsy();
	expect(isFibonacci(6)).toBeFalsy();

	expect(isFibonacci(1)).toBeTruthy();
	expect(isFibonacci(2)).toBeTruthy();
	expect(isFibonacci(5)).toBeTruthy();
	expect(isFibonacci(21)).toBeTruthy();
	expect(isFibonacci(144)).toBeTruthy();
});

test('Fibonacci fibonacciIndex function', () => {
	expect(fibonacciIndex(-11)).toBe(-1);
	expect(fibonacciIndex(0)).toBe(-1);
	expect(fibonacciIndex(7)).toBe(-1);

	expect(fibonacciIndex(1)).toBe(0);
	expect(fibonacciIndex(2)).toBe(2);
	expect(fibonacciIndex(13)).toBe(6);
	expect(fibonacciIndex(233)).toBe(12);
});

test('Fibonacci isConsecutiveFibonacci function', () => {
	expect(isConsecutiveFibonacci([])).toBeFalsy();
	expect(isConsecutiveFibonacci([1])).toBeFalsy();

	expect(isConsecutiveFibonacci([1, 1])).toBeTruthy();
	expect(isConsecutiveFibonacci([1, 2])).toBeTruthy();
	expect(isConsecutiveFibonacci([2, 1])).toBeTruthy();
	expect(isConsecutiveFibonacci([3, 2, 1, 1])).toBeTruthy();
	expect(isConsecutiveFibonacci([1, 3, 2])).toBe(!ONLY_SORTED_NUMBERS);
	expect(isConsecutiveFibonacci([1, 3, 2, 5, 89, 34, 13, 21, 8, 1, 55])).toBe(!ONLY_SORTED_NUMBERS);

	expect(isConsecutiveFibonacci([21, 34, 55, 89, 144])).toBeTruthy();
	expect(isConsecutiveFibonacci([233, 144, 89, 55])).toBeTruthy();
});
