import React, { Component } from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';


class FormUserDetails extends Component {
	render() {
		return (this.props.form === 'login'
			? <FormLogin />
			: <FormRegister />
		);
	}
}
export default FormUserDetails;