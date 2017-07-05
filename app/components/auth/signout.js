import React from 'react';
import { connect } from 'react-redux';
import Panel from 'react-bootstrap/lib/Panel';
import { signoutUser} from '../../reducers/auth';

class Signout extends React.Component{
    componentWillMount(){
        this.props.signoutUser();
    }

    render(){
        return (
            <Panel>
                <h2>Sorry to see you go...</h2>
            </Panel>
        );
    }
}

export default connect(
    null,
    { signoutUser }
)(Signout)
