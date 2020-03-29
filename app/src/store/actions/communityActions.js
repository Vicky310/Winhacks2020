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

export const fetchCommunity = (communityId) => {
    return dispatch => { 
        axios.get("https://winhacks2020-88149.firebaseio.com/community/" + communityId + ".json")
        .then(res => {
            console.log("Communities", res);
            const fetchedCommunities = [];
            for (let key in res.data) {
                fetchedCommunities.push({
                    ...res.data[key],
                    id: key
                });
            }
            console.log(fetchedCommunities);
            dispatch(fetchCommunitySuccess(fetchedCommunities));
        })
        .catch(err => {
            console.log(err);
            // dispatch(fetchCommunityFail(err));
        })
    }
}