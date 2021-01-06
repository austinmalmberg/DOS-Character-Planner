import { useContext } from 'react';

import { DispatchSpellContext, SPELL_ACTIONS } from './CharacterPlanner';

function Spell({ spell, skillName, masteryLevel, spellsAtLevel, remaining }) {
    const dispatchSpell = useContext(DispatchSpellContext);

    const spellId = spell.name.toLowerCase().replaceAll(' ', '-')

    const isActive = spellsAtLevel.includes(spell.name);
    const isDisabled = !isActive && remaining <= 0;

    function toggleSelect() {
        dispatchSpell({
            type: SPELL_ACTIONS.TOGGLE,
            payload: {
                skillName,
                masteryLevel,
                spellName: spell.name
            }
        });
    }

    return (
        <div className="form-check p-1 spell--container">
            <input className="form-check-input sr-only"
                type="checkbox"
                id={ spellId }
                disabled={ isDisabled }
                checked={ isActive }
                onChange={ toggleSelect }
            />
            <label className="form-check-label" htmlFor={ spellId }>
                <div className="d-flex flex-column align-items-center">
                    <img
                        className={ ["p-1 m-1 rounded spell", isActive ? " checked" : ""].join("") }
                        disabled={ isDisabled }
                        src={ spell.image_url }
                        alt={ spell.name }
                    />
                </div>
            </label>
        </div>
    );
}

export default Spell;
