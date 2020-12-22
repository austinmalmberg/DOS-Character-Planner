
const ATTRIBUTE_NAMES = Object.freeze({
    STRENGTH: 'Strength',
    DEXTERITY: 'Dexterity',
    INTELLIGENCE: 'Intelligence',
    CONSTITUTION: 'Constitution',
    SPEED: 'Speed',
    PERCEPTION: 'Perception'
});

const defaultAttribute = {
    name: 'Default attribute',
    description: 'Default description',
    value: 5,
    min: 5,
    cost: 1
};

const attributes = [
    {
        name: 'Strength',
        description: 'Strength determines your Offence Rating with Strength-based weapons, improves Man-at-Arms skills and how much you can carry. Increases the weight of items you can move and how far you can throw them.\n\nRecommended for warriors and fighters.'
    },
    {
        name: 'Dexterity',
        description: 'Dexterity determines your Offence Rating with Dexterity-based weapons, improves Expert Marksman and Scoundrel skills and influences your Defence Rating.\n\nRecommended for archers and rogues.'
    },
    {
        name: 'Intelligence',
        description: 'Intelligence improves your Elemental and Witchcraft spells and your Offence Rating with Intelligence-based weapons.\n\nRecommended for spellcasters.'
    },
    {
        name: 'Constitution',
        description: 'Constitution increases your Vitality and your maximum number of Action Points.\n\nSurvive longer in battle.'
    },
    {
        name: 'Speed',
        description: 'Speed affects your movement speed, initiative, and how many Action Points you gain per turn.\n\nIncreases your number of moves in battle.'
    },
    {
        name: 'Perception',
        description: 'Perception affects your critical change, initiative, start Action Points in combat, ability to detect traps, and accuracy when shooting over long distances.\n\nSee hidden details.'
    },
];

const AttributesModel = {
    name: 'Attributes',
    pointsByLevel: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15],
    attributes: attributes.map(attribute => ({ ...defaultAttribute, ...attribute })),
    behavior: {
        onUpgrade: (attribute) => ({ ...attribute, value: attribute.value + 1 }),
        onDowngrade: (attribute) => ({ ...attribute, value: attribute.value - 1 }),
    }
};

export default AttributesModel;
export { ATTRIBUTE_NAMES }
