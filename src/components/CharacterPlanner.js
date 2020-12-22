import React, { useReducer } from 'react';

import { initialSkillsState } from '../models/Skills';
import { CHARACTER } from '../models/Character';

import AbilityManager from './AbilityManager';
import AttributeManager from './AttributeManager';
import TalentManager from './TalentManager';
import SkillManager from './SkillManager';
import CharacterSummary from './CharacterSummary';

const initialState = {
    level: 20,
    logs: {
        Attributes: [],
        Abilities: [],
    },
    characterValues: {
        Attributes: {
            Strength: 5,
            Dexterity: 5,
            Intelligence: 5,
            Constitution: 5,
            Speed: 5,
            Perception: 5,
        },
    },
    skills: initialSkillsState
}

const LevelContext = React.createContext();
const UpdateLogContext = React.createContext();
const SkillPointContext = React.createContext();
const AttributesContext = React.createContext();

const STATE_ACTIONS = Object.freeze({
    UPDATE_LOG: 'update-log',
    UPDATE_SKILLS: 'update-skills',
    UPDATE_CHARACTER_VALUES: 'update-character-values'
});

function stateReducer(state, { type, payload }) {
    switch(type) {
        case STATE_ACTIONS.UPDATE_LOG:
            return {
                ...state,
                logs: {
                    ...state.logs,
                    [payload.key]: payload.log.slice().reverse()
                }
            };
        case STATE_ACTIONS.UPDATE_SKILLS:
            return {
                ...state,
                skills: {
                    [payload.name]: payload.value
                }
            }
        case STATE_ACTIONS.UPDATE_CHARACTER_VALUES:
            return {
                ...state,
                characterValues: {
                    [payload.category]: {
                        [payload.name]: payload.value
                    }
                }
            }
        default:
            throw new Error('Invalid type sent to the LogReducer');
    }
}


function CharacterPlanner() {
    const [state, dispatchState] = useReducer(stateReducer, initialState);

    function handleUpdateLog(key, log) {
        dispatchState({
            type: STATE_ACTIONS.UPDATE_LOG,
            payload: { key, log }
        });
    }

    function handleUpdateAttributes({ name, value }) {
        dispatchState({
            type: STATE_ACTIONS.UPDATE_CHARACTER_VALUES,
            payload: { category: CHARACTER.ATTRIBUTES, name, value }
        });
    }

    return (
        <LevelContext.Provider value={state.level}>
            <AttributesContext.Provider value={state.characterValues.Attributes}>
                <UpdateLogContext.Provider value={handleUpdateLog}>
                    <SkillPointContext.Provider value={state.skills}>
                        <div className="container-fluid flex-grow-1">
                            <div className="row h-100 py-3">
                                <div className="col-lg-4 col-xl-3 pb-3 pb-lg-0">
                                    <AbilityManager />
                                </div>
                                <div className="col-lg-8 col-xl-6">
                                    <div className="row">
                                        <AttributeManager updateAttributes={ handleUpdateAttributes }/>
                                        <TalentManager />
                                    </div>
                                    <div className="row my-3">
                                        <SkillManager />
                                    </div>
                                </div>
                                <div className="col-xl-3">
                                    <CharacterSummary logs={ state.logs } />
                                </div>
                            </div>
                        </div>
                    </SkillPointContext.Provider>
                </UpdateLogContext.Provider>
            </AttributesContext.Provider>
        </LevelContext.Provider>
    );
}

export default CharacterPlanner;
export { LevelContext, UpdateLogContext, SkillPointContext, AttributesContext };
