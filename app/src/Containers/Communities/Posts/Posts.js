import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import AddPost from '../../../Components/AddPost/AddPost';
import Post from '../../../Components/Post/Post';

class Posts extends Component {
    
    render () {
        return (
            <div>
                <AddPost postAdded={this.props.onPostAdded} />
                {this.props.posts.map(post => (
                    <Post
                        key={post.id}
                        title={post.title} 
                        content={post.content} 
                        clicked={() => this.props.onRemovePost(post.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPostAdded: (title, content) => dispatch({type: actionTypes.ADD_POST, postData: {title: title, content: content}}),
        onRemovePost: (id) => dispatch({type: actionTypes.REMOVE_POST, postId: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);