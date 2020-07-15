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
 * In this way, don't need to re-render the component after the flashing, just change the `animState` value. 2 CSS animations has been
 * created per flashing-colour to support this.
 */
export default class Cell extends React.Component<CellProps, {}> {
	prevValue:number = 0;
	animState:number = 0; // Store which animation class should be added next time. In this way, we are not triggering state change to remove flashing class.

	shouldComponentUpdate(nextProps:CellProps) {
		return nextProps.data.value !== this.props.data.value || nextProps.data.fibonacciValue !== this.props.data.fibonacciValue;
	}

	render() {
		const { id, data} = this.props;
		const { value, fibonacciValue } = data;
		
		let className = "cellNormal";
		if (value !== this.prevValue) {
			className = (value === 0 ? 'cellFibonacci greenFlash' : 'cellNormal yellowFlash') + this.animState;
		}
		this.prevValue = value;

		return (<div
			id={id}
			data-testid={id}
			className={className}
			onAnimationEnd={() => {
				this.animState = 1 - this.animState;
			}}
		>
			{ value > 0 ? value : (fibonacciValue > 0 ? fibonacciValue : '') }
		</div>);
	}
}
