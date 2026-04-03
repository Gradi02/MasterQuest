import axios from "axios";

export var loadCertificates = (params, callback) => async (dispatch, getState) => {
    var config = {
        url: '/certificates',
        params,
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var loadCertificate = (name, callback) => async (dispatch, getState) => {
    var config = {
        url: `/certificates/${name}`,
        data: {
            certificate: {
                name,
                description,
                user_id
            }
        },
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var saveCertificate = (resource, callback) => async (dispatch, getState) => {
    var config = {
        url: resource.name ? `/certificates/${resource.name}` : '/certificates',
        method: resource.name ? 'PUT' : 'POST',
        data: {
            certificate: resource
        },
        headers: {authorization: getState().appState.token}
    };
    var result = await axios.request(config);
    callback(result.data);
};

export var deleteCertificate = (name, callback) => async (dispatch, getState) => {
    var config = {
        url: `/certificates/${name}`,
        method: 'DELETE',
        headers: {authorization: getState().appState.token}
    };
    await axios.request(config);
    callback();
};
