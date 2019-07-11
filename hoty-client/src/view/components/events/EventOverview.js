import React from 'react';
import { Button } from '@material-ui/core';

const display = props => (
	<div className='event__content'>
		<h1>{ props.event.title || null }</h1>
		<p>{ props.event.description || null }</p>
		{(props.userId === props.event.userId)
			? <Button
				variant="contained"
				color="secondary"
				onClick={() => props.toggleConfirm(true)}
			>
				Delete
			</Button>
			: null
		}
	</div>
);

const EventOverview = props => {
	return (
		<div className='events__overview'>
		{(props.event)
			? display(props)
			: null
		}
		</div>
	)
}
export default EventOverview;