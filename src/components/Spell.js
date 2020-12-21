import { useState, useContext } from 'react';

import { SkillPointContext } from './CharacterPlanner';
import { SpellBehaviorContext } from './SkillsContainer';

function Spell({ spell }) {
    const spellPointContext = useContext(SkillPointContext);
    const spellBehavior = useContext(SpellBehaviorContext);
    const [state, setState] = useState(spell);

    function handleOnClick() {
        setState(state => spellBehavior.toggleSelected(state))
    }

    return (
        <div className={ ["m-1 p-1 rounded spell", state.selected ? "selected" : "" ].join(" ").trim() } onClick={ handleOnClick }>
            <img className="rounded" src={spell.image_url} />
        </div>
    );
}

export default Spell;
