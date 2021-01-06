import React, { useState } from 'react';

import { UPGRADE_ACTIONS } from '../../UpgradeUtils';

function UpgradeComponent({ upgrade, upgradeBehavior, availablePoints, value, dispatch, htmlTooltip }) {
    const [state, setState] = useState(upgrade);

    function onUpgrade() {
        dispatch({
            type: UPGRADE_ACTIONS.ADD_UPGRADE,
            payload: state
        });
        setState(upgradeBehavior.upgradeState);
    }

    function onDowngrade() {
        dispatch({
            type: UPGRADE_ACTIONS.REMOVE_UPGRADE,
            payload: state
        });
        setState(upgradeBehavior.downgradeState);
    }

    const isPlusDisabled = state.cost > availablePoints || (state.max && value >= state.max);
    const isMinusDisabled = value <= state.min;

    return (
        <div className="row d-flex justify-content-between align-items-center py-1 mx-3">
            <span data-toggle="tooltip" data-placement="top" data-html={ htmlTooltip } title={ state.description }>
                { state.name }
            </span>
            <div>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ isMinusDisabled }
                    onClick={ onDowngrade }>-</button>
                <span className="mx-2">{ value }</span>
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
