import React, { memo, useEffect, useReducer, useCallback, useState } from 'react';

import AttributeModel from '../models/Attributes';

import UpgradeComponent from './UpgradeComponent';

const STATE_ACTIONS = Object.freeze({
    ADD_UPGRADE: 'add-upgrade',
    REMOVE_UPGRADE: 'remove-upgrade',
    POINTS_CHANGED: 'points-changed'
});

const initialState = {
    /*
    * An array of upgrade objects:
    * {
    *    name: <string>,
    *    value: <Number>,
    *    min: <Number>,
    *    cost: <Number>
    * }
    */
    upgrades: AttributeModel.defaults,

    // An array for tracking upgrades
    log: [],

    // An object for tracking points used
    points: {
        total: 0,
        used: 0
    }
};

function stateReducer(state, { type, payload }) {
    let modifierFunction;
    switch (type) {
        case STATE_ACTIONS.ADD_UPGRADE:
            modifierFunction = addUpgrade;
            break;
        case STATE_ACTIONS.REMOVE_UPGRADE:
            modifierFunction = removeUpgrade;
            break;
        case STATE_ACTIONS.POINTS_CHANGED:
            // no need to modify the state if points do not change
            if (state.points.used <= payload.totalPoints)
                return state;

            modifierFunction = handleOverflow;
            break;
        default:
            throw new Error('Upgrade state reducer error');
    }
    return modifierFunction(state, payload);
}

function addUpgrade(state, { name, cost }) {
    return {
        ...state,
        upgrades: state.upgrades.map(upgrade => {
            if (upgrade.name === name)
                return AttributeModel.handleUpgrade(upgrade);
            return upgrade;
        }),
        points: { ...state.points, used: state.points.used + cost },
        log: [ { name, cost }, ...state.log ]
    };
}

function removeUpgrade(state, { name }) {
    const matchingEntryIndex = state.log.findIndex(entry => entry.name === name);

    return {
        ...state,
        upgrades: state.upgrades.map(upgrade => {
            if (upgrade.name === name)
                return AttributeModel.handleDowngrade(upgrade);
            return upgrade;
        }),
        points: { ...state.points, used: state.points.used - state.log[matchingEntryIndex].cost },
        log: [...state.log.slice(0, matchingEntryIndex), ...state.log.slice(matchingEntryIndex + 1)]
    };
}

function handleOverflow(state, { totalPoints }) {
    let count = 0;
    let removedCost = 0;
    while (count < state.log.length && state.points.used - removedCost > totalPoints) {
        removedCost += state.log[count++].cost;
    }

    const removedEntries = state.log.slice(0, count);

    return {
        ...state,
        upgrades: state.upgrades.map(upgrade => {
            const removeCount = removedEntries.filter(entry => entry.name === upgrade.name).length;
            return { ...upgrade, value: upgrade.value - removeCount };
        }),
        points: {
            ...state.points,
            used: state.points.used - removedCost
        },
        log: state.log.slice(count)
    };
}

function AttributeContainer({ level, logsDispatcher }) {
    const [totalPoints, setTotalPoints] = useState(AttributeModel.pointsByLevel[level - 1]);
    const [state, stateDispatcher] = useReducer(stateReducer, initialState);

    useEffect(() => {
        const newPoints = AttributeModel.pointsByLevel[level - 1];

        setTotalPoints(newPoints);

        stateDispatcher({
            type: STATE_ACTIONS.POINTS_CHANGED,
            payload: {
                totalPoints: newPoints
            }
        });

    }, [level])

    useEffect(() => {
        logsDispatcher({ key: AttributeModel.name, log: state.log });
    }, [state.log, logsDispatcher]);

    function handleAddUpgrade(upgrade) {
        stateDispatcher({ type: STATE_ACTIONS.ADD_UPGRADE, payload: upgrade });
    }

    function handleRemoveUpgrade(upgrade) {
        stateDispatcher({ type: STATE_ACTIONS.REMOVE_UPGRADE, payload: upgrade });
    }

    const isUpgradeAvailable = useCallback(pointsRequired =>
        totalPoints - state.points.used >= pointsRequired, [totalPoints, state.points.used]);

    return (
        <div className="col-md mx-2 my-3 px-2 py-3 border">
            <div className="text-center">
                <h2>{ AttributeModel.name }</h2>
                <h4>Available: { totalPoints - state.points.used }</h4>
            </div>
            <div className="container">
                {
                    state.upgrades.map((upgrade) => (
                        < UpgradeComponent
                            key={ upgrade.name }
                            upgrade={ upgrade }
                            isUpgradeAvailable={ isUpgradeAvailable }
                            handleAddUpgrade={ handleAddUpgrade }
                            handleRemoveUpgrade={ handleRemoveUpgrade } />
                    ))
                }
            </div>
        </div>
    );
}

export default memo(AttributeContainer);