import { CONSECUTIVE_COUNT } from '../config';
import { cloneDeep, union } from 'lodash';
import { isFibonacci, isConsecutiveFibonacci } from '../util/Fibonacci';

export interface CellData {
	value: number;
	fibonacciValue: number; // Keep the found Fibonacci value to display, when `value` is set to 0.
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
		// Guard - round down to make sure that size is integer.
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

	/**
	 * Increase the values in the column and row of the indexed cell.
	 * 
	 * @param index The index in the "grid" array.
	 */
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

	/**
	 * Search for consecutive Fibonacci numbers along the column and row of the indexed cell.
	 * It collects their indexes in an array to flag them all.
	 * Flagging means that the cell's `fibonacciValue` will be set to the number and the `value` will be set to 0.
	 * 
	 * @param index The index in the "grid" array.
	 */
	private searchForConsecutiveNumbers(index: number) {
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
				found = union(found, this.checkAround(i, y)); // row - union with the previous found indexes without duplicates
			}
			// column
			if (colPos !== index && isFibonacci(this.grid[colPos].value)) {
				found = union(found, this.checkAround(x, i)); // column - union with the previous found indexes without duplicates
			}
		}

		found.forEach(i => {
			this.grid[i].fibonacciValue = this.grid[i].value;
			this.grid[i].value = 0;
		});
	}

	/**
	 * Check horizontally and vertically from the point (x, y): Is there any consecutive Fibonacci numbers?
	 * The "radius" of this checking depends on the `CONSECUTIVE_COUNT` config value.
	 * First, collect the index of cells "around" the (xx, y) point to a list.
	 * Then check the values with the `isConsecutiveFibonacci()` utility function.
	 * The function returns with the index of the found consecutive Fibonacci numbers.
	 * 
	 * @param x X-Coordinate of the cell
	 * @param y y-Coordinate of the cell
	 * @return Returns the index of the found consecutive Fibonacci numbers.
	 */
	private checkAround(x: number, y: number) {
		let found: number[] = []; // Indexes of the found consecutive Fibonacci numbers
		// Horizontal check
		// [ ][ ][ ][ ][c][ ][ ][ ][ ]
		// Start, and End:
		// [S][ ][ ][ ][E] .  .  .  .
		// We calculate the start- and end- position to cover all the cells "around" (x, y).
		const xStart = Math.max(0, x - (CONSECUTIVE_COUNT - 1));
		const xEnd = Math.min(this.size, x + CONSECUTIVE_COUNT) - CONSECUTIVE_COUNT;
		for (let i = xStart; i <= xEnd; i++) {
			const indexes: number[] = [];
			// Collect the coordinates
			for (let j = 0; j < CONSECUTIVE_COUNT; j++) {
				indexes[j] = (y * this.size) + i + j;
			}
			// Check the values at these coordinates and if they are consecutive Fibonacci numbers then store the indexes.
			const values = indexes.map(index => this.grid[index].value);
			if (isConsecutiveFibonacci(values)) {
				found = union(found, indexes);
			}
		}

		// Vertical check
		const yStart = Math.max(0, y - (CONSECUTIVE_COUNT - 1));
		const yEnd = Math.min(this.size, y + CONSECUTIVE_COUNT) - CONSECUTIVE_COUNT;
		for (let i = yStart; i <= yEnd; i++) {
			const indexes: number[] = [];
			// Collect the coordinates
			for (let j = 0; j < CONSECUTIVE_COUNT; j++) {
				indexes[j] = (i + j) * this.size + x;
			}
			// Check the values at these coordinates and if they are consecutive Fibonacci numbers then store the indexes.
			const values = indexes.map(index => this.grid[index].value);
			if (isConsecutiveFibonacci(values)) {
				found = union(found, indexes);
			}
		}

		return found;
	}

	/**
	 * Grid click handler: if the index is not a number or not in the allowed range then it returns with `false`.
	 * If the index is ok then increase the value of the cells in the column and row. Returns with `true`.
	 * 
	 * @param index Index of the clicked element
	 * @return Returns `true` or `false`, based on the `index` parameter: If index is in the range then `true` otherwise `false`.
	 */
	gridClickHandler(index: number): boolean {
		if (isNaN(index) || index < 0 || index >= this.length) return false; // no modification

		this.increaseRowAndColumn(index);
		this.searchForConsecutiveNumbers(index);
	
		return true;
	}
}
