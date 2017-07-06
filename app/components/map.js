import React from 'react';
import { connect } from 'react-redux';
import { zoomIn, zoomOut, setZoom } from '../reducers/map';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Map from '2gis-maps-react/lib/Map';
import Marker from '2gis-maps-react/lib/Marker';

const myPos = [46.4819845,30.7346978];

const MapComponent = props => {
    const { zoom } = props;

    return(
        <div>
            <ButtonGroup>
                <Button onClick = {props.zoomIn}>Zoom In</Button>
                <Button onClick = {props.zoomOut}>Zoom Out</Button>
            </ButtonGroup>
            <Map
                style={{width: "100%", height: "500px"}}
                center={myPos}
                zoom={zoom}
                onZoomend = { e => props.setZoom(e.target.getZoom()) }
            >
                <Marker pos={myPos} staticLabel="It's my location" />
            </Map>
        </div>
    );

};

export default connect(
    state => ({
        zoom: state.map.zoom
    }),
    { zoomIn, zoomOut, setZoom }
)(MapComponent);