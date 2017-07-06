import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import map from './map';

const rootReducer = combineReducers({
    form,
    auth,
    map
});

export default rootReducer;