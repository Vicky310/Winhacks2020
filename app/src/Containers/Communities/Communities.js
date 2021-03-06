import React, { Component } from 'react';
import { connect } from 'react-redux';
import Community from './Community/Community';
import { Modal, Button, Input } from 'antd';
import classes from './Communities.module.css';
import * as actions from '../../store/actions/index';

class Communities extends Component {

    state = {
        title: '',
        content: '',
        disabled: true,
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handlePost = () => {
        let post = {
            title: this.state.title,
            content: this.state.content
        }
        this.props.onPost(post, new Date().toLocaleTimeString(), this.props.latitude, this.props.longitude,
        this.props.userId, this.props.communityId, this.props.communityLength);
        this.setState({
            title: '',
            content: '',
            disabled: true,
            visible: false
        });
    };

    contentChangedHandler = (event) => {
        this.setState({ content: event.target.value, disabled: !(event.target.value && this.state.title) });
    }

    titleChangedHandler = (event) => {
        this.setState({ title: event.target.value, disabled: !(event.target.value && this.state.content) });
    }

    handleFetch = () => {
        console.log('Fetching COmmunities');
        this.props.fetchCommunities();
    }

    render() {
        const { TextArea } = Input;
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.showModal}>
                        Add a new post
                    </Button>
                    <Button type="secondary" onClick={this.handleFetch}>
                        Start Your Journey To A New Community
                    </Button>
                    <Modal
                        title="Add Post"
                        visible={this.state.visible}
                        onOk={this.handlePost}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Return
                          </Button>,
                            <Button disabled={this.state.disabled} key="submit" type="primary" onClick={this.handlePost}>
                                Post
                            </Button>
                        ]}
                    >

                        <div className="AddPost">
                            <Input
                                className={classes.inp}
                                type="text"
                                placeholder="Title"
                                onChange={this.titleChangedHandler}
                                value={this.state.title} required />
                            <br />
                            <TextArea
                                className={classes.inp}
                                type="text"
                                placeholder="Content"
                                onChange={this.contentChangedHandler}
                                value={this.state.content} required />
                            <br />
                        </div>

                    </Modal>
                </div>
                {this.props.communities.map((comm, index) => (
                    <Community key={index} post={comm.post} time={comm.time} uid={comm.uid}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        communities: state.post.communities,
        latitude: state.auth.latitude,
        longitude: state.auth.longitude,
        userId: state.auth.userId,
        communityId: state.auth.communityId,
        communityLength: state.post.communityLength
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPost: (post, time, lat, long, uid, communityId, length) => dispatch(actions.savePost(post, time, lat, long, uid, communityId, length)),
        fetchCommunities: () => dispatch(actions.fetchRandomCommunities())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Communities);