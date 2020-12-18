// const relPointsByLevel = [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

const categories = ['Weapons', 'Defense', 'Skills', 'Personality', 'Craftsmanship', 'Nasty Deeds'];

const abilities = [
    {
        name: 'Bow',
        ranks: [
            'Increase bow damage by 10%',
            'Increase bow damage by 20%',
            'Increase bow damage by 30%',
            'Increase bow damage by 40%',
            'Increase bow damage by 50%',
        ],
        category: 'Weapons',
    },
    {
        name: 'Crossbow',
        ranks: [
            'Increase critical chance by 10% and 220% critical strike multiplier',
            'Increase critical chance by 14% and 240% critical strike multiplier',
            'Increase critical chance by 18% and 260% critical strike multiplier',
            'Increase critical chance by 22% and 280% critical strike multiplier',
            'Increase critical chance by 25% and 300% critical strike multiplier',
        ],
        category: 'Weapons',
    },
    {
        name: 'Dual Wielding',
        ranks: [
            '-20% dual wielding damage penalty and reduces the cost of attacking by 1AP',
            '-20% dual wielding damage penalty and reduces the cost of attacking by 2AP',
            '-10% dual wielding damage penalty and reduces the cost of attacking by 2AP',
            'no dual wielding damage penalty and reduces the cost of attacking by 2AP',
            'no dual wielding damage penalty and reduces the cost of attacking by 3AP',
            '+5% dual wielding damage and reduces the cost of attacking by 3AP',
        ],
        max: 6,
        category: 'Weapons',
    },
    {
        name: 'Single-handed',
        ranks: [
            'Increase single-handed damage by 10%',
            'Increase single-handed damage by 20%',
            'Increase single-handed damage by 30%',
            'Increase single-handed damage by 40%',
            'Increase single-handed damage by 50%',
        ],
        category: 'Weapons',
    },
    {
        name: 'Two-handed',
        ranks: [
            'Increase critical chance by 10% and 200% critical strike multiplier',
            'Increase critical chance by 14% and 240% critical strike multiplier',
            'Increase critical chance by 18% and 260% critical strike multiplier',
            'Increase critical chance by 22% and 280% critical strike multiplier',
            'Increase critical chance by 25% and 300% critical strike multiplier',
        ],
        category: 'Weapons',
    },
    {
        name: 'Wand',
        ranks: [
            'Increase wand damage by 10%',
            'Increase wand damage by 20%',
            'Increase wand damage by 30%',
            'Increase wand damage by 40%',
            'Increase bow damage by 50%',
        ],
        category: 'Weapons',
    },
];

const defaultAbility = {
    name: 'Default ability',
    ranks: [],
    value: 0,
    min: 0,
    max: 5,
    cost: 1
};

const AbilitiesModel = {
    name: 'Abilities',
    categories,
    pointsByLevel: [5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49],
    abilities: abilities.map(ability => ({ ...defaultAbility, ...ability }) ),
    handleUpgrade: (ability) => ({ ...ability, value: ability.value + 1, cost: ability.cost + 1 }),
    handleDowngrade: (ability) => ({ ...ability, value: ability.value - 1, cost: ability.cost - 1 }),
};

export default AbilitiesModel;
