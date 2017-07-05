import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Switch } from 'react-router-dom';
import history from './helpers/history';
import reducers from './reducers';
import { authWithToken } from './reducers/auth';
import requireAuth from './components/common/require_authentication';
import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Map from './components/map';

const Welcome = ()=><h1>Welcome</h1>;

const middleware = [thunk];
const store = createStore(reducers, {}, compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

store.dispatch( authWithToken() );

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App>
                <Switch>
                    <Route exact path="/" component={ Welcome }/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signout" component={Signout}/>
                    <Route path="/map" component={ requireAuth(Map) }/>
                </Switch>
            </App>
        </Router>
    </Provider>
    , document.querySelector('#root')
);