import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from '@material-ui/core';

import { deleteEvent } from '../../../store/actions/eventActions';

const mapStateToProps = ({ events, token, users }) => ({
  fetching: events.fetching,
  fetched: events.fetched,
  token: token.token,
  id: users.user.id,
});

class EventConfrimation extends Component {
  componentDidUpdate(prevProps) {
    const { fetched, toggleConfirm } = this.props;
    if (
      prevProps.fetched !== fetched
      && fetched === true
    ) toggleConfirm(false);
  }

  render() {
    const {
      open,
      toggleConfirm,
      setCurrent,
      dispatch,
      token,
      id,
      eventId,
      fetching,
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => { toggleConfirm(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this event?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is nonreversable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => { toggleConfirm(false); }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrent(null);
              dispatch(
                deleteEvent(token, id, eventId),
              );
            }}
            disabled={fetching}
          >
            {
              fetching
                ? 'Pending'
                : 'Confirm'
            }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps)(EventConfrimation);

EventConfrimation.propTypes = {
  open: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  toggleConfirm: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
};
