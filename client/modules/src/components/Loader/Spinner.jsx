import React from 'react';
import "./Spinner.css"; 

const Spinner = ({id}) => {
    return (
        <span className="loader" id={id}></span>
    );
};

export default Spinner;