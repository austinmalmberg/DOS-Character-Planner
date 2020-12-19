
const defaultTalent = {
    name: 'Default talent',
    prerequisites: [],
    selected: false
}

const talents = [
    {
        name: 'Sample 1',
    },
    {
        name: 'Sample 2',
    },
];

const TalentsModel = {
    name: 'Talents',
    pointsByLevel: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
    talents: talents.map(talent => ({ ...defaultTalent, ...talent })),
    behavior: {
        onSelect: (talent) => ({ ...talent, selected: true }),
        onDeselect: (talent) => ({ ...talent, selected: true }),
    }
};

export default TalentsModel;
