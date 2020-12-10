import React, { useState, useCallback, memo } from 'react';

import Attribute from './Attribute';
import { attributes as defaultAttributes } from '../models/Attributes';

function AttributeContainer({ points, setAttributeLog }) {

    // track available points remaining
    const [available, setAvailable] = useState(points);

    const upgradeAvailable = useCallback((upgradeCost) => available >= upgradeCost, [available]);

    const onAttributeUpgraded = (logEntry) => {
        // insert the new upgrade into the log
        setAttributeLog(log => {
            const copy = log.slice();
            copy.splice(0, 0, logEntry);
            return copy;
        })
        setAvailable(a => a - logEntry.upgradeCost);
    };

    const onAttributeDowngraded = (name) => {
        let foundEntry;
        setAttributeLog(log => {
            const copy = log.slice();
            const index = copy.findIndex(entry => entry.name === name);
            foundEntry = copy.splice(index, 1)[0];
            return copy;
        })
        setAvailable(a => a + foundEntry.upgradeCost);
    };

    return (
        <>
            <div className="text-center">
                <h2>Attributes</h2>
                <h4>Available: { available }</h4>
            </div>
            <div className="container">
                {
                    defaultAttributes.map((attribute) => (
                        < Attribute
                            key={ attribute.name }
                            name={ attribute.name }
                            minValue= { attribute.min }
                            initialValue={ attribute.value }
                            maxValue={ attribute.max || Number.MAX_SAFE_INTEGER }
                            initialUpgradeCost={ attribute.upgradeCost }
                            upgradeAvailable={ upgradeAvailable }
                            onAttributeDowngraded={ onAttributeDowngraded }
                            onAttributeUpgraded={ onAttributeUpgraded } />
                    ))
                }
            </div>
        </>
    );
}

export default memo(AttributeContainer);
