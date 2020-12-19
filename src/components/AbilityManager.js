import React, { useEffect, useReducer, useContext, useCallback } from 'react';

import Model from '../models/Abilities';

import Container from './utils/Container';

import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import { UpgradeContext, PointContext, UPGRADE_ACTIONS, initialUpgradeManagerState } from './upgrades/UpgradeUtils';

import { LevelContext, UpdateLogContext } from './CharacterPlanner';
import AbilityCategory from './AbilityCategory';

function stateReducer(state, { type, payload }) {
    switch(type) {
        case UPGRADE_ACTIONS.LEVEL_CHANGED:
            return {
                ...state,
                points: {
                    ...state.points,
                    total: payload.total
                }
            };
        case UPGRADE_ACTIONS.ADD_UPGRADE:
            return addUpgrade(state, payload);
        case UPGRADE_ACTIONS.REMOVE_UPGRADE:
            return removeUpgrade(state, payload);
        default:
            throw new Error("Invalid state for AttributeContainer reducer");
    }
}

function addUpgrade(state, { name, cost }) {
    return {
        ...state,
        points: {
            ...state.points,
            used: state.points.used + cost
        },
        log: [ ({ name, cost }), ...state.log ]
    }
}

function removeUpgrade(state, { name }) {
    const matchingEntryIndex = state.log.findIndex(entry => entry.name === name);

    return {
        ...state,
        points: {
            ...state.points,
             used: state.points.used - state.log[matchingEntryIndex].cost
        },
        log: [...state.log.slice(0, matchingEntryIndex), ...state.log.slice(matchingEntryIndex + 1)]
    };
}

function AbilityManager() {
    const level = useContext(LevelContext);
    const updateLog = useContext(UpdateLogContext);

    const [state, dispatchState] = useReducer(stateReducer, initialUpgradeManagerState);

    const upgradeContext = {
        handleAddUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.ADD_UPGRADE, payload: upgrade }),
        handleRemoveUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.REMOVE_UPGRADE, payload: upgrade }),
    }

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
        <Container classNames="h-100">
            <UpgradeContext.Provider value={ upgradeContext }>
                <PointContext.Provider value={ state.points }>
                    <UpgradeContainerHeader name={ Model.name } />
                    {
                        Model.categories.map((category, i) => (
                            <AbilityCategory
                                key={ i }
                                category={ category }
                                abilities={ Model.abilities.filter(ability => category === ability.category) }
                                upgradeBehavior={ Model.behavior } />
                        ))
                    }
                </PointContext.Provider>
            </UpgradeContext.Provider>
        </Container>
    );
}

export default AbilityManager;
