import { useContext, memo } from 'react';

import { allTalents } from '../models/Talents';

import { TALENT_ACTIONS, LevelContext, AttributeContext, AbilityContext, TalentContext } from './CharacterPlanner';

function Talent({ name, dispatch }) {
    const level = useContext(LevelContext);
    const attributes = useContext(AttributeContext);
    const abilities = useContext(AbilityContext);
    const talents = useContext(TalentContext);

    const talentProperties = allTalents[name];

    const isDisabled = !talentProperties.prerequisites
        .every(prerequisite => prerequisite({ level, attributes, abilities, talents }));

    function toggleSelect() {
        dispatch({
            type: TALENT_ACTIONS.TOGGLE,
            payload: name
        });
    }

    return (
        <div className="form-check" data-toggle="tooltip" data-placement="top" title={ talentProperties.description }>
            <input className="form-check-input"
                type="checkbox"
                id={ talentProperties.id }
                disabled={ isDisabled }
                checked={ talents.includes(name) }
                onChange={ toggleSelect }
            />
            <label className="form-check-label" htmlFor={ talentProperties.id }>{ name }</label>
        </div>
    );
}

export default memo(Talent);
