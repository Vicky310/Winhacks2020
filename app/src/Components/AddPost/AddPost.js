import React, { Component } from 'react';
import {Input,Button} from 'antd';

import classes from  './AddPost.module.css';


class AddPost extends Component {
    state = {
        title: '',
        content: '',
        disabled: true
    }

    // componentDidMount() {
    //     this.setState( {
    //         disabled: !this.state.disabled
    //     })
    // }

    contentChangedHandler = (event) => {
        this.setState({content: event.target.value, disabled: !(event.target.value && this.state.title)});
    }

    titleChangedHandler = (event) => {
        this.setState({title: event.target.value, disabled: !(event.target.value && this.state.content)});
    }

    onPost = () => {
        this.props.postAdded(this.state.title, this.state.content);
        this.setState({
            title: '',
            content: '',
            disabled: true
        });
    }

    render () {
        const { TextArea } = Input;
        return (
            
            <div className="AddPost">
                <Input 
                    className={classes.inp}
                    type="text" 
                    placeholder="Title" 
                    onChange={this.titleChangedHandler}
                    value={this.state.title} required/>
                    <br/>
                <TextArea
                className={classes.inp}
                    type="text" 
                    placeholder="Content" 
                    onChange={this.contentChangedHandler}
                    value={this.state.content} required />
                    <br/>
                <Button disabled={this.state.disabled} className="primary" onClick={this.onPost}>Post</Button>
            </div>
        );
    }
}

export default AddPost;