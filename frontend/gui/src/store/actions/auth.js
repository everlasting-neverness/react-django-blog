import axios from 'axios';
import * as actionTypes from './actionTypes';
import constants from '../../constants';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    // localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expirationTime * 1000);
    };
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post(constants.authURL + 'login/', {
                username,
                password
            })
            .then(res => {
                const { key: token } = res.data.key;
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => dispatch(authFail(err)));
    };
};

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post(constants.authURL + 'registration/', {
                username,
                email,
                password1,
                password2
            })
            .then(res => {
                const { key: token } = res.data.key;
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => dispatch(authFail(err)));
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                    localStorage.getItem('expirationDate')
                ),
                currentDate = new Date();
            if (expirationDate <= currentDate) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - currentDate.getTime()) /
                            1000
                    )
                );
            }
        }
    };
};
