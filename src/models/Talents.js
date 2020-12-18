
const talents = [
    {
        name: 'Sample 1',
    },
    {
        name: 'Sample 2',
    },
];

const defaultTalent = {
    name: 'Default talent',
    prerequisites: [],
    active: false
}

const TalentsModel = {
    name: 'Talents',
    pointsByLevel: [2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7],
    defaults: talents.map(talent => ({ ...defaultTalent, ...talent })),
    handleUpgrade: (talent) => ({ ...talent, active: true }),
    handleDowngrade: (talent) => ({ ...talent, active: true }),
};

export default TalentsModel;
