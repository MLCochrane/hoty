import React from 'react';

const EventOverview = props => {
	return (
		<div className='events__overview'>
		{(props.event)
			? <h1>{ props.event.title }</h1>
			: null
		}
		</div>
	)
}
export default EventOverview;