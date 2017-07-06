import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Map from '2gis-maps-react/lib/Map';
import Marker from '2gis-maps-react/lib/Marker';

const myPos = [46.4819845,30.7346978];

export default props => {

    return(
        //<Panel header={<h3>Map</h3>}>
            <Map
                style={{width: "100%", height: "500px"}}
                center={myPos}
                zoom={16}
            >
                <Marker pos={myPos} staticLabel="It's my location" />
            </Map>
        //</Panel>
    );

}