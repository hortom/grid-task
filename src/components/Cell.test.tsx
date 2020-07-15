import React from 'react';
import { render } from '@testing-library/react';
import Cell from './Cell';
// import App from './App';

test('Cell render: empty', () => {
	const id = 'cell_1';
	const { getByTestId } = render(<Cell data={{value: 0, fibonacciValue: 0}} id={id}/>);

	expect(getByTestId(id).className).toContain('cellNormal');
	expect(getByTestId(id).className).not.toContain('yellowFlash');
	expect(getByTestId(id).className).not.toContain('greenFlash');
	expect(getByTestId(id).innerHTML).toBe('');
});

test('Cell render: increased by 1', () => {
	const id = 'cell_1';
	const cellComponent = render(<Cell data={{value: 0, fibonacciValue: 0}} id={id}/>);
	expect(cellComponent.getByTestId(id).className).toContain('cellNormal');
	expect(cellComponent.getByTestId(id).className).not.toContain('cellFibonacci');
	expect(cellComponent.getByTestId(id).className).not.toContain('yellowFlash');
	expect(cellComponent.getByTestId(id).className).not.toContain('greenFlash');
	expect(cellComponent.getByTestId(id).innerHTML).toBe('');
	// "increase" by 1
	cellComponent.rerender(<Cell data={{value: 1, fibonacciValue: 0}} id={id}/>);
	expect(cellComponent.getByTestId(id).className).toContain('cellNormal');
	expect(cellComponent.getByTestId(id).className).not.toContain('cellFibonacci');
	expect(cellComponent.getByTestId(id).className).toContain('yellowFlash');
	expect(cellComponent.getByTestId(id).className).not.toContain('greenFlash');
	expect(cellComponent.getByTestId(id).innerHTML).toBe('1');
	// "increase" by 1
	cellComponent.rerender(<Cell data={{value: 2, fibonacciValue: 0}} id={id}/>);
	expect(cellComponent.getByTestId(id).className).toContain('cellNormal');
	expect(cellComponent.getByTestId(id).className).not.toContain('cellFibonacci');
	expect(cellComponent.getByTestId(id).className).toContain('yellowFlash');
	expect(cellComponent.getByTestId(id).className).not.toContain('greenFlash');
	expect(cellComponent.getByTestId(id).innerHTML).toBe('2');
});

test('Cell render: Fibonacci number found', () => {
	const id = 'cell_1';
	const cellComponent = render(<Cell data={{value: 0, fibonacciValue: 0}} id={id}/>);
	expect(cellComponent.getByTestId(id).className).toContain('cellNormal');
	expect(cellComponent.getByTestId(id).className).not.toContain('cellFibonacci');
	expect(cellComponent.getByTestId(id).className).not.toContain('yellowFlash');
	expect(cellComponent.getByTestId(id).className).not.toContain('greenFlash');
	expect(cellComponent.getByTestId(id).innerHTML).toBe('');
	// "increase" by 3
	cellComponent.rerender(<Cell data={{value: 3, fibonacciValue: 0}} id={id}/>);
	expect(cellComponent.getByTestId(id).className).toContain('cellNormal');
	expect(cellComponent.getByTestId(id).className).not.toContain('cellFibonacci');
	expect(cellComponent.getByTestId(id).className).toContain('yellowFlash');
	expect(cellComponent.getByTestId(id).className).not.toContain('greenFlash');
	expect(cellComponent.getByTestId(id).innerHTML).toBe('3');
	// Fibonacci number has been found
	cellComponent.rerender(<Cell data={{value: 0, fibonacciValue: 3}} id={id}/>);
	expect(cellComponent.getByTestId(id).className).not.toContain('cellNormal');
	expect(cellComponent.getByTestId(id).className).toContain('cellFibonacci');
	expect(cellComponent.getByTestId(id).className).not.toContain('yellowFlash');
	expect(cellComponent.getByTestId(id).className).toContain('greenFlash');
	expect(cellComponent.getByTestId(id).innerHTML).toBe('3');
});
