import React from 'react';
import FormUserDetails from './FormUserDetails';

const FormContainer = props => {
    switch(props.step) {
        case 0:
            return <FormUserDetails form='login' />;
        case 1:
            return <FormUserDetails form='register' />;
        default:
            return null;
    }
}

export default FormContainer;
