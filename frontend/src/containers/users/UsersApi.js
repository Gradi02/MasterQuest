import axios from "axios";

const authHeader = (token) => {
    if (!token) return {};
    return {Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`};
};

export var loadUsers = (params, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: '/users',
        params,
        headers: authHeader(token)
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var loadUser = (id, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: `/users/${id}`,
        data: {
            user: {id: id}
        },
        headers: authHeader(token)
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var saveUser = (resource, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: resource.id ? `/users/${resource.id}` : '/users',
        method: resource.id ? 'PUT' : 'POST',
        data: {
            user: resource
        },
        headers: authHeader(token)
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var deleteUser = (id, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: `/users/${id}`,
        method: 'DELETE',
        headers: authHeader(token)
    };
    await axios.request(config);
    callback();
};
