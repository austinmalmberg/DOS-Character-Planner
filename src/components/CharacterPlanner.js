import React, { useReducer, useEffect } from 'react';

import { upgradeState, upgradeReducer } from '../UpgradeUtils';

import { allTalents } from '../models/Talents';
import { SKILLS, masteryLevels } from '../models/Skills';

import AbilityManager from './AbilityManager';
import AttributeManager from './AttributeManager';
import TalentManager from './TalentManager';
import SkillManager from './SkillManager';
import CharacterSummary from './CharacterSummary';

const initialAttributeState = {
    'Strength': 5,
    'Dexterity': 5,
    'Intelligence': 5,
    'Constitution': 5,
    'Speed': 5,
    'Perception': 5,

    ...upgradeState,
};

const initialAbilityState = {
    /* Weapons */
    'Bow': 0,
    'Crossbow': 0,
    'Dual Wielding': 0,
    'Single-handed': 0,
    'Two-handed': 0,
    'Wand': 0,

    /* Defence */
    'Armour Specialist': 0,
    'Body Building': 0,
    'Shield Specialist': 0,
    'Willpower': 0,

    /* Skills */
    'Aerotheurge': 0,
    'Expert Marksman': 0,
    'Geomancer': 0,
    'Hydrosophist': 0,
    'Man-at-Arms': 0,
    'Pyrokinetic': 0,
    'Scoundrel': 0,
    'Witchcraft': 0,

    /* Personality */
    'Charisma': 0,
    'Bartering': 0,
    'Leadership': 0,
    'Lucky Charm': 0,

    /* Craftsmanship */
    'Blacksmithing': 0,
    'Crafting': 0,
    'Loremaster': 0,
    'Telekinesis': 0,

    /* Nasty Deeds */
    'Lockpicking': 0,
    'Pickpocketing': 0,
    'Sneaking': 0,

    ...upgradeState,
};

export const TALENT_ACTIONS = Object.freeze({
    TOGGLE: 'toggle',
    TEST_PREREQUISITES: 'test-prerequisites',
    FILTER: 'filter',
});


function toggleTalentSelect(state, payload) {
    const index = state.findIndex(talent => talent === payload);

    if (index === -1)
        return [ payload, ...state ];

    return [ ...state.slice(0, index), ...state.slice(index + 1) ]
}

function talentReducer(state, { type, payload }) {
    switch(type) {
        case TALENT_ACTIONS.TOGGLE:
            return toggleTalentSelect(state, payload);
        case TALENT_ACTIONS.FILTER:
            return filterTalents(state, payload);
        default:
            throw new Error("Invalid talentReducer type");
    }
}

function filterTalents(state, { character }) {
    // filter the talents that no longer meet their corresponding prerequisites when a character property is changed
    return state.filter(talentName => allTalents[talentName].prerequisites.every(prerequisite => prerequisite({ ...character, talents: state })));
}


const initialSpellState = Object.values(SKILLS).reduce((map, skillName) => ({
    ...map,
    [skillName]: Object.keys(masteryLevels[0]).reduce((map, masteryLevel) => ({
        ...map,
        [masteryLevel]: []
    }), {})
}), {});

export const SPELL_ACTIONS = Object.freeze({
    TOGGLE: 'toggle',
});

function spellReducer(state, { type, payload }) {
    switch(type) {
        case SPELL_ACTIONS.TOGGLE:
            return toggleSpell(state, payload);
        default:
            throw new Error("Invalid spellReducer type");
    }
}

function toggleSpell(state, { skillName, masteryLevel, spellName }) {
    const skillMasteryLog = state[skillName][masteryLevel];
    const index = skillMasteryLog.findIndex(spell => spell === spellName);

    if (index === -1) {
        return {
            ...state,
            [skillName]: {
                ...state[skillName],
                [masteryLevel]: [ spellName, ...skillMasteryLog ]
            }
        };
    }

    return {
        ...state,
        [skillName]: {
            ...state[skillName],
            [masteryLevel]: [
                ...skillMasteryLog.slice(0, index),
                ...skillMasteryLog.slice(index + 1),
            ]
        }
    };
}


export const LevelContext = React.createContext();
export const AbilityContext = React.createContext();
export const AttributeContext = React.createContext();
export const TalentContext = React.createContext();
export const SpellContext = React.createContext();
export const DispatchSpellContext = React.createContext();

function CharacterPlanner() {
    const level = 20;
    const [attributes, dispatchAttribute] = useReducer(upgradeReducer, initialAttributeState);
    const [abilities, dispatchAbility] = useReducer(upgradeReducer, initialAbilityState);
    const [talents, dispatchTalent] = useReducer(talentReducer, []);
    const [spells, dispatchSpell] = useReducer(spellReducer, initialSpellState);

    useEffect(() => {
        dispatchTalent({
            type: TALENT_ACTIONS.FILTER,
            payload: {
                character: { level, abilities }
            }
        })
    }, [level, abilities]);

    return (
        <LevelContext.Provider value={ level }>
        <AbilityContext.Provider value={ abilities }>
        <AttributeContext.Provider value={ attributes }>
        <TalentContext.Provider value={ talents }>
        <SpellContext.Provider value={ spells }>

        <div className="container-fluid flex-grow-1">
            <div className="row h-100 py-3">
                <div className="col-lg-4 col-xl-3 pb-3 pb-lg-0">
                    <AbilityManager dispatch={ dispatchAbility } />
                </div>
                <div className="col-lg-8 col-xl-6">
                    <div className="row" style={{ maxHeight: 332 }}>
                        <AttributeManager dispatch={ dispatchAttribute } />
                        <TalentManager dispatch={ dispatchTalent } />
                    </div>

                    <DispatchSpellContext.Provider value={ dispatchSpell }>
                        <div className="row my-3">
                            <SkillManager />
                        </div>
                    </DispatchSpellContext.Provider>

                </div>
                <div className="col-xl-3">
                    <CharacterSummary
                        attributeLog={ attributes.log }
                        abilitiesLog={ abilities.log }
                        talentLog={ talents }
                    />
                </div>
            </div>
        </div>

        </SpellContext.Provider>
        </TalentContext.Provider>
        </AttributeContext.Provider>
        </AbilityContext.Provider>
        </LevelContext.Provider>
    );
}

export default CharacterPlanner;
