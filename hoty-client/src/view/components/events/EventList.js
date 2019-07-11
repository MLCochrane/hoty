import React from 'react';

import { 
	List,
	ListItem,
	ListItemText,
	Divider
 } from '@material-ui/core';

const EventList = props => {
	return (
		<List>
			{props.events.map((el, index, self) => (
				<React.Fragment
					key={ index }
				>
					<ListItem
					button
					onClick={ () => { props.callback(el.id) } }
					>
						<ListItemText
							primary={ el.title }
							secondary={ el.description }
							/>
					</ListItem>
					{ (index !== self.length - 1) ? <Divider component="li" /> : null }
				</React.Fragment>
			))}
		</List>
	)
}
export default EventList;