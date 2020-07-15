import * as React from "react";
import { CellData } from '../grid/GridLogic';

import './Cell.css';

interface CellProps {
	data: CellData;
	id: string;
}

/**
 * Cell rendering component.
 * I solve the flashing with yellow and green with pure CSS.
 * Also after the Green flashing when the content should be empty string, it is just hidden: Used the same font colour as the background.
 * 
 * In React, to restart a CSS animation can be achieved with using different `key` property per animation.
 * In this way, the animation is triggered every time a user clicks on a cell regardless of the frequency of the clicks.
 */
export default class Cell extends React.Component<CellProps, {}> {
	prevValue:number = 0;
	divKey:number = 0; // Store which animation class should be added next time. In this way, we are not triggering state change to remove flashing class.

	shouldComponentUpdate(nextProps:CellProps) {
		return nextProps.data.value !== this.props.data.value || nextProps.data.fibonacciValue !== this.props.data.fibonacciValue;
	}

	render() {
		const { id, data} = this.props;
		const { value, fibonacciValue } = data;
		
		let className = "cellNormal";
		if (value !== this.prevValue) {
			className = (value === 0 ? 'cellFibonacci greenFlash' : 'cellNormal yellowFlash');
			// Change this only if animation is applied, so new key will be used next time.
			this.divKey = 1 - this.divKey;
		}
		this.prevValue = value;

		return (<div
			key={this.divKey}
			id={id}
			data-testid={id}
			className={className}
		>
			{ value > 0 ? value : (fibonacciValue > 0 ? fibonacciValue : '') }
		</div>);
	}
}
