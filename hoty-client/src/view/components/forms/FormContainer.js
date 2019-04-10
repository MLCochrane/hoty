import React from 'react';

const FormContainer = props => {
    switch(props.step) {
        case 0:
            return <FormContainer form='login' />;
        case 1:
            return <FormContainer from='register' />
        default:
            return null;
    }
}

export default FormContainer;
