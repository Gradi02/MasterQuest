import axios from "axios";

const authHeader = (token) => {
    if (!token) return {};
    return {Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`};
};

export var loadCertificates = (params, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: '/certificates',
        params,
        headers: authHeader(token)
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var loadCertificate = (id, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: `/certificates/${id}`,
        headers: authHeader(token)
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var saveCertificate = (resource, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: resource.id ? `/certificates/${resource.id}` : '/certificates',
        method: resource.id ? 'PUT' : 'POST',
        data: {
            certificate: resource
        },
        headers: authHeader(token)
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var deleteCertificate = (id, callback) => async (dispatch, getState) => {
    const token = getState().appState.token;
    var config = {
        url: `/certificates/${id}`,
        method: 'DELETE',
        headers: authHeader(token)
    };
    await axios.request(config);
    callback();
};
