import React, { useState, useContext } from 'react';

import { SkillPointContext } from './CharacterPlanner';

import SpellLevelContainer from './SpellLevelContainer';

function SkillManager({ index, skill }) {
    const skillPoints = useContext(SkillPointContext);

    // const [state, setState] = useReducer({
    //     skill,
    //
    // });

    return (
        <div className="skill--container mt-3 text-center" disabled={ skill.disabled }>
            <h5>{ skill.name }</h5>
            <div>
                {
                    Object.entries(skill.spells).map(([level, spells], i) =>
                        <SpellLevelContainer key={ i } level={ level } spells={ spells } />
                    )
                }
            </div>
        </div>
    );
}

export default SkillManager;
