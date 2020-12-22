import React, { useReducer } from 'react';

import { initialSkillsState } from '../models/Skills';

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
    skills: initialSkillsState
}

const LevelContext = React.createContext();
const UpdateLogContext = React.createContext();
const SkillPointContext = React.createContext();

const STATE_ACTIONS = Object.freeze({
    UPDATE_LOG: 'update-log',
    UPDATE_SKILLS: 'update-skills',
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

    function handleUpdateSkills(name, value) {
        dispatchState({
            type: STATE_ACTIONS.UPDATE_SKILLS,
            payload: { name, value }
        });
    }

    return (
        <LevelContext.Provider value={state.level}>
            <UpdateLogContext.Provider value={handleUpdateLog}>
                <div className="container-fluid flex-grow-1">
                    <SkillPointContext.Provider value={state.skills}>
                        <div className="row h-100 py-3">
                            <div className="col-lg-4 col-xl-3 pb-3 pb-lg-0">
                                <AbilityManager />
                            </div>
                            <div className="col-lg-8 col-xl-6">
                                <div className="row">
                                    <AttributeManager />
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
                    </SkillPointContext.Provider>
                </div>
            </UpdateLogContext.Provider>
        </LevelContext.Provider>
    );
}

export default CharacterPlanner;
export { LevelContext, UpdateLogContext, SkillPointContext };
