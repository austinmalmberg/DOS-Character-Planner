import React, { memo } from 'react';

function Attribute({ name, value, min, canIncreasePoints, changeAttributeValue }) {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <h4>{ name }</h4>
            <div className="h4 col-4 d-flex justify-content-between">
                <button type="button" className="btn btn-info btn-sm" disabled={ value <= min } onClick={ () => changeAttributeValue(name, -1) }>-</button>
                <span className="mx-2">{ value }</span>
                <button type="button" className="btn btn-info btn-sm" disabled={ !canIncreasePoints(name) } onClick={ () => changeAttributeValue(name, 1) }>+</button>
            </div>
        </div>
    );
}

export default memo(Attribute);
