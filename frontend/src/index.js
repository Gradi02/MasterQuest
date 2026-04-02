import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store'
import LoginPage from './containers/login/LoginPage'
import {Redirect, Route, Router} from 'react-router-dom'
import './index.scss'
import AppTemplate from "./containers/template/AppTemplate";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import {PersistGate} from 'redux-persist/es/integration/react';
import Users from "./containers/users/Users";
import User from "./containers/users/User";
import history from "./history";
import axios from "axios";

export const {persistor, store} = configureStore();

const target = document.querySelector('#root');
axios.defaults.baseURL = 'http://localhost:4000';
render(
    <Provider store={store}>
        <PersistGate
            loading={'Loading...'}
            persistor={persistor}>
            <Router history={history}>
                <div>
                    <AppTemplate>
                        <Route exact path="/" render={(props) => (
                            store.getState().appState.authenticated ? (
                                <Users {...props} />
                            ) : (
                                <Redirect to="/login"/>
                            )
                        )}/>
                        <Route path="/users" component={Users}/>
                        <Route path="/user/:id?" component={User}/>
                        <Route path="/login" component={LoginPage}/>

                    </AppTemplate>
                </div>
            </Router>
        </PersistGate>
    </Provider>,
    target
);
