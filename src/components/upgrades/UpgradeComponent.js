import React, { useContext, useState } from 'react';

import { UpgradeContext, PointContext } from './UpgradeUtils';

function UpgradeComponent({ upgrade }) {
    const { handleAddUpgrade, handleRemoveUpgrade } = useContext(UpgradeContext);
    const points = useContext(PointContext);

    const [state, setState] = useState(upgrade);

    function onUpgrade() {
        handleAddUpgrade(state);
        setState(state => ({
            ...state,
            value: state.value + 1
        }));
    }

    function onDowngrade() {
        handleAddUpgrade(state);
        setState(state => ({
            ...state,
            value: state.value - 1
        }));
    }

    const isPlusDisabled = state.cost > points.total - points.used || (state.max && state.value >= state.max);
    const isMinusDisabled = state.value <= state.min;

    console.log(points);

    return (
        <div className="row d-flex justify-content-between align-items-center py-1 mx-3">
            <span>{ state.name }</span>
            <div>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ isMinusDisabled }
                    onClick={ onDowngrade }>-</button>
                <span className="mx-2">{ state.value }</span>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ isPlusDisabled }
                    onClick={ onUpgrade }>+</button>
            </div>
        </div>
    );
}

export default UpgradeComponent;
