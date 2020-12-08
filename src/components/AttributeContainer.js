import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';

import Attribute from './Attribute';

const attributePointsByLevel = [5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

const pointsByLevel = {

}

const attributes = [
    {
        name: "Strength",
        value: 5,
        min: 5
    },
    {
        name: "Dexterity",
        value: 5,
        min: 5
    },
    {
        name: "Intelligence",
        value: 5,
        min: 5
    },
    {
        name: "Constitution",
        value: 5,
        min: 5
    },
    {
        name: "Speed",
        value: 5,
        min: 5
    },
    {
        name: "Perception",
        value: 5,
        min: 5
    }
];

function AttributeContainer({ level }) {

    // a variable to track the number of available points awarded at any given level
    const levelPoints = useMemo(() => attributePointsByLevel.slice(0, level).reduce((tot, points) => tot + points, 0), [level]);

    // track available points remaining
    const [available, setAvailable] = useState(levelPoints);
    const [pointsAreAvailable, setPointsAreAvailable] = useState(available > 0);

    // track used points
    const [used, setUsed] = useState(0);
    const [pointLog, setPointLog] = useState([]);

    // a function to change the attribute
    const changeAttributeValue = useCallback((name, diff) => {
        attributes.find(attr => attr.name === name).value += diff;
        setUsed(u => u + diff);
    }, []);

    const canIncreasePoints = useCallback((name) => {
        const attribute = attributes.find(a => a.name === name);
        return attribute.value < (attribute.max || Number.MAX_SAFE_INTEGER) && pointsAreAvailable;
    }, [pointsAreAvailable]);

    useEffect(() => {
        const newAvailable = levelPoints - used;
        setPointsAreAvailable(newAvailable > 0);
        setAvailable(newAvailable);
    }, [levelPoints, used]);

    function addToLog(name) {
        setPointLog(log => [...log, name]);
    }

    // TODO: FIX THIS
    function removeFromLog(name) {
        if (!name) {
            setPointLog(log => log.slice(0, log.length - 1));
        } else {
            const lastIndexReversed = pointLog.slice().reverse().find(entry => entry === name);
            const lastIndex = pointLog.length - 1 - lastIndexReversed;
            if (lastIndex >= 0) {
                setPointLog(log => [...log.slice(0, lastIndex), ...log.slice(lastIndex + 1)]);
            }
        }

    }

    return (
        <>
            <div className="text-center">
                <h2>Attributes</h2>
                <h4>Available: { available }</h4>
            </div>
            <div className="container">
                {
                    attributes.map(({ name, value, min }) => (
                        < Attribute
                            key={ name }
                            name={ name }
                            value={ value }
                            min={ min }
                            canIncreasePoints={ canIncreasePoints }
                            changeAttributeValue={ changeAttributeValue } />
                    ))
                }
            </div>
        </>
    );
}

export default memo(AttributeContainer);
