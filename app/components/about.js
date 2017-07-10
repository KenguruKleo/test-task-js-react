import React from 'react';
import Panel from 'react-bootstrap/lib/Navbar';


class About extends React.Component{
    render() {
        return (
            <Panel>
                <h2>
                    Konstantin Yemelianov
                </h2>
                <span>
                    <a href="mailto:k.yemelianov@gmail.com">k.yemelianov@gmail.com</a>
                </span>

            </Panel>
        );
    }
}

export default About;