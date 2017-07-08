import React from 'react';
import { connect } from 'react-redux';
import { zoomIn, zoomOut, setZoom, addMarker, undoAddMarker, saveMarkers, fetchMarkers } from '../reducers/map';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import Row from 'react-bootstrap/lib/Row';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Map from '2gis-maps-react/lib/Map';
import Marker from '2gis-maps-react/lib/Marker';

const myPos = [46.4819845,30.7346978];

class MapComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            enableAddMarkers: false
        }
    }

    clickMapHandler(e){
        if( this.state.enableAddMarkers ){
            this.props.addMarker(e.latlng)
        } else {
            //TODO show near objects
        }

    }

    render() {
        const props = this.props;
        const {zoom, markers} = props;

        return (
            <div className="pageMap">
                <Navbar.Form>
                    <Row>
                        <ButtonGroup>
                            <Button onClick={props.zoomIn}>Zoom In</Button>
                            <Button onClick={props.zoomOut}>Zoom Out</Button>
                            <Button onClick={props.undoAddMarker}>Undo add marker</Button>
                            <Button onClick={props.saveMarkers}>Save</Button>
                            <Button onClick={props.fetchMarkers}>Load</Button>
                        </ButtonGroup>
                    </Row>
                </Navbar.Form>
                <form>
                    <Checkbox
                        checked={this.state.enableAddMarkers}
                        onClick = {
                            ()=>this.setState( {enableAddMarkers: ! this.state.enableAddMarkers} )
                        }>
                        Click on the map add new marker
                    </Checkbox>
                </form>
                <Map
                    style={{width: "100%", height: "500px"}}
                    center={myPos}
                    zoom={zoom}
                    onZoomend={ e => props.setZoom(e.target.getZoom()) }
                    onClick={ ::this.clickMapHandler }
                >
                    <Marker pos={myPos} staticLabel="It's my location"/>
                    { markers.map((marker, index) => (
                        <Marker pos={marker.pos} key={index}/>
                    )) }
                </Map>
            </div>
        );
    }

};

export default connect(
    state => ({
        zoom: state.map.zoom,
        markers: state.map.markers
    }),
    { zoomIn, zoomOut, setZoom, addMarker, undoAddMarker, saveMarkers, fetchMarkers }
)(MapComponent);