import { upgradeBehavior } from '../UpgradeUtils';

const defaultAbility = {
    name: 'Default ability',
    description: 'Default description',
    ranks: [],
    min: 0,
    max: 5,
    cost: 1
};

export const CATEGORIES = Object.freeze({
    WEAPONS: 'Weapons',
    DEFENCE: 'Defence',
    SKILLS: 'Skills',
    PERSONALITY: 'Personality',
    CRAFTSMANSHIP: 'Craftsmanship',
    NASTY_DEEDS: 'Nasty Deeds',
});

export const ABILITIES = Object.freeze({
    /* WEAPONS */
    BOW: 'Bow',
    CROSSBOW: 'Crossbow',
    DUAL_WIELDING: 'Dual Wielding',
    SINGLE_HANDED: 'Single-Handed',
    TWO_HANDED: 'Two-Handed',
    WAND: 'Wand',

    /* DEFENCE */
    ARMOUR_SPECIALIST: 'Armour Specialist',
    BODY_BUILDING: 'Body Building',
    SHIELD_SPECIALIST: 'Shield Specialist',
    WILLPOWER: 'Willpower',

    /* SKILLS */
    AEROTHEURGE: 'Aerotheurge',
    EXPERT_MARKSMAN: 'Expert Marksman',
    GEOMANCER: 'Geomancer',
    HYDROSOPHIST: 'Hydrosophist',
    MAN_AT_ARMS: 'Man-at-Arms',
    PYROKINETIC: 'Pyrokinetic',
    SCOUNDREL: 'Scoundrel',
    WITCHCRAFT: 'Witchcraft',

    /* Personality */
    CHARISMA: 'Charisma',
    BARTERING: 'Bartering',
    LEADERSHIP: 'Leadership',
    LUCKY_CHARM: 'Lucky Charm',

    /* Craftsmanship */
    BLACKSMITHING: 'Blacksmithing',
    CRAFTING: 'Crafting',
    LOREMASTER: 'Loremaster',
    TELEKINESIS: 'Telekinesis',

    /* Nasty Deeds */
    LOCKPICKING: 'Lockpicking',
    PICKPOCKETING: 'Pickpocketing',
    SNEAKING: 'Sneaking',
});

const abilities = {

    /* Weapons */
    [CATEGORIES.WEAPONS]: [
        {
            name: 'Bow',
            description: 'Bow increases the damage you do using bows.',
            ranks: [
                'Boosts damage by 10%',
                'Boosts damage by 20%',
                'Boosts damage by 30%',
                'Boosts damage by 40%',
                'Boosts damage by 50%',
            ],
        },
        {
            name: 'Crossbow',
            description: 'Crossbow increases the critical chance and the critical damage you do using crossbows.',
            ranks: [
                'Gives 10% critical chance boost and sets base critical strike multiplier to 220% ',
                'Gives 14% critical chance boost and sets base critical strike multiplier to 240% ',
                'Gives 18% critical chance boost and sets base critical strike multiplier to 260% ',
                'Gives 22% critical chance boost and sets base critical strike multiplier to 280% ',
                'Gives 25% critical chance boost and sets base critical strike multiplier to 300% ',
            ],
        },
        {
            name: 'Dual Wielding',
            description: 'Dual Wielding reduces damage penalty and total Action Point cost when wielding two weapons.',
            ranks: [
                'Sets dual wielding damage penalty to -20% and reduces the cost of attacking by 1AP',
                'Sets dual wielding damage penalty to -20% and reduces the cost of attacking by 2AP',
                'Sets dual wielding damage penalty to -10% and reduces the cost of attacking by 2AP',
                'Sets dual wielding damage penalty to 0% and reduces the cost of attacking by 2AP',
                'Sets dual wielding damage penalty to 0% and reduces the cost of attacking by 3AP',
                'Sets dual wielding damage penalty to 5% and reduces the cost of attacking by 3AP',
            ],
            max: 6,
        },
        {
            name: 'Single-handed',
            description: 'Single-handed increases the damage when using a single-handed weapon (dagger, sword, axe, or mace). This damage bonus is not applied when dual wielding.',
            ranks: [
                'Boosts damage by 10%',
                'Boosts damage by 20%',
                'Boosts damage by 30%',
                'Boosts damage by 40%',
                'Boosts damage by 50%',
            ],
        },
        {
            name: 'Two-handed',
            description: 'Two-handed increases the critical chance and the critical damage you do using a two-handed weapon (sword, axe, spear, or staff).',
            ranks: [
                'Gives 10% critical chance boost and sets base critical strike multiplier to 220% ',
                'Gives 14% critical chance boost and sets base critical strike multiplier to 240% ',
                'Gives 18% critical chance boost and sets base critical strike multiplier to 260% ',
                'Gives 22% critical chance boost and sets base critical strike multiplier to 280% ',
                'Gives 25% critical chance boost and sets base critical strike multiplier to 300% ',
            ],
        },
        {
            name: 'Wand',
            description: 'Wand increases damage of main hand wand attacks.',
            ranks: [
                'Boosts damage by 10%',
                'Boosts damage by 20%',
                'Boosts damage by 30%',
                'Boosts damage by 40%',
                'Boosts damage by 50%',
            ],
        },
    ],

    /* Defence */
    [CATEGORIES.DEFENCE]: [
        {
            name: 'Armour Specialist',
            description: 'Armour Specialist improves your armour rating and decreases your heavy armour movement penalty.',
            ranks: [
                '+3 armour rating and -20% movement penalty',
                '+6 armour rating and -40% movement penalty',
                '+9 armour rating and -60% movement penalty',
                '+12 armour rating and -80% movement penalty',
                '+15 armour rating and no movement penalty',
            ]
        },
        {
            name: 'Body Building',
            description: 'Body Building improves your saving throws against Knocked Down, Burning, Frozen, Bleeding, Crippled, Blinded, Weak, Diseased, Infected, and Drunk.',
            ranks: [
                'Reduces the chance to receive a status by 15%',
                'Reduces the chance to receive a status by 30%',
                'Reduces the chance to receive a status by 45%',
                'Reduces the chance to receive a status by 60%',
                'Reduces the chance to receive a status by 75%',
            ]
        },
        {
            name: 'Shield Specialist',
            description: 'Shield Specialist increases chance of blocking when using shields.',
            ranks: [
                'Gives 5% blocking boost to shields',
                'Gives 10% blocking boost to shields',
                'Gives 15% blocking boost to shields',
                'Gives 20% blocking boost to shields',
                'Gives 25% blocking boost to shields',
            ]
        },
        {
            name: 'Willpower',
            description: 'Willpower improves your saving throws against Feared, Mute, Charmed, Stunned, Cursed, Slowed, Petrified, Decaying Touch, Mark of Death, Remorse, and Shackles of Pain.',
            ranks: [
                'Reduces the chance to receive a status by 15%',
                'Reduces the chance to receive a status by 30%',
                'Reduces the chance to receive a status by 45%',
                'Reduces the chance to receive a status by 60%',
                'Reduces the chance to receive a status by 75%',
            ]
        },
    ],

    /* Skills */
    [CATEGORIES.SKILLS]: [
        {
            name: 'Aerotheurge',
            description: 'Determines how many Aerotheurge spells you can learn and how many Action Points it costs to use higher level Aerotheurge spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Aerotheurge skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Aerotheurge skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Aerotheurge skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Aerotheurge skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Aerotheurge skills',
            ]
        },
        {
            name: 'Expert Marksman',
            description: 'Determines how many Expert Marksman spells you can learn and how many Action Points it costs to use higher level Expert Marksman spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Expert Marksman skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Expert Marksman skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Expert Marksman skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Expert Marksman skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Expert Marksman skills',
            ]
        },
        {
            name: 'Geomancer',
            description: 'Determines how many Geomancer spells you can learn and how many Action Points it costs to use higher level Geomancer spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Geomancer skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Geomancer skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Geomancer skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Geomancer skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Geomancer skills',
            ]
        },
        {
            name: 'Hydrosophist',
            description: 'Determines how many Hrydrosophis spells you can learn and how many Action Points it costs to use higher level Hydrosophist spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Hydrosophist skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Hydrosophist skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Hydrosophist skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Hydrosophist skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Hydrosophist skills',
            ]
        },
        {
            name: 'Man-at-Arms',
            description: 'Determines how many Man-at-Arms spells you can learn and how many Action Points it costs to use higher level Man-at-Arms spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Man-at-Arms skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Man-at-Arms skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Man-at-Arms skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Man-at-Arms skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Man-at-Arms skills',
            ]
        },
        {
            name: 'Pyrokinetic',
            description: 'Determines how many Pyrokinetic spells you can learn and how many Action Points it costs to use higher level Pyrokinetic spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Pyrokinetic skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Pyrokinetic skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Pyrokinetic skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Pyrokinetic skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Pyrokinetic skills',
            ]
        },
        {
            name: 'Scoundrel',
            description: 'Determines how many Scoundrel spells you can learn and how many Action Points it costs to use higher level Scoundrel spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Scoundrel skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Scoundrel skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Scoundrel skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Scoundrel skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Scoundrel skills',
            ]
        },
        {
            name: 'Witchcraft',
            description: 'Determines how many Witchcraft spells you can learn and how many Action Points it costs to use higher level Witchcraft spells.',
            ranks: [
                'Allows you to learn and use 3 Novice, 0 Adept, and 0 Master Witchcraft skills',
                'Allows you to learn and use 5 Novice, 2 Adept, and 0 Master Witchcraft skills',
                'Allows you to learn and use 6 Novice, 3 Adept, and 0 Master Witchcraft skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 1 Master Witchcraft skills',
                'Allows you to learn and use 6 Novice, 4 Adept, and 2 Master Witchcraft skills',
            ]
        },
    ],

    /* Personality */
    [CATEGORIES.PERSONALITY]: [
        {
            name: 'Bartering',
            description: 'Bartering determines your haggling skills with traders',
            ranks: [
                "Trader's items are 10% cheaper, and they will give you 10% more for yours",
                "Trader's items are 20% cheaper, and they will give you 20% more for yours",
                "Trader's items are 30% cheaper, and they will give you 30% more for yours",
                "Trader's items are 40% cheaper, and they will give you 40% more for yours",
                "Trader's items are 50% cheaper, and they will give you 50% more for yours",
            ]
        },
        {
            name: 'Charisma',
            description: 'Charisma determines the first impression you make on other people and your talent for Charming, Intimidating, and Reasoning.',
            ranks: [
                "Trader's items are 10% cheaper, and they will give you 10% more for yours",
                "Trader's items are 20% cheaper, and they will give you 20% more for yours",
                "Trader's items are 30% cheaper, and they will give you 30% more for yours",
                "Trader's items are 40% cheaper, and they will give you 40% more for yours",
                "Trader's items are 50% cheaper, and they will give you 50% more for yours",
            ]
        },
        {
            name: 'Leadership',
            description: 'Leadership will give boosts to party members and friends that can see you.',
            ranks: [
                'Boosts initiative and damage',
                'Boosts initiative and damage',
                'Boosts initiative and damage',
                'Boosts initiative and damage',
                'Boosts initiative and damage',
            ]
        },
        {
            name: 'Lucky Charm',
            description: 'Lucky Charm determines your luck in finding extra treasure and improves your Offence Rating.',
            ranks: []
        },
    ],

    /* Craftsmanship */
    [CATEGORIES.CRAFTSMANSHIP]: [
        {
            name: 'Blacksmithing',
            description: "Blacksmithing allows you to repair your own items; the more you invest, the faster you'll work. Required to create and improve metal-enhanced weapons and armour.",
            ranks: []
        },
        {
            name: 'Crafting',
            description: 'Crafting determines what you can craft and the quality of your crafted items. The more invested it is, the faster you can craft.',
            ranks: []
        },
        {
            name: 'Loremaster',
            description: 'Loremaster allows you to examine enemies and identify items. The more invested it is, the more in-depth your intel.',
            ranks: []
        },
        {
            name: 'Telekinesis',
            description: 'With telekinesis you can move items from a distance. The higher your Telekinesis score, the heavier the items you can telepathically lift, and the farther you can move them.',
            ranks: []
        },
    ],

    /* Nasty Deeds */
    [CATEGORIES.NASTY_DEEDS]: [
        {
            name: 'Lockpicking',
            description: 'Lockpicking determines what complexity of locks you can pick and how fast you can do it.',
            ranks: []
        },
        {
            name: 'Pickpocketing',
            description: 'Pickpocketing determines what you can steal and who you can successfully pickpocket.',
            ranks: []
        },
        {
            name: 'Sneaking',
            description: 'Sneaking determines how well you can sneak without getting caught.',
            ranks: []
        },
    ]
};

const AbilitiesModel = {
    name: 'Abilities',
    pointsByLevel: [5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49],
    abilities: Object.entries(abilities).reduce((obj, [key, abilityArray]) => {
        return {
            ...obj,
            [key]: abilityArray.map(ability => ({ ...defaultAbility, ...ability }))
        }
    }, {}),
    behavior: {
        ...upgradeBehavior,
        upgradeState: (ability) => ({ ...ability, value: ability.value + 1, cost: ability.cost + 1 }),
        downgradeState: (ability) => ({ ...ability, value: ability.value - 1, cost: ability.cost - 1 }),
    }
};

export default AbilitiesModel;
