import { CONSECUTIVE_COUNT } from '../config';
import { cloneDeep, union } from 'lodash';
import { isFibonacci, isConsecutiveFibonacci } from '../util/Fibonacci';

export interface CellData {
	value: number;
	fibonacciValue: number; // Keep the founded Fibonacci value to display, when `value` is set to 0.
}

/**
 * Grid coordinates:
 * [  0 ,    1  ,    2  , ..., size-1
 *  size, size+1, size+2, ..., size
 * 	 ...
 *   ...,   ... ,  ... ,  ..., size*size-1 ]
 * 
 */
export class GridLogic {
	private grid: CellData[] = [];
	private size: number = 0;
	private length: number = 0;

	constructor(size: number) {
		// Guard
		if (Math.floor(size) <= 0) throw new Error('GridLogic error: Grid size should be positive integer');

		this.size = Math.floor(size);

		this.length = this.size * this.size;
		for (let i = 0; i < this.length; i++) this.grid[i] = {
			value: 0, // The empty value is represented by 0
			fibonacciValue: 0 // When this is 0 then it is not in a Fibonacci consecutive list
		};
	}

	getGridClone() {
		return cloneDeep(this.grid);
	}

	private increaseRowAndColumn(index: number) {
		const x = index % this.size;
		const y = Math.floor(index / this.size);
		let rowPos = y * this.size;
		let colPos = x;
		// console.log('INDEX', index, x, y); // DEBUG
	
		for (
				let i = 0;
				i < this.size;
				i++, rowPos++, colPos += this.size // increase the counter, the row (by 1) and column (by `size`) position
			) {
			this.grid[rowPos].value++; // row
			// To avoid the intersection of the row and column (which is the cell at `index`) to be increased 2 times, we need this checking.
			if (colPos !== index) this.grid[colPos].value++; // column
		}
	}

	private checkForConsecutiveNumbers(index: number) {
		const x = index % this.size;
		const y = Math.floor(index / this.size);
		let rowPos = y * this.size;
		let colPos = x;
		let found: number[] = []; // Indexes of the found consecutive Fibonacci numbers

		for (
			let i = 0;
			i < this.size;
			i++, rowPos++, colPos += this.size // increase the counter, the row (by 1) and column (by `size`) position
		) {
			// row
			if (isFibonacci(this.grid[rowPos].value)) {
				found = union(found, this.checkAround(i, y)); // row - union with the previous found indexes
			}
			// column
			if (colPos !== index && isFibonacci(this.grid[colPos].value)) {
				found = union(found, this.checkAround(x, i)); // column - union with the previous found indexes
			}
		}

		found.forEach(i => {
			this.grid[i].fibonacciValue = this.grid[i].value;
			this.grid[i].value = 0;
		});
	}

	private checkAround(x: number, y: number) {
		const found: number[] = []; // Indexes of the found consecutive Fibonacci numbers
		// Horizontal check
		// [ ][ ][ ][ ][c][ ][ ][ ][ ]
		// [S][ ][ ][ ][E] .  .  .  .
		// We calculate the start- and end- position to cover all the cells "around" (x, y).
		const xStart = Math.max(0, x - (CONSECUTIVE_COUNT - 1));
		const xEnd = Math.min(this.size, x + CONSECUTIVE_COUNT) - CONSECUTIVE_COUNT;
		for (let i = xStart; i <= xEnd; i++) {
			const list: number[] = [];
			// Collect the coordinates
			for (let j = 0; j < CONSECUTIVE_COUNT; j++) {
				list[j] = (y * this.size) + i + j;
			}
			// Check the values at these coordinates and if they are consecutive Fibonacci then store the coordinates.
			if (isConsecutiveFibonacci(list.map(li => this.grid[li].value))) {
				for (let j = 0; j < CONSECUTIVE_COUNT; j++) {
					if (found.indexOf(list[j]) === -1) found.push(list[j]);
				}
			}
		}

		// Vertical check
		const yStart = Math.max(0, y - (CONSECUTIVE_COUNT - 1));
		const yEnd = Math.min(this.size, y + CONSECUTIVE_COUNT) - CONSECUTIVE_COUNT;
		for (let i = yStart; i <= yEnd; i++) {
			const list: number[] = [];
			// Collect the coordinates
			for (let j = 0; j < CONSECUTIVE_COUNT; j++) {
				list[j] = (i + j) * this.size + x;
			}
			// Check the values at these coordinates and if they are consecutive Fibonacci then store the coordinates.
			if (isConsecutiveFibonacci(list.map(li => this.grid[li].value))) {
				for (let j = 0; j < CONSECUTIVE_COUNT; j++) {
					if (found.indexOf(list[j]) === -1) found.push(list[j]);
				}
			}
		}

		return found;
	}

	/**
	 * Grid click handler: if the index is not a number or not in the allowed range then it returns with `false`.
	 * If the index is ok then increase the value of the cells in the column and row. Returns with `true`.
	 * @param index Index of the clicked element
	 */
	gridClickHandler(index: number): boolean {
		if (isNaN(index) || index < 0 || index >= this.length) return false; // no modification

		this.increaseRowAndColumn(index);
		this.checkForConsecutiveNumbers(index);
	
		return true;
	}
}
