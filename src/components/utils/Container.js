import React from 'react';

function Container({ classNames, style, children }) {
    return (
        <div className={ ["p-3 border", classNames].join(' ').trim() } style={ style }>
            { children }
        </div>
    );
}

export default Container;
