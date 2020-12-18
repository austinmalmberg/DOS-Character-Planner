import React, { memo, useEffect, useReducer, useCallback, useContext } from 'react';

import AttributesModel from '../models/Attributes';

import WellSpacedContainer from './utils/WellSpacedContainer';

import { UpgradeContext, PointContext, UPGRADE_ACTIONS } from './upgrades/UpgradeUtils';
import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import UpgradeComponent from './upgrades/UpgradeComponent';

import { LevelContext, UpdateLogContext } from './CharacterPlanner';

const initialState = {
    /*
    * An array of attribute objects:
    * {
    *    name: <string>,
    *    value: <Number>,
    *    min: <Number>,
    *    cost: <Number>
    * }
    */
    attributes: AttributesModel.attributes,

    // An array for tracking attributes
    log: [],

    // An object for tracking points used
    points: {
        total: 0,
        used: 0,
    }
};

function stateReducer(state, { type, payload }) {
    let modifierFunction;
    switch (type) {
        case UPGRADE_ACTIONS.ADD_UPGRADE:
            return addUpgrade(state, payload);
        case UPGRADE_ACTIONS.REMOVE_UPGRADE:
            return removeUpgrade(state, payload);
        case UPGRADE_ACTIONS.LEVEL_CHANGED:
            // no need to modify the log and attribute values when points used <= total
            if (state.points.used <= payload.total)
                return {
                    ...state,
                    points: {
                        ...state.points,
                        total: payload.total
                    }
                };

            // otherwise, remove log entries and update attribute values
            return handleOverflow(state, payload);
        default:
            throw new Error('Upgrade state reducer error');
    }
}

function addUpgrade(state, { name, cost }) {
    return {
        ...state,
        attributes: state.attributes.map(attribute => {
            if (attribute.name === name)
                return AttributesModel.handleUpgrade(attribute);
            return attribute;
        }),
        points: { ...state.points, used: state.points.used + cost },
        log: [ ({ name, cost }), ...state.log ]
    };
}

function removeUpgrade(state, { name }) {
    const matchingEntryIndex = state.log.findIndex(entry => entry.name === name);

    return {
        ...state,
        attributes: state.attributes.map(attribute => {
            if (attribute.name === name)
                return AttributesModel.handleDowngrade(attribute);
            return attribute;
        }),
        points: { ...state.points, used: state.points.used - state.log[matchingEntryIndex].cost },
        log: [...state.log.slice(0, matchingEntryIndex), ...state.log.slice(matchingEntryIndex + 1)]
    };
}

function handleOverflow(state, { total }) {
    let count = 0;
    let removedCost = 0;
    while (count < state.log.length && state.points.used - removedCost > total) {
        removedCost += state.log[count++].cost;
    }

    const removedEntries = state.log.slice(0, count);

    return {
        ...state,
        attributes: state.attributes.map(attribute => {
            const removeCount = removedEntries.filter(entry => entry.name === attribute.name).length;
            return { ...attribute, value: attribute.value - removeCount };
        }),
        points: {
            ...state.points,
            total: total,
            used: state.points.used - removedCost
        },
        log: state.log.slice(count)
    };
}

function AttributeContainer() {
    const level = useContext(LevelContext);
    const updateLog = useContext(UpdateLogContext);

    const [state, dispatchState] = useReducer(stateReducer, initialState);

    const upgradeContext = {
        handleAddUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.ADD_UPGRADE, payload: upgrade }),
        handleRemoveUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.REMOVE_UPGRADE, payload: upgrade }),
    };

    useEffect(() => {
        dispatchState({
            type: UPGRADE_ACTIONS.LEVEL_CHANGED,
            payload: {
                total: AttributesModel.pointsByLevel[level - 1]
            }
        });
    }, [level])

    useEffect(() => {
        updateLog(AttributesModel.name, state.log);
    }, [state.log]);

    return (
        <WellSpacedContainer classNames="col-md mr-md-2">
            <UpgradeContext.Provider value={ upgradeContext }>
                <PointContext.Provider value={ state.points }>
                    <UpgradeContainerHeader name={ AttributesModel.name } points={ state.points.total - state.points.used } />
                    {
                        state.attributes.map((attribute, i) => (
                            < UpgradeComponent
                                key={ i }
                                upgrade={ attribute } />
                        ))
                    }
                </PointContext.Provider>
            </UpgradeContext.Provider>
        </WellSpacedContainer>
    );
}

export default memo(AttributeContainer);
