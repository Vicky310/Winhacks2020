import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const saveUserData = (state, action) => {
    return updateObject(state, {
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        userId: action.userId,
        latitude: action.latitude,
        longitude: action.longitude
    })
}

const userSaveFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
}

const userFetchSuccess = (state, action) => {
    console.log(action);
    return updateObject(state, {
        email: action.user.email,
        firstName: action.user.first,
        lastName: action.user.last,
        userId: action.user.uid,
        latitude: action.user.latitude,
        longitude: action.user.longitude
    })
}


const userFetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.USER_SAVE_SUCCESS: return saveUserData(state, action);
        case actionTypes.USER_SAVE_FAILURE: return userSaveFail(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return userFetchSuccess(state,action);
        case actionTypes.FETCH_USER_FAIL: return userFetchFail(state,action);
        default:
            return state;
    }
};

export default reducer;