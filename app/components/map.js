import React from 'react';
import { connect } from 'react-redux';
import { zoomIn, zoomOut, setZoom, addMarker, undoAddMarker, saveMarkers, fetchMarkers } from '../reducers/map';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Map from '2gis-maps-react/lib/Map';
import Marker from '2gis-maps-react/lib/Marker';

const myPos = [46.4819845,30.7346978];

const MapComponent = props => {
    const { zoom, markers } = props;

    return(
        <div>
            <ButtonGroup>
                <Button onClick = {props.zoomIn}>Zoom In</Button>
                <Button onClick = {props.zoomOut}>Zoom Out</Button>
                <Button onClick = {props.undoAddMarker}>Undo add marker</Button>
                <Button onClick = {props.saveMarkers}>Save</Button>
                <Button onClick = {props.fetchMarkers}>Load</Button>
            </ButtonGroup>
            <Map
                style={{width: "100%", height: "500px"}}
                center={myPos}
                zoom={zoom}
                onZoomend = { e => props.setZoom(e.target.getZoom()) }
                onClick = { e => {props.addMarker(e.latlng)} }
            >
                <Marker pos={myPos} staticLabel="It's my location" />
                { markers.map( (marker, index) => (
                    <Marker pos = {marker.pos} key = {index} />
                )) }
            </Map>
        </div>
    );

};

export default connect(
    state => ({
        zoom: state.map.zoom,
        markers: state.map.markers
    }),
    { zoomIn, zoomOut, setZoom, addMarker, undoAddMarker, saveMarkers, fetchMarkers }
)(MapComponent);