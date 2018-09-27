import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')} 
        onClick={props.clicked}>{props.children}</button>
        // onClick={() => console.log('Print text if cancel or continue is clicked')}
        // try and understand why onClick={console.log('Print text if cancel or continue is clicked')} gives such a weird result
);

export default button;