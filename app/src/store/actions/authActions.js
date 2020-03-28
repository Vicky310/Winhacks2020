import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const userSave = (firstName, lastName, email, userId, lat, long) => {
    return {
        type: actionTypes.USER_SAVE_SUCCESS,
        email: email,
        firstName: firstName,
        lastName: lastName,
        userId: userId,
        latitude: lat,
        longitude: long
    }
}

export const userSaveFailure = (error) => {
    return {
        type: actionTypes.USER_SAVE_FAILURE,
        error: error
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
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

 const getLocation = (callback) => {
    var promise = new Promise(function(resolve, reject) {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve("getLocation successfull")
                    localStorage.setItem('latitude', position.coords.latitude);
                    localStorage.setItem('longitude', position.coords.longitude);   
                }
            );
        }
        else{
            //error  
            reject("error in getLocation")  
        }
    });
    return promise
}


export const auth = (firstName, lastName, email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // Todo: Firebase API key required
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBbBi4HK7MdjkQMwroh6RbdFixFYwg8POg';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBbBi4HK7MdjkQMwroh6RbdFixFYwg8POg';
        }
        var getLoc = getLocation();
        getLoc
        .then(loc => {
            console.log(loc);
            axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                if(isSignup) {
                    dispatch(pushAuthData(response.data.localId, firstName, lastName, email, localStorage.getItem('latitude'), localStorage.getItem('longitude')));
                }
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                if(!isSignup)
                {
                    dispatch(fetchUser(response.data.idToken,response.data.localId));
                }
                
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
        })
        .catch(error => {
            console.log(error);
        })
      
        
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            
        }
    };
};


export const pushAuthData = (userId, first, last, email, lat, long) => {
    console.log(lat, long);
    return dispatch => {
        let data = {
              "uid": userId,
              "first": first,
              "last": last,
              "email": email,
              "latitude": lat,
              "longitude": long
          }
    
          let url = "https://winhacks2020-88149.firebaseio.com/Users/" + userId + ".json"
          axios.put(url, data).then((response) => {
            console.log(response);
      
            dispatch(userSave(first, last, email, userId, lat, long));
          }).catch(err => {
              dispatch(userSaveFailure(err.response.data.error));
          })
    }

}

export const fetchUserSuccess = (user) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        user: user
    }
};

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
};

export const fetchUser = (token, userId) => {
    return dispatch => { 
        
        const queryParams = '?auth=' + token + '&orderBy="uid"&equalTo="' + userId + '"';
        axios.get('https://winhacks2020-88149.firebaseio.com/Users.json' + queryParams)
        .then(res => {
            const fetchedUsers = [];
            for (let key in res.data) {
                fetchedUsers.push({
                    ...res.data[key],
                    id: key
                });
            }
            console.log(fetchedUsers, userId);
            dispatch(fetchUserSuccess(fetchedUsers[0]));
        })
        .catch(err => {
            dispatch(fetchUserFail(err));
        })
    }
}