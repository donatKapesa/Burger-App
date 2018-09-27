import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => { // for loading screen
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTIme) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout()); // make sure to always execute inside dispatch
        }, expirationTIme * 1000);
    };
};

// handles async code doing the authentication
export const auth = (email, password, isSignUp) => { // what request to do if it's sign up or sign in
    return dispatch => { // function that gets dispatched as an argument thanks to redux thunk
        // we are using default axios. Not axios-order instance since Base URL for authentication is different
        dispatch(authStart()); // for now no async code yet
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAPSODK0laJe0ADBUEl-wGxaHX1i7I75qE'; // for sign up
        if(!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAPSODK0laJe0ADBUEl-wGxaHX1i7I75qE';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};
