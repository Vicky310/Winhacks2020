import React from 'react';
import classes from './Community.module.css';

const Community = (props) => {
    return (
        <div className={classes.Community} >
            <h1>{props.post.title}</h1>
            <p>{props.time}</p>
            <p>{props.post.content}</p>
            <p>{props.uid}</p>
        </div>
    );
};

export default Community;
