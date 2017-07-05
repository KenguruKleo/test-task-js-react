import { combineReducers } from 'redux';
import URLS from '../api/urls';
import history from '../helpers/history';

const AUTH_USER = 'auth/AUTH_USER';
const UNAUTH_USER = 'auth/UNAUTH_USER';
const AUTH_ERROR = 'auth/AUTH_ERROR';

const authenticated = (state = false, action ={}) => {
    switch(action.type){
        case AUTH_USER:
            return true;
        case UNAUTH_USER:
        case AUTH_ERROR:
            return false;
        default:
            return state;
    }
};

const error = (state = '', action ={}) => {
    switch (action.type){
        case AUTH_USER:
        case UNAUTH_USER:
            return '';
        case AUTH_ERROR:
            return action.error;
        default:
            return state;
    }
};

export default combineReducers({
    authenticated,
    error
});

export const authWithToken = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if( token ){
            fetch(URLS.AUTH_CHECK_TOKEN, {
                method: 'get',
                headers: { authorization: token }
            }).then( response => {
                if(response.status === 200){
                    dispatch({ type: AUTH_USER });
                } else {
                    dispatch({ type: UNAUTH_USER });
                }
            });


        }
    }
};

export const authError = (error) => ({type: AUTH_ERROR, error});

export const singinUser = ({email, password}) => {
    return dispatch => {
        fetch(URLS.AUTH_SIGNIN, {
            method: 'post',
            body: JSON.stringify( {email, password} )
        })
        .then(response => {
            if(response.status === 200){
                response.json().then( data => {
                    dispatch({type: AUTH_USER});
                    localStorage.setItem('token', data.token);
                    history.push('/map');
                });
            } else {
                throw(new Error(response.statusText));
            }
        })
        .catch( err=>{
            console.log(err);
            localStorage.removeItem('token');
            dispatch(authError('Bad Login Info'));
        })
    }
};

export const singupUser = ({email, password}) => {
    return dispatch => {
        fetch(URLS.AUTH_SIGNUP, {
            method: 'post',
            body: JSON.stringify( {email, password} )
        })
        .then(response => {
            if(response.status === 200){
                response.json().then( data => {
                    dispatch({type: AUTH_USER});
                    localStorage.setItem('token', data.token);
                    history.push('/map');
                });
            } else {
                response.json().then( data => {
                    dispatch( authError(data.error) );
                });
            }
        })
        .catch( err=>{
            console.log(err);
            localStorage.removeItem('token');
            dispatch(authError('Bad Login Info'));
        })
    }
};

export const signoutUser = ()=>{
    localStorage.removeItem('token');
    return({ type: UNAUTH_USER });
};
