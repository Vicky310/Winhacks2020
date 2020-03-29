import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchCommunitySuccess = (fetchedCommunities) => {
    let communityData=[];
    communityData = fetchedCommunities.map(comm => {
      return {
            post: comm.post,
            time: comm.time,
            uid: comm.uid
        };
    });
    return {
        type: actionTypes.FETCH_COMMUNITY_SUCCESS,
        communities: communityData
    }
};

export const fetchCommunityFail = (error) => {
    return {
        type: actionTypes.FETCH_COMMUNITY_FAILURE,
        error: error
    }
};

export const savePostSuccess = (data) => {
    return {
        type: actionTypes.SAVE_POST_SUCCESS,
        data: data
    }
}

export const savePostFail = (error) => {
    return {
        type: actionTypes.SAVE_POST_FAILURE,
        error: error
    }
}

export const savePost = (post, time, lat, long, uid, communityId, len) => {
    console.log(lat, long);
    return dispatch => {
        let data = {
                "post": post,
                "time": time,
                "latitude": lat,
                "longitude": long,
                "uid": uid
          }
    
          let url = "https://winhacks2020-88149.firebaseio.com/community/" + communityId + "/" + len +".json"
          axios.put(url, data).then((response) => {
            console.log(response);
            dispatch(savePostSuccess(response.data));
          }).catch(err => {
              dispatch(savePostFail(err.response.data.error));
          })
    }
}

export const fetchCommunity = (communityId) => {
    return dispatch => { 
        axios.get("https://winhacks2020-88149.firebaseio.com/community/" + communityId + ".json")
        .then(res => {
            console.log("Communities", res);
            let fetchedCommunities = [];
            for (let key in res.data) {
                fetchedCommunities.push({
                    ...res.data[key],
                    id: key
                });
            }
            console.log("Fetched", fetchedCommunities);
            dispatch(fetchCommunitySuccess(fetchedCommunities));
        })
        .catch(err => {
            console.log(err);
            // dispatch(fetchCommunityFail(err));
        })
    }
}