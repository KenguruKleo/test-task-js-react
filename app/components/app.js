import React from 'react';
import Header from './header';
import Grid from 'react-bootstrap/lib/Grid';

class App extends React.Component{
    render() {
        return (
            <div>
                <Header/>
                <Grid>
                    { this.props.children }
                </Grid>
            </div>
        );
    }
}


export default App;