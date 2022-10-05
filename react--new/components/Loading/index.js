import React from 'react';
import { Spinner } from 'vtex.styleguide';

const spinnerStyle = { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' };

function Loading({ color }) {
    return (
        <div style={spinnerStyle}><Spinner size={25} color={color} /></div>
    )
}

export default Loading;
