import { combineReducers } from 'redux';
import URLS from '../api/urls';

const SELECT_CATEGORY = 'map/SELECT_CATEGORY';
const FETCH_MARKERS_BY_CATEGORY = 'map/FETCH_MARKERS_BY_CATEGORY';
const FETCH_MARKERS_BY_CATEGORY_SUCCESS = 'map/FETCH_MARKERS_BY_CATEGORY_SUCCESS';
const FETCH_MARKERS_BY_CATEGORY_ERROR = 'map/FETCH_MARKERS_BY_CATEGORY_ERROR';

const categoriesList = ()=>[
    {name: "Pharmacies", id: "pharmacy"},
    {name: "Gas stations", id: "gas_station"},
    {name: "Schools", id: "school"},
    {name: "Restaurants", id: "restaurant"},
];

const markersByCategory = (state=[], action={}) => {
    switch (action.type){
        case FETCH_MARKERS_BY_CATEGORY:
        case FETCH_MARKERS_BY_CATEGORY_ERROR:
            return [];
        default:
            return state;
    }
};

const fetchingMarkersByCategories = (state=false, action={}) => {
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
    markersByCategory,
    fetchingMarkersByCategories
});

export const selectCategory = category=>{
    return {
        type: SELECT_CATEGORY,
        selected: category
    }
};