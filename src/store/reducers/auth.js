import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
};

//  to get lean switch case statements
const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true}); // error to null in case it changed at some point
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false // because we're done
    }); // error to null in case it changed at some point
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;