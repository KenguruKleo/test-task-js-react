import React from 'react';
import { connect } from 'react-redux';
import { setMapCenter, zoomIn, zoomOut, setZoom, addMarker, undoAddMarker, saveMarkers, fetchMarkers } from '../reducers/map';
import { selectCategory } from '../reducers/markers_by_category';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
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
            //TODO show near objects by category
            console.log(e.latlng);
        }

    }

    render() {
        const props = this.props;
        const {mapCenter, zoom, markers, markersByCategory} = props;

        return (
            <div className="pageMap">
                <Col md = {2}>

                </Col>
                <Col md = {10}>
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
                </Col>
                <Col md = {2}>
                    <ListGroup>
                        <ListGroupItem
                            active ={markersByCategory.selected === null}
                            onClick ={()=>props.selectCategory(null)}
                        >
                            Not selected
                        </ListGroupItem>
                        {
                            markersByCategory.categoriesList.map( item => {
                                return (
                                    <ListGroupItem
                                        key={item.id}
                                        active ={item.id === markersByCategory.selected}
                                        onClick ={()=>props.selectCategory(item.id)}
                                    >
                                        {item.name}
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </Col>
                <Col md = {10}>
                    <Map
                        style={{width: "100%", height: "500px"}}
                        center={myPos}
                        zoom={zoom}
                        onZoomend={ e => props.setZoom(e.target.getZoom()) }
                        onClick={ ::this.clickMapHandler }
                        onMoveend ={e=>props.setMapCenter(e.target.getCenter())}
                    >
                        <Marker pos={myPos} staticLabel="It's my location"/>

                        { markers.map((marker, index) => (
                            <Marker pos={marker.pos} key={index}/>
                        )) }

                        {
                            markersByCategory.markers.map((marker, index) => {
                                return <Marker pos={marker.pos} key={index}/>
                            })
                        }

                    </Map>
                </Col>
            </div>
        );
    }

};

export default connect(
    state => ({
        mapCenter: state.map.mapCenter,
        zoom: state.map.zoom,
        markers: state.map.markers,
        markersByCategory: state.map.markersByCategory
    }),
    { setMapCenter, zoomIn, zoomOut, setZoom, addMarker, undoAddMarker, saveMarkers, fetchMarkers, selectCategory }
)(MapComponent);