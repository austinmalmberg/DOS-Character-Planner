import { CHARACTER } from './Character';
import { ATTRIBUTE_NAMES } from './Attributes';

const defaultTalent = {
    name: 'Default talent',
    description: 'Default description',
    prerequisites: [],
    selected: false,
    disabled: false,
}

const talents = [
    {
        name: 'Sample 1',
        id: 'sample1',
        prerequisites: [
            (characterValues) => characterValues[CHARACTER.ATTRIBUTES][ATTRIBUTE_NAMES.STRENGTH] >= 7,
        ]
    },
    {
        name: 'Sample 2',
        id: 'sample2',
    },
];

const TalentsModel = {
    name: 'Talents',
    pointsByLevel: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
    talents: talents.map(talent => ({ ...defaultTalent, ...talent })),
    talentBehavior: {
        toggleSelect: (talent) => ({ ...talent, selected: !talent.selected }),
        onSelect: (talent) => ({ ...talent, selected: true }),
        onDeselect: (talent) => ({ ...talent, selected: true }),
        onPrerequisitesMet: (talent) => ({ ...talent, disabled: false }),
        onPrerequisitesNotMet: (talent) => ({ ...talent, selected: false, disabled: true }),
    }
};

export default TalentsModel;
