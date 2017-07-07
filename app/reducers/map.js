import { combineReducers } from 'redux';
import URLS from '../api/urls';

const ZOOM_IN = 'map/ZOOM_IN';
const ZOOM_OUT = 'map/ZOOM_OUT';
const SET_ZOOM = 'map/SET_ZOOM';
const ADD_MARKER = 'map/ADD_MARKER';
const UNDO_ADD_MARKER = 'map/UNDO_ADD_MARKER';
const SAVE_MARKERS = 'map/SAVE_MARKERS';
const SAVE_MARKERS_SUCCESS = 'map/SAVE_MARKERS_SUCCESS';
const FETCH_MARKERS = 'map/FETCH_MARKERS';
const FETCH_MARKERS_SUCCESS = 'map/FETCH_MARKERS_SUCCESS';
const FETCH_MARKERS_ERROR = 'map/FETCH_MARKERS_ERROR';
import { UNAUTH_USER } from './auth';

const zoom = (state = 16, action = {}) => {
    switch (action.type){
        case ZOOM_IN:
            return state < 20 ? state + 1 : state;
        case ZOOM_OUT:
            return state > 0 ? state - 1 : state;
        case SET_ZOOM:
            return action.zoom;
        default:
            return state;
    }
};

const marker = (state = {pos: [0,0]}, action = {}) => {
    switch (action.type){
        case FETCH_MARKERS_SUCCESS:
            return { pos: state.pos };
        case ADD_MARKER:
            return { pos: [action.latlng.lat, action.latlng.lng] };
        default:
            return state;
    }
};

const markers = (state = [], action ={}) => {
    switch (action.type){
        case FETCH_MARKERS:
        case UNAUTH_USER:
            return [];
        case FETCH_MARKERS_SUCCESS:
            return action.markers.map( item => marker(item, action) );
        case ADD_MARKER:
            return [ ...state, marker(null, action) ];
        case UNDO_ADD_MARKER:
            const newState =  [...state];
            newState.pop();
            return newState;
        default:
            return state;
    }
};

export default combineReducers({
    zoom,
    markers
})

export const zoomIn = ()=> ({type: ZOOM_IN});
export const zoomOut = ()=> ({type: ZOOM_OUT});
export const setZoom = zoom => ({type: SET_ZOOM, zoom});
export const addMarker = latlng => ({type: ADD_MARKER, latlng});
export const undoAddMarker = latlng => ({type: UNDO_ADD_MARKER});
export const saveMarkers = () => {
    return (dispatch, getState) =>{
        const state = getState();

        dispatch({ type: SAVE_MARKERS });

        const token = localStorage.getItem('token');
        fetch(URLS.MARKERS, {
            method: 'post',
            headers: { authorization: token },
            body: JSON.stringify( {markers: state.map.markers} )
        }).then( res => {
            dispatch({ type: SAVE_MARKERS_SUCCESS });
        });

    }
};
export const fetchMarkers = ()=>{
    return dispatch => {
        dispatch({ type: FETCH_MARKERS });

        const token = localStorage.getItem('token');
        fetch(URLS.MARKERS, {
            method: 'get',
            headers: { authorization: token }
        }).then( response => {
            if(response.status === 200){
                response.json().then( data => {
                    dispatch({ type: FETCH_MARKERS_SUCCESS, markers: data.markers });
                });
            } else {
                dispatch({ type: FETCH_MARKERS_ERROR });
            }
        });
    }
};