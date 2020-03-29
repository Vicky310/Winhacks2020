import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ListCommunities.css'

class ListCommunities extends Component {

    render() {
        return (
            <div>
                
                {this.props.communityList.map((comm, index) => (
                    <div key={index} className="CommunityList">
                        {comm}
                    </div>
                    
                ))}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        communityList: state.post.communityList
    };
};


export default connect(mapStateToProps)(ListCommunities);