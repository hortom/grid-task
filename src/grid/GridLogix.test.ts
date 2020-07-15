import { GridLogic } from './GridLogic';
import { cloneDeep } from 'lodash';

test('GridLogic constructor throws error', () => {
	expect(() => new GridLogic(-1)).toThrow(Error);
	expect(() => new GridLogic(0.4)).toThrow(Error);
});

test('GridLogic constructor works', () => {
	const g = new GridLogic(1);
	expect(g.getGridClone().length).toBe(1);

	const g2 = new GridLogic(10.4);
	expect(g2.getGridClone().length).toBe(100);

	const g3 = new GridLogic(50);
	expect(g3.getGridClone().length).toBe(2500);
});

test('GridLogic increaseRowAndColumn function',  () => {
	const g = new GridLogic(3);
	// private function to test
	(g as any).increaseRowAndColumn(0); // Top left corner
	expect(g.getGridClone().map(c => c.value)).toEqual([
		1, 1, 1,
		1, 0, 0,
		1, 0, 0
	]);

	(g as any).increaseRowAndColumn(8); // Bottom right corner
	expect(g.getGridClone().map(c => c.value)).toEqual([
		1, 1, 2,
		1, 0, 1,
		2, 1, 1
	]);

	const g2 = new GridLogic(3);
	(g2 as any).increaseRowAndColumn(4); // Center middle
	expect(g2.getGridClone().map(c => c.value)).toEqual([
		0, 1, 0,
		1, 1, 1,
		0, 1, 0
	]);
});

test('GridLogic gridClickHandler function',  () => {
	const g = new GridLogic(3);
	expect(g.gridClickHandler(undefined as any)).toBeFalsy();
	expect(g.gridClickHandler(-1)).toBeFalsy();
	expect(g.gridClickHandler(9)).toBeFalsy();
	expect(g.gridClickHandler(0)).toBeTruthy();
	expect(g.gridClickHandler(8)).toBeTruthy();
});

test('GridLogic checkAround function',  () => {
	const g = new GridLogic(10);
	(g as any).grid = [
		{value: 0, fibonacciValue: 0} ,{value: 13, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 21, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 34, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 55, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 89, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 2, fibonacciValue: 0} ,{value: 3, fibonacciValue: 0} ,{value: 5, fibonacciValue: 0} ,{value: 8, fibonacciValue: 0} ,{value: 13, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value:13, fibonacciValue: 0} ,{value: 8, fibonacciValue: 0} ,{value: 5, fibonacciValue: 0} ,{value: 3, fibonacciValue: 0} ,{value: 2, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0}
	];

	expect((g as any).checkAround(0, 0)).toEqual([]);

	expect((g as any).checkAround(1, 0)).toEqual([1,11,21,31,41]);
	expect((g as any).checkAround(1, 1)).toEqual([1,11,21,31,41]);
	expect((g as any).checkAround(1, 2)).toEqual([1,11,21,31,41]);
	expect((g as any).checkAround(1, 3)).toEqual([1,11,21,31,41]);
	expect((g as any).checkAround(1, 4)).toEqual([1,11,21,31,41]);
	expect((g as any).checkAround(1, 5)).toEqual([]);

	expect((g as any).checkAround(0, 7)).toEqual([70,71,72,73,74]);
	expect((g as any).checkAround(1, 7)).toEqual([70,71,72,73,74]);
	expect((g as any).checkAround(2, 7)).toEqual([70,71,72,73,74]);
	expect((g as any).checkAround(3, 7)).toEqual([70,71,72,73,74]);
	expect((g as any).checkAround(4, 7)).toEqual([70,71,72,73,74]);
	expect((g as any).checkAround(5, 7)).toEqual([]);

	expect((g as any).checkAround(0, 8)).toEqual([80,81,82,83,84]);
	expect((g as any).checkAround(1, 8)).toEqual([80,81,82,83,84]);
	expect((g as any).checkAround(2, 8)).toEqual([80,81,82,83,84]);
	expect((g as any).checkAround(3, 8)).toEqual([80,81,82,83,84]);
	expect((g as any).checkAround(4, 8)).toEqual([80,81,82,83,84]);
	expect((g as any).checkAround(5, 8)).toEqual([]);
});

test('GridLogic checkForConsecutiveNumbers function',  () => {
	const g = new GridLogic(10);
	const grid = [
		{value: 0, fibonacciValue: 0} ,{value: 13, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 21, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 34, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 55, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 89, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 2, fibonacciValue: 0} ,{value: 3, fibonacciValue: 0} ,{value: 5, fibonacciValue: 0} ,{value: 8, fibonacciValue: 0} ,{value: 13, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value:13, fibonacciValue: 0} ,{value: 8, fibonacciValue: 0} ,{value: 5, fibonacciValue: 0} ,{value: 3, fibonacciValue: 0} ,{value: 2, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0}
	];

	// No Fibonacci number is detected
	(g as any).grid = cloneDeep(grid);
	(g as any).checkForConsecutiveNumbers(58);
	expect(g.getGridClone()).toEqual(grid);

	// All Fibonacci numbers are detected
	(g as any).grid = cloneDeep(grid);
	(g as any).checkForConsecutiveNumbers(0);
	expect(g.getGridClone()).toEqual([
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 13} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 21} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 34} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 55} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 89} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 2} ,{value: 0, fibonacciValue: 3} ,{value: 0, fibonacciValue: 5} ,{value: 0, fibonacciValue: 8} ,{value: 0, fibonacciValue: 13} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue:13} ,{value: 0, fibonacciValue: 8} ,{value: 0, fibonacciValue: 5} ,{value: 0, fibonacciValue: 3} ,{value: 0, fibonacciValue: 2} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0}
	]);

	// 2. column first 5 Fibonacci numbers are detected only
	(g as any).grid = cloneDeep(grid);
	(g as any).checkForConsecutiveNumbers(8);
	expect(g.getGridClone()).toEqual([
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 13} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 21} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 34} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 55} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 89} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 2, fibonacciValue: 0} ,{value: 3, fibonacciValue: 0} ,{value: 5, fibonacciValue: 0} ,{value: 8, fibonacciValue: 0} ,{value: 13, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value:13, fibonacciValue: 0} ,{value: 8, fibonacciValue: 0} ,{value: 5, fibonacciValue: 0} ,{value: 3, fibonacciValue: 0} ,{value: 2, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,
		{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0} ,{value: 0, fibonacciValue: 0}
	]);
});