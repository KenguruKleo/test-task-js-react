import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import FieldInput from '../common/field_input';
import { singupUser } from '../../reducers/auth';

class Signup extends React.Component{

    handleFormSubmit( {email, password} ) {
        this.props.singupUser( {email, password} );
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <Panel>
                <h2>Sign up</h2>
                <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                    <FormGroup>
                        <ControlLabel>Email:</ControlLabel>
                        <Field name="email" component={FieldInput} type="email"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password:</ControlLabel>
                        <Field name="password" component={FieldInput} type="password"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Confirm Password:</ControlLabel>
                        <Field name="passwordConfirm" component={FieldInput} type="password"/>
                    </FormGroup>
                    { this.props.errorMessage && <Alert bsStyle="danger"><strong>{ this.props.errorMessage }</strong></Alert> }
                    <Button bsStyle="primary" type="submit" >
                        Sign up
                    </Button>
                </form>
            </Panel>
        );
    }
}

const validate = formProps => {
    const errors = {};

    if ( ! formProps.email){
        errors.email = 'Please enter an email';
    }

    if ( ! formProps.password){
        errors.password = 'Please enter a password';
    }

    if ( ! formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password conformation';
    }

    if (formProps.password !== formProps.passwordConfirm){
        errors.passwordConfirm = 'Passwords must much';
    }

    return errors;
};

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default connect(
    state => ({ errorMessage: state.auth.error }),
    { singupUser }
)(Signup)
