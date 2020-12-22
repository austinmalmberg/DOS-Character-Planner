import React, { useContext, useEffect, useReducer } from 'react';

import Model from '../models/Talents';

import Container from './utils/Container';
import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import { PointContext, initialUpgradeManagerState } from './upgrades/UpgradeUtils';

import { LevelContext, UpdateLogContext } from './CharacterPlanner';
import Talent from './Talent';

const initialState = {
    ...initialUpgradeManagerState,
}

const STATE_ACTIONS = Object.freeze({
    SELECT_TALENT: 'select-talent',
    DESELECT_TALENT: 'deselect-talent',
});

function stateReducer(state, { type, payload }) {
    switch(type) {
        case STATE_ACTIONS.SELECT_TALENT:
            break;
        case STATE_ACTIONS.DESELECT_TALENT:
            break;
        case STATE_ACTIONS.LEVEL_CHANGED:
            return {
                ...state,
                points: {
                    ...state.points,
                    total: payload.total
                }
            };
        default:
            throw Error('No state type ' + type + ' for TalentManager stateReducer');
    }
}

function TalentManager() {
    const level = useContext(LevelContext);
    const updateLog = useContext(UpdateLogContext);

    const [state, stateDispatch] = useReducer(stateReducer, initialState);

    useEffect(() => {
        stateDispatch({
            type: STATE_ACTIONS.LEVEL_CHANGED,
            payload: {
                total: Model.pointsByLevel[level - 1]
            }
        });
    }, [level]);

    useEffect(() => {
        updateLog(Model.name, state.log);
    }, [state.log]);

    function handleSelectTalent(talent) {
        stateDispatch({
            type: STATE_ACTIONS.SELECT_TALENT,
            payload: talent
        })
    }

    function handleDeselectTalent(talent) {
        stateDispatch({
            type: STATE_ACTIONS.DESELECT_TALENT,
            payload: talent
        })
    }

    return (
        <Container classNames="col-md ml-md-2 mb-md-0">
            <PointContext.Provider value={ state.points }>
                <UpgradeContainerHeader name={ Model.name } />
                <div className="mx-3 overflow-auto">
                    {
                        Model.talents.map((talent, i) => (
                            <Talent key={ i } talent={ talent } behavior={ Model.talentBehavior } />
                        ))
                    }
                </div>
            </PointContext.Provider>
        </Container>
    );
}

export default TalentManager;
