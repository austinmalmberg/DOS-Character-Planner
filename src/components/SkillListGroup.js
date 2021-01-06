import { useContext } from 'react';

import SpellLevelFragment from './SpellLevelFragment';

import { AbilityContext } from './CharacterPlanner';

function SkillListGroup({ skill }) {
    const abilities = useContext(AbilityContext);
    const shouldShow = abilities[skill.name] > 0;

    const skillId = skill.name.toLowerCase().replaceAll(' ', '-');

    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item p-0 py-1 my-1">
                <a
                    className="btn d-block text-left bg-primary text-light py-2 px-3"
                    data-toggle="collapse"
                    href={ "#" + skillId }
                    role="button"
                    aria-expanded="true"
                    aria-controls={ skillId }>
                    <h5 className="m-0">{ skill.name }</h5>
                </a>
                <div id={ skillId } className={ ["skill collapse p-3", shouldShow ? " show" : "" ].join('') }>
                    {
                        Object.entries(skill.spells).map(([masteryLevel, spells], i) =>
                            <SpellLevelFragment key={ i } skillName={ skill.name } masteryLevel={ masteryLevel } spells={ spells } />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillListGroup;
