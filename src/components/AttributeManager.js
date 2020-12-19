import React, { memo, useEffect, useReducer, useCallback, useContext } from 'react';

import Model from '../models/Attributes';

import Container from './utils/Container';

import { UpgradeContext, PointContext, UPGRADE_ACTIONS, initialUpgradeManagerState } from './upgrades/UpgradeUtils';
import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import UpgradeComponent from './upgrades/UpgradeComponent';

import { LevelContext, UpdateLogContext } from './CharacterPlanner';

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
            return rollbackLog(state, payload);
        default:
            throw new Error('Upgrade state reducer error');
    }
}

function addUpgrade(state, { name, cost }) {
    return {
        ...state,
        points: { ...state.points, used: state.points.used + cost },
        log: [ ({ name, cost }), ...state.log ]
    };
}

function removeUpgrade(state, { name }) {
    const matchingEntryIndex = state.log.findIndex(entry => entry.name === name);

    return {
        ...state,
        points: { ...state.points, used: state.points.used - state.log[matchingEntryIndex].cost },
        log: [...state.log.slice(0, matchingEntryIndex), ...state.log.slice(matchingEntryIndex + 1)]
    };
}

function rollbackLog(state, { total }) {
    let count = 0;
    let removedCost = 0;
    while (count < state.log.length && state.points.used - removedCost > total) {
        removedCost += state.log[count++].cost;
    }

    const removedEntries = state.log.slice(0, count);

    return {
        ...state,
        points: {
            ...state.points,
            total: total,
            used: state.points.used - removedCost
        },
        log: state.log.slice(count)
    };
}

function AttributeManager() {
    const level = useContext(LevelContext);
    const updateLog = useContext(UpdateLogContext);

    const [state, dispatchState] = useReducer(stateReducer, initialUpgradeManagerState);

    const upgradeContext = {
        handleAddUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.ADD_UPGRADE, payload: upgrade }),
        handleRemoveUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.REMOVE_UPGRADE, payload: upgrade }),
    };

    useEffect(() => {
        dispatchState({
            type: UPGRADE_ACTIONS.LEVEL_CHANGED,
            payload: {
                total: Model.pointsByLevel[level - 1]
            }
        });
    }, [level])

    useEffect(() => {
        updateLog(Model.name, state.log);
    }, [state.log]);

    return (
        <Container classNames="col-md mr-md-2">
            <UpgradeContext.Provider value={ upgradeContext }>
                <PointContext.Provider value={ state.points }>
                    <UpgradeContainerHeader name={ Model.name } />
                    {
                        Model.attributes.map((attribute, i) => (
                            < UpgradeComponent
                                key={ i }
                                upgrade={ attribute }
                                upgradeBehavior={ Model.behavior }/>
                        ))
                    }
                </PointContext.Provider>
            </UpgradeContext.Provider>
        </Container>
    );
}

export default memo(AttributeManager);
