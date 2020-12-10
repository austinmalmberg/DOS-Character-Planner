import React, { memo, useState } from 'react';

function Attribute({ name, minValue, initialValue, maxValue, initialUpgradeCost, upgradeAvailable, onAttributeDowngraded, onAttributeUpgraded }) {
    const [value, setValue] = useState(initialValue);
    const [upgradeCost, setUpgradeCost] = useState(initialUpgradeCost);

    function downgradeAttribute() {
        setValue(value - 1);
        onAttributeDowngraded(name);
    }

    function upgradeAttribute() {
        setValue(value + 1);
        onAttributeUpgraded({ name, upgradeCost });
    }

    return (
        <div className="row">
            <h4 className="col">{ name }</h4>
            <div className="h4 col text-right mr-3">
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ value <= minValue }
                    onClick={ downgradeAttribute }>-</button>
                <span className="mx-2">{ value }</span>
                <button
                    type="button"
                    className="btn btn-info btn-sm"
                    disabled={ !upgradeAvailable(upgradeCost) }
                    onClick={ upgradeAttribute }>+</button>
            </div>
        </div>
    );
}

export default memo(Attribute);
