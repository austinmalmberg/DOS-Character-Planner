import React, { useEffect, useReducer, useContext, useCallback } from 'react';

import AbilityModel from '../models/Abilities';

import WellSpacedContainer from './utils/WellSpacedContainer';

import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import { UpgradeContext, PointContext, UPGRADE_ACTIONS } from './upgrades/UpgradeUtils';

import { LevelContext, UpdateLogContext } from './CharacterPlanner';
import AbilityContainer from './AbilityContainer';

const initialState = {
    abilities: AbilityModel.abilities,
    categories: AbilityModel.categories,
    log: [],
    points: {
        total: 0,
        used: 0
    }
};

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
        abilities: state.abilities.map(ability => {
            if (ability.name === name)
                return AbilityModel.handleUpgrade(ability);
            return ability;
        }),
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
        abilities: state.abilities.map(ability => {
            if (ability.name === name)
                return AbilityModel.handleDowngrade(ability);
            return ability;
        }),
        points: {
            ...state.points,
             used: state.points.used - state.log[matchingEntryIndex].cost
        },
        log: [...state.log.slice(0, matchingEntryIndex), ...state.log.slice(matchingEntryIndex + 1)]
    };
}

function AbilitiesContainer() {
    const level = useContext(LevelContext);
    const updateLog = useContext(UpdateLogContext);

    const [state, dispatchState] = useReducer(stateReducer, initialState);

    const upgradeContext = {
        handleAddUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.ADD_UPGRADE, payload: upgrade }),
        handleRemoveUpgrade: (upgrade) => dispatchState({ type: UPGRADE_ACTIONS.REMOVE_UPGRADE, payload: upgrade }),
    }

    useEffect(() => {
        dispatchState({
            type: UPGRADE_ACTIONS.LEVEL_CHANGED,
            payload: {
                total: AbilityModel.pointsByLevel[level - 1]
            }
        });
    }, [level])

    useEffect(() => {
        updateLog(AbilityModel.name, state.log);
    }, [state.log]);

    return (
        <WellSpacedContainer classNames="h-100">
            <UpgradeContext.Provider value={ upgradeContext }>
                <PointContext.Provider value={ state.points }>
                    <UpgradeContainerHeader name={ AbilityModel.name } points={ state.points.total - state.points.used } />
                    {
                        state.categories.map((category, i) => (
                            <AbilityContainer
                                key={ i }
                                category={ category }
                                abilities={ state.abilities.filter(ability => category === ability.category) } />
                        ))
                    }
                </PointContext.Provider>
            </UpgradeContext.Provider>
        </WellSpacedContainer>
    );
}

export default AbilitiesContainer;
