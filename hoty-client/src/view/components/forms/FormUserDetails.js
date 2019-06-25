import React, { Component } from 'react';
// import Paper from '@material-ui/core/Paper';
import FromLogin from './FormLogin';
import FormRegister from './FormRegister';


class FormUserDetails extends Component {
	render() {
		return (this.props.form === 'login'
			? <FromLogin />
			: <FormRegister />
		);
	}
}
export default FormUserDetails;