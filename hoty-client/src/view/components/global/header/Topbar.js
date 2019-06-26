import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import HeaderIcons from './HeaderIcons';
import HeaderSettings from './HeaderSettings';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        'flex-grow': 1
    },
});

const Topbar = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant="h5" color="inherit" noWrap className={ classes.title }>
                HOTY
            </Typography>
            {props.loggedIn
            ? <React.Fragment>
                    <HeaderIcons
                        notifications='10'
                        />
                    <HeaderSettings />
                </React.Fragment>
            : 
            <Link
            replace={true}
            to='/login'
            >
                <Button
                color='inherit'>
                    Login
                </Button>
            </Link>
            }
        </React.Fragment>
    )
}

export default Topbar;

