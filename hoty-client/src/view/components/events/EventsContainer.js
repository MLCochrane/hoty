import React from 'react';

import {
	Grid,
	Hidden,
	Container,
	Typography,
	Paper,
	Button
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import EventList from './EventList';
import EventOverview from './EventOverview';
import EventForm from './EventsForm';
import EventConfrimation from './EventConfrim';

const useStyles = makeStyles(theme => ({
	container: {
		padding: theme.spacing(4)
	},
	titleBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: theme.spacing(4) 
	}
}));

const EventsContainer = props => {
	const collectCurrent = () => {
		return props.events.filter(el => el.id === props.curId)[0];
	}
	const classes = useStyles();
	return (
		<Container
			maxWidth="xl"
			className={ classes.container }
		>
			<div 
				className={ classes.titleBar }
			>
				<Typography
					variant="h5"
					component="h1"
					>
					Events
				</Typography>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={ () => {props.toggleModal(true)} }
				>
					Add New
				</Button>
			</div>
			<Paper
				elevation={1}
			>
				<Grid
					container
					spacing={2}
					>
					<Grid
					item
					xs={12}
					sm
					style={{
						'overflow-y': 'scroll',
						'height': '60vh'
					}}
					>
						<EventList
							events={ props.events }
							callback={ props.callback }
							/>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} sm={7}>
							<EventOverview
								event={ collectCurrent() }
								toggleConfirm={ props.toggleConfirm }
								userId={ props.userId }
							/>
						</Grid>
					</Hidden>
				</Grid>
			</Paper>
			<EventForm
				open={ props.formOpen }
				toggleModal={ props.toggleModal }
			/>
			<EventConfrimation
				open={ props.confirmOpen }
				toggleConfirm={ props.toggleConfirm }
				eventId={ props.curId }
			/>
		</Container>
	)
}
export default EventsContainer;