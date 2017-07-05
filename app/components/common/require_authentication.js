import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
  class Authenticator extends Component{

    componentWillMount() {
      if(!this.props.authenticated){
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps){
      if(!nextProps.authenticated){
        this.context.router.push('/');
      }
    }

    render(){
      return(<ComposedComponent {...this.props} />);
    }
  }

  return connect(
      state => ({ authenticated: state.auth.authenticated })
  )(Authenticator);
}
