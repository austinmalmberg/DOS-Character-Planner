import { useContext } from 'react';

import Spell from './Spell';

import { AbilityContext, SpellContext } from './CharacterPlanner';

import { masteryLevels } from '../models/Skills';

function SpellLevelFragment({ skillName, masteryLevel, spells }) {
    const abilities = useContext(AbilityContext);
    const spellContext = useContext(SpellContext);

    const skillLevel = abilities[skillName];
    const spellsAvailable = masteryLevels[skillLevel][masteryLevel];
    const spellsAtLevel = spellContext[skillName][masteryLevel];

    const remaining = spellsAvailable - spellsAtLevel.length;

    return (
        <>
            <h5 className="mb-0 py-1 mt-3 text-center font-weight-bold bg-light rounded">
                { masteryLevel + " " }
                { remaining > 0 && <small>(Pick { remaining })</small> }
            </h5>
            <div className="d-flex flex-wrap justify-content-center">
                {
                    spells.map(spell => (
                        <Spell
                            key={ spell.name }
                            spell={ spell }
                            skillName={ skillName }
                            masteryLevel={ masteryLevel }
                            spellsAtLevel={ spellsAtLevel }
                            remaining={ remaining }
                        />
                    ))
                }
            </div>
        </>
    );
}

export default SpellLevelFragment;
