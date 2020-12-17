import React, { useMemo } from 'react';

function UpgradeComponent({ upgrade, isUpgradeAvailable, handleAddUpgrade, handleRemoveUpgrade }) {
    const plusDisabled = useMemo(
        () => !isUpgradeAvailable(upgrade.cost) && (!upgrade.max || upgrade.value >= upgrade.max),
        [isUpgradeAvailable, upgrade.cost, upgrade.value, upgrade.max]);
    const minusDisabled = useMemo(() => upgrade.value <= upgrade.min, [upgrade.value, upgrade.min]);

    function onMinusClicked(e) {
        const payload = {
            name: upgrade.name
        };

        handleRemoveUpgrade(payload);
    }

    function onPlusClicked(e) {
        const payload = {
            name: upgrade.name,
            cost: upgrade.cost
        };

        handleAddUpgrade(payload);
    }

    return (
        <div className="row">
            <h4 className="col">{ upgrade.name }</h4>
            <div className="h4 col text-right mr-3">
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ minusDisabled }
                    onClick={ onMinusClicked }>-</button>
                <span className="mx-2">{ upgrade.value }</span>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ plusDisabled }
                    onClick={ onPlusClicked }>+</button>
            </div>
        </div>
    );
}

export default UpgradeComponent;
