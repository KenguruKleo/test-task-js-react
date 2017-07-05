import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import FieldInput from '../common/field_input';
import { singinUser } from '../../reducers/auth';

class Signin extends React.Component {
    handleFormSubmit({email, password}) {
        this.props.singinUser({email, password});
    }

    renderAlert(){
        if( this.props.errorMessage){
            return(
                <Alert bsStyle="danger">
                    <p>{ this.props.errorMessage }</p>
                </Alert>
            );
        }
    }

    render(){
       const { handleSubmit } = this.props;

       return(
           <Panel>
               <h2>Sign in</h2>
               <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                   <FormGroup>
                       <ControlLabel>Email:</ControlLabel>
                       <Field name="email" component={FieldInput} type="email"/>
                   </FormGroup>
                   <FormGroup>
                       <ControlLabel>Password:</ControlLabel>
                       <Field name="password" component={FieldInput} type="password"/>
                   </FormGroup>
                   { this.renderAlert() }
                   <Button bsStyle="primary" type="submit" >
                       Sign in
                   </Button>
               </form>
           </Panel>
       );
    }
}

Signin = reduxForm({
    form: 'signin'
})(Signin);

Signin = connect(
    state => ({ errorMessage: state.auth.error })
    ,{ singinUser }
)(Signin);

export default Signin;