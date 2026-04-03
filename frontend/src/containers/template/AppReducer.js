import {HIDE_TERMS_MODAL, LOGOUT, SHOW_TERMS_MODAL} from "./AppTemplateActions";
import {LOGIN} from "../login/LoginPageActions";

const initialState = {
    token: null,
    authenticated: false,
    showTermsModal: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {...initialState};
        case SHOW_TERMS_MODAL:
            return {
                ...state,
                showTermsModal: true
            };
        case HIDE_TERMS_MODAL:
            return {
                ...state,
                showTermsModal: false
            };
        case LOGIN:
            return {
                ...state,
                token: action.token,
                authenticated: true
            };
        default:
            return state
    }
}
