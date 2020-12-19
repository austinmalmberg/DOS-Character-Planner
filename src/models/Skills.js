
const defaultSchool = {
    name: 'Default school',
    skills: [],
}

const defaultSkill = {
    selected: false
}

const schools = [
    {
        name: 'Aerotheurge',
        skills: [
            {
                ...defaultSkill,
                name: 'Avatar of Storms',
                image_url: './images/avatar_of_storms.png'
            }
        ]
    },
    {
        name: 'Expert Marksman',
    },
    {
        name: 'Geomancer',
    },
    {
        name: 'Hydrosophist',
    },
    {
        name: 'Man-at-Arms',
    },
    {
        name: 'Pyrokinetic',
    },
    {
        name: 'Scoundrel',
    },
    {
        name: 'Witchcraft',
    },
]

const SkillsModel = {
    name: 'Skills',
    schools: schools.map(school => ({ ...defaultSchool, ...school })),
    behavior: {
        onSkillSelected: (skill) => ({ ...skill, selected: true }),
        onSkillDeselected: (skill) => ({ ...skill, selected: false }),
    },

};

export default SkillsModel;
