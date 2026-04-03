export const DISMISS_ALERT = 'DISMISS_ALERT';
export const LOGOUT = 'LOGOUT';
export const SHOW_TERMS_MODAL = 'SHOW_TERMS_MODAL';
export const HIDE_TERMS_MODAL = 'HIDE_TERMS_MODAL';

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const dismiss = alert => {
    return {
        type: DISMISS_ALERT,
        alert
    };
};

export const showTermsModal = () => {
    return {
        type: SHOW_TERMS_MODAL
    };
};

export const hideTermsModal = () => {
    return {
        type: HIDE_TERMS_MODAL
    };
};

