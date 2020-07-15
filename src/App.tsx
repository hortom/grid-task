import * as React from "react";
import { Grid } from './components/Grid';
import { GridLogic, CellData } from './grid/GridLogic';
import { GRID_SIZE } from './config';

import './App.css';

/**
 * == Description ==
 * Create a grid of 50x50. When you click on a cell, all values in the cells in the same row and column are
 * increased by 1 or, if a cell was empty, it will get a value of 1. After each change a cell will briefly turn
 * yellow. If 5 consecutive numbers in the Fibonacci sequence are next to each other, these cells will briefly
 * turn green and will be cleared.
 */ 

interface AppState {
	grid: CellData[];
}

const GridHandler: GridLogic = new GridLogic(GRID_SIZE);

export default class App extends React.Component<{}, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			grid: GridHandler.getGridClone()
		}
	}

	clickHandler = (e:any) => {
		// The ID is in format `cell_123`. To get the index, just need to split by "_" and parseInt the second element of the array.
		const i = parseInt(e?.target?.id?.split('_')?.[1]);
		if (GridHandler.gridClickHandler(i)) {
			this.setState({
				grid: GridHandler.getGridClone()
			});
		}
	}

	render() {
		return (
			<div className="App">
				<h1>Grid Task with Fibonacci detection</h1>
				<Grid onClick={this.clickHandler} grid={this.state.grid} size={GRID_SIZE} />
				<p className="description"><b>Description: </b>Create a grid of 50x50. When you click on a cell, all values in the cells in the same row and column are increased by 1 or, if a cell was empty, it will get a value of 1. After each change a cell will briefly turn yellow. If 5 consecutive numbers in the Fibonacci sequence are next to each other, these cells will briefly turn green and will be cleared.</p>
			</div>
		);
	}
}
