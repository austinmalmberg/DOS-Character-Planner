import React from 'react';

function WellSpacedContainer({ classNames, children }) {
    return (
        <div className={ ["p-3 border", classNames].join(' ').trim() }>
            { children }
        </div>
    );
}

export default WellSpacedContainer;
