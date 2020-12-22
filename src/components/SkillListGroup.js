
import SpellLevelFragment from './SpellLevelFragment';

function SkillListGroup({ skill }) {
    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item p-0 py-1 my-1">
                <a
                    className="btn d-block text-left bg-primary text-light py-2 px-3"
                    data-toggle="collapse"
                    href={ "#" + skill.name.toLowerCase() }
                    role="button"
                    aria-expanded="true"
                    aria-controls={ skill.name.toLowerCase() }>
                    <h5 className="m-0">{ skill.name }</h5>
                </a>
                <div id={ skill.name.toLowerCase() } className="skill collapse p-3" disabled={ skill.disabled }>
                    {
                        Object.entries(skill.spells).map(([level, spells]) =>
                            <SpellLevelFragment level={ level } spells={ spells } />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillListGroup;
