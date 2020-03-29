import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    communities: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_POST:
            console.log('newPost',action.postData);
            const newPost = {
                id: Math.random(), // not really unique but good enough here!
                title: action.postData.title,
                content: action.postData.content
            }
            
            return {
                ...state,
                posts: state.posts.concat( newPost )
            }
        case actionTypes.REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case actionTypes.FETCH_COMMUNITY_SUCCESS:
            console.log('action', action.communities);
            return {
                ...state,
                communities: state.communities.concat(action.communities)
            }
        default:
            return state;
    }
};

export default reducer;