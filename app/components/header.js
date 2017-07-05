import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class Header extends React.Component{
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/"><a>Application</a></LinkContainer>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    { this.props.authenticated
                        ? <LinkContainer to="/signout"><NavItem  eventKey={1}>Sign out</NavItem></LinkContainer>
                        : [
                            <LinkContainer to="/signin" key={1}><NavItem  eventKey={2}>Sign in</NavItem></LinkContainer>,
                            <LinkContainer to="/signup" key={2}><NavItem  eventKey={3}>Sign up</NavItem></LinkContainer>
                            ]
                    }
                </Nav>
            </Navbar>
        );
    }
}

//export default Header;

export default connect(
    state => ({
        authenticated: state.auth.authenticated
    })
 )(Header);