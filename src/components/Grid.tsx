import * as React from "react";
import { CellData } from '../grid/GridLogic';
import Cell from "./Cell";

import './Grid.css';

export interface GridProps {
	grid: CellData[];
	size: number;
	onClick: (e: any) => void;
}

export const Grid = (props: GridProps) => <div className="grid" onClick={props.onClick}>{props.grid.map((cell, i) => 
	i % props.size === props.size - 1
	? [<Cell id={'cell_' + i} key={i} data={cell}/>, <br key={'br_' + i}/>]
	: <Cell id={'cell_' + i} key={i} data={cell}/>
)}</div>