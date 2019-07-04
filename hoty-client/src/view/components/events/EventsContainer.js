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
		return props.events.filter((el, index) => index === props.curIndex)[0];
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
					<Grid item xs={12} sm>
						<EventList
							events={ props.events }
							callback={ props.callback }
							/>
					</Grid>
					<Hidden smDown>
						<Grid item xs={12} sm={7}>
							<EventOverview
								event={ collectCurrent() }
							/>
						</Grid>
					</Hidden>
				</Grid>
			</Paper>
			<EventForm
				open={ props.modalOpen }
				toggleModal={ props.toggleModal }
			/>
		</Container>
	)
}
export default EventsContainer;