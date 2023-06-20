import React from 'react';
import "./Skeleton.css";

const Skeleton = ({w, h, className, color}) => {
    return (
        <div id="skeleton" style={{width: w, height: h, background: color}} className={className} ></div>
    );
};

export default Skeleton;