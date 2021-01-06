import { ABILITIES } from './Abilities';

const behavior = {
    toggleSelect: (talent) => ({ ...talent, selected: !talent.selected }),
    prerequisitesMet: (talent) => ({ ...talent, disabled: false }),
    prerequisitesNotMet: (talent) => ({ ...talent, selected: false, disabled: true }),
};

const defaultTalent = {
    name: 'Default talent',
    description: 'Default description',
    prerequisites: []
}

const baseTalents = {
    'All Skilled Up': {
        id: 'all-skilled-up',
        description: 'Grant players 2 extra Ability Points',
        prerequisites: [
            ({ level }) => level >= 3
        ]
    },
    'Avoid Opportunists': {
        id: 'avoid-opportunists',
        description: 'Grants ability to evade attacks of oppotunity',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.EXPERT_MARKSMAN] >= 1
        ]
    },
    'Anaconda': {
        id: 'anaconda',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.SINGLE_HANDED] >= 1
        ]
    },
    'Arrow Recovery': {
        id: 'arrow-recovery',
    },
    'Back-Stabber': {
        id: 'back-stabber',
    },
    'Bigger and Better': {
        id: 'bigger-and-better',
        prerequisites: [
            ({ level }) => level >= 5
        ]
    },
    'Bully': {
        id: 'bully',
    },
    'Comeback Kid': {
        id: 'comeback-kid',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.WILLPOWER] >= 5
        ]
    },
    'Courageous': {
        id: 'courageous',
        prerequisites: [
            ({ talents }) => !talents.includes('Escapist')
        ],
    },
    'Demon': {
        id: 'demon',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.PYROKINETIC] >= 4
        ]
    },
    'Elemental Affinity': {
        id: 'elemental-affinity',
    },
    'Elemental Ranger': {
        id: 'elemental-ranger',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.EXPERT_MARKSMAN] >= 5
        ]
    },
    'Escapist': {
        id: 'escapist',
        prerequisites: [
            ({ talents }) => !talents.includes('Courageous')
        ],
    },
    'Far Out Man': {
        id: 'far-out-man',
    },
    'Five-Star Diner': {
        id: 'five-star-diner',
    },
    'Glass Cannon': {
        id: 'glass-cannon',
        prerequisites: [
            ({ level }) => level >= 5,
            ({ talents }) => !talents.includes('Lone Wolf')
        ],
    },
    'Guerrilla': {
        id: 'guerrilla',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.SNEAKING] >= 1
        ]
    },
    'Headstrong': {
        id: 'headstrong',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.SCOuNDREL] >= 5
        ]
    },
    'Hyperopia': {
        id: 'hyperopia',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.EXPERT_MARKSMAN] >= 2
        ]
    },
    'Ice King': {
        id: 'ice-king',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.HYDROSOPHIST] >= 4
        ]
    },
    'Iron Hide': {
        id: 'iron-hide',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.MAN_AT_ARMS] >= 5
        ]
    },
    'Know-It-All': {
        id: 'know-it-all',
    },
    'Leech': {
        id: 'leech',
    },
    'Light Stepper': {
        id: 'light-stepper',
    },
    'Lightning Rod': {
        id: 'lightning-rod',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.AEROTHEURGE] >= 5
        ]
    },
    'Lone Wolf': {
        id: 'lone-wolf',
        prerequisites: [
            ({ talents }) => !talents.includes('Glass Cannon')
        ],
    },
    'Magician': {
        id: 'magician',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.WAND] >= 1
        ]
    },
    'My Precious': {
        id: 'my-precious',
    },
    'Opportunist': {
        id: 'opportunist',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.MAN_AT_ARMS] >= 1
        ]
    },
    'Packmule': {
        id: 'packmule',
    },
    'Parry Master': {
        id: 'parry-master',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.DUAL_WIELDING] >= 4
        ]
    },
    'Pet Pal': {
        id: 'pet-pal',
    },
    'Picture of Health': {
        id: 'picture-of-health',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.MAN_AT_ARMS] >= 2
        ]
    },
    'Pinpoint': {
        id: 'pinpoint',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.SCOUNDREL] >= 1
        ]
    },
    'Politician': {
        id: 'politician',
    },
    'Scientist': {
        id: 'scientist',
    },
    'Sidestep': {
        id: 'sidestep',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.EXPERT_MARKSMAN] >= 4
        ]
    },
    'Sidewinder': {
        id: 'sidewinder',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.MAN_AT_ARMS] >= 5
        ]
    },
    'Slingshot': {
        id: 'slingshot',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.MAN_AT_ARMS] >= 1
        ]
    },
    'Speedcreeper': {
        id: 'speedcreeper',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.SNEAKING] >= 1
        ]
    },
    'Stand Your Ground': {
        id: 'stand-your-ground',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.BODY_BUILDING] >= 5
        ]
    },
    'Stench': {
        id: 'stench',
    },
    'Swift Footed': {
        id: 'swift-footed',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.SCOUNDREL] >= 2
        ]
    },
    'Thick Skin': {
        id: 'thick-skin',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.MAN_AT_ARMS] >= 1
        ]
    },
    'Voluble Mage': {
        id: 'voluble-mage',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.WILLPOWER] >= 5
        ]
    },
    'Walk It Off': {
        id: 'walk-it-off',
    },
    'Weatherproof': {
        id: 'weatherproof',
        prerequisites: [
            ({ abilities }) => abilities[ABILITIES.GEOMANCER] >= 5
        ]
    },
    'What a Rush': {
        id: 'what-a-rush',
    },
    'Zombie': {
        id: 'zombie',
    },
};

export const allTalents = Object.entries(baseTalents)
    .reduce((map, [name, talentProperties]) => ({
        ...map,
        [name]: {
            ...defaultTalent,
            ...talentProperties
        }
    }), {});

const TalentsModel = {
    name: 'Talents',
    behavior,
    pointsByLevel: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
    talents: allTalents
};

// (talent => ({ ...defaultTalent, ...talent })),
export default TalentsModel;
