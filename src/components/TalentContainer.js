import React, { useContext, useEffect, useReducer } from 'react';

import TalentsModel from '../models/Talents';

import WellSpacedContainer from './utils/WellSpacedContainer';
import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';

import { LevelContext, UpdateLogContext } from './CharacterPlanner';

const initialState = {
    talents: TalentsModel.defaults,

    log: [],

    points: {
        total: 0,
        used: 0
    }
};

const STATE_ACTIONS = Object.freeze({
    SELECT_TALENT: 'select-talent',
    DESELECT_TALENT: 'deselect-talent',
});

function stateReducer(state, { type, payload }) {
    switch(type) {
        case STATE_ACTIONS.SELECT_TALENT:

        case STATE_ACTIONS.DESELECT_TALENT:


        case STATE_ACTIONS.LEVEL_CHANGED:
            return {
                ...state,
                points: {
                    ...state.points,
                    total: payload.total
                }
            };
        default:
            throw Error('No state type ' + type + ' for TalentContainer stateReducer');
    }
}

function TalentContainer() {
    const level = useContext(LevelContext);
    const updateLog = useContext(UpdateLogContext);

    const [state, stateDispatch] = useReducer(stateReducer, initialState);

    useEffect(() => {
        stateDispatch({
            type: STATE_ACTIONS.LEVEL_CHANGED,
            payload: {
                total: TalentsModel.pointsByLevel[level - 1]
            }
        });
    }, [level]);

    useEffect(() => {
        updateLog(TalentsModel.name, state.log);
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
        <WellSpacedContainer classNames="col-md ml-md-2 mb-md-0">
            <UpgradeContainerHeader name={ TalentsModel.name } points={ state.points.total - state.points.used } />
            <div className="overflow-auto">
                {
                    state.talents.map((talent, i) => (
                        <p key={ i } className="m-0">{ talent.name }</p>
                    ))
                }
            </div>
        </WellSpacedContainer>
    );
}

export default TalentContainer;
