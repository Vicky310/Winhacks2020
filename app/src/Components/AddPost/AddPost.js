import React, { Component } from 'react';

import './AddPost.css';

class AddPost extends Component {
    state = {
        title: '',
        content: ''
    }

    contentChangedHandler = (event) => {
        this.setState({content: event.target.value});
    }

    titleChangedHandler = (event) => {
        this.setState({title: event.target.value});
    }

    // onPost = () => {
    //     this.props.postAdded(this.state.title, this.state.content);
    // }

    render () {
        return (
            <div className="AddPost">
                <input 
                    type="text" 
                    placeholder="Title" 
                    onChange={this.titleChangedHandler}
                    value={this.state.title} />
                <input 
                    type="text" 
                    placeholder="Content" 
                    onChange={this.contentChangedHandler}
                    value={this.state.content} />
                <button onClick={() => this.props.postAdded(this.state.title, this.state.content)}>Post</button>
            </div>
        );
    }
}

export default AddPost;