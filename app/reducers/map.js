import { combineReducers } from 'redux';

const ZOOM_IN = 'map/ZOOM_IN';
const ZOOM_OUT = 'map/ZOOM_OUT';
const SET_ZOOM = 'map/SET_ZOOM';

const zoom = (state = 16, action = {}) => {
    switch (action.type){
        case ZOOM_IN:
            return state < 20 ? state + 1 : state;
        case ZOOM_OUT:
            return state > 0 ? state - 1 : state;
        case SET_ZOOM:
            return action.zoom;
        default: return state;
    }
};

export default combineReducers({
    zoom
})

export const zoomIn = ()=> ({type: ZOOM_IN});
export const zoomOut = ()=> ({type: ZOOM_OUT});
export const setZoom = zoom => ({type: SET_ZOOM, zoom});
