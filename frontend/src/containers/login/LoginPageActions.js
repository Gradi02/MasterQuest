import {push} from 'react-router-redux'
import axios from "axios/index";

export const LOGIN = 'LOGIN';

export const login = (email, password) => async (dispatch, getState) => {
    try {
        let config = {
            url: '/users/sign_in',
            method: 'POST',
            data: {user: {email, password}},
        };
        const tokenResponse = await axios.request(config);
        const authToken = tokenResponse.headers.authorization || tokenResponse.headers.Authorization;
        dispatch({
            type: LOGIN,
            token: authToken
        });
        dispatch(push('/'));
    } catch (exception) {
        dispatch(push('/login'));
    }
};
