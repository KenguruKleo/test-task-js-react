import { combineReducers } from 'redux';
import URLS from '../api/urls';

const SELECT_CATEGORY = 'markers_by_category/SELECT_CATEGORY';
const FETCH_MARKERS_BY_CATEGORY = 'markers_by_category/FETCH_MARKERS_BY_CATEGORY';
const FETCH_MARKERS_BY_CATEGORY_SUCCESS = 'markers_by_category/FETCH_MARKERS_BY_CATEGORY_SUCCESS';
const FETCH_MARKERS_BY_CATEGORY_ERROR = 'markers_by_category/FETCH_MARKERS_BY_CATEGORY_ERROR';

const categoriesList = ()=>[
    {name: "Pharmacies", id: "pharmacy"},
    {name: "Gas stations", id: "gas_station"},
    {name: "Schools", id: "school"},
    {name: "Restaurants", id: "restaurant"},
];

const markers = (state=[], action={}) => {
    switch (action.type){
        case SELECT_CATEGORY:
        case FETCH_MARKERS_BY_CATEGORY:
        case FETCH_MARKERS_BY_CATEGORY_ERROR:
            return [];
        case FETCH_MARKERS_BY_CATEGORY_SUCCESS:
            return action.markers.map( item => {
                return {
                    pos: [
                        item.geometry.location.lat,
                        item.geometry.location.lng
                    ]
                };
            });
        default:
            return state;
    }
};

const fetching= (state=false, action={}) => {
    switch (action.type){
        case FETCH_MARKERS_BY_CATEGORY:
            return true;
        case FETCH_MARKERS_BY_CATEGORY_ERROR:
        case FETCH_MARKERS_BY_CATEGORY_SUCCESS:
            return false;
        default:
            return state;
    }
};

const selectedCategory = (state = null, action ={}) => {
    switch (action.type){
        case SELECT_CATEGORY:
            return action.selected;
        default:
            return state;
    }
};

export default combineReducers({
    selected: selectedCategory,
    categoriesList,
    markers,
    fetching
});

const fetchMarkersByCategory = (category, center) => {
    return dispatch => {

        dispatch({ type: FETCH_MARKERS_BY_CATEGORY });

        const token = localStorage.getItem('token');
        fetch(URLS.MARKERS_BY_CATEGORY, {
            method: 'post',
            headers: {authorization: token},
            body: JSON.stringify({
                category,
                center
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    //console.log(data);
                    dispatch({type: FETCH_MARKERS_BY_CATEGORY_SUCCESS, markers: data.results});
                });
            } else {
                dispatch({type: FETCH_MARKERS_BY_CATEGORY_ERROR});
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: FETCH_MARKERS_BY_CATEGORY_ERROR });
        })
    }
};

export const clickOnMapToShowMarketsByCategory = latlng => {
    return (dispatch, getState)=>{
        const category = getState().map.markersByCategory.category;

        dispatch( fetchMarkersByCategory(category, [latlng.lat, latlng.lng]) );
    };
};

export const selectCategory = category=>{
    return (dispatch, getState)=>{
        const state = getState().map;

        dispatch({ type: SELECT_CATEGORY, selected: category });

        if( category !== null ){
            dispatch( fetchMarkersByCategory(category, state.mapCenter) );
        }
    };
};