const properties = ["Strength", "Dexterity", "Intelligence", "Constitution", "Speed", "Perception"];

const defaultValues = {
    value: 5,
    min: 5,
    cost: 1
};

const AttributesModel = {
    name: 'Attributes',
    pointsByLevel: [5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15],
    defaults: properties.map(name => ({ ...defaultValues, name })),
    handleUpgrade: (attribute) => ({ ...attribute, value: attribute.value + 1 }),
    handleDowngrade: (attribute) => ({ ...attribute, value: attribute.value - 1 }),
};

export default AttributesModel;


const name = 'Abilities';

const pointsByLevel = [5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49];
const relPointsByLevel = [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

const onUpgrade(ability) {
    return { ...ability, value: ability.value + 1, cost: ability.cost + 1 };
}

const onDowngrade(ability) {
    return { ...ability, value: ability.value - 1, cost: ability.cost - 1 };
}

const defaults = [
    {
        name: "Bow",
        value: 0,
        min: 0,
        cost: 1
    },
    {
        name: "Crossbow",
        value: 0,
        min: 0,
        cost: 1
    },
    {
        name: "Dual-wielding",
        value: 0,
        min: 0,
        cost: 1
    },
    {
        name: "Single-handed",
        value: 0,
        min: 0,
        cost: 1
    },
    {
        name: "Two-handed",
        value: 0,
        min: 0,
        cost: 1
    },
    {
        name: "Wand",
        value: 0,
        min: 0,
        cost: 1
    }
];

export default { name, pointsByLevel, relPointsByLevel, defaults };
