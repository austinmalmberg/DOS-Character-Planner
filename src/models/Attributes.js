
const attributePointsByLevel = [5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

function getAttributePointsForLevel(level) {
    return attributePointsByLevel.slice(0, level).reduce((tot, points) => tot + points, 0);
}

const pointSummary = [
    {
        level: 1,
        pointsAwarded: 5,
        upgrades: []
    },
    {
        level: 2,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 4,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 6,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 8,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 10,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 12,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 14,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 16,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 18,
        pointsAwarded: 1,
        upgrades: []
    },
    {
        level: 20,
        pointsAwarded: 1,
        upgrades: []
    }
]

const attributes = [
    {
        name: "Strength",
        value: 5,
        min: 5,
        upgradeCost: 1
    },
    {
        name: "Dexterity",
        value: 5,
        min: 5,
        upgradeCost: 1
    },
    {
        name: "Intelligence",
        value: 5,
        min: 5,
        upgradeCost: 1
    },
    {
        name: "Constitution",
        value: 5,
        min: 5,
        upgradeCost: 1
    },
    {
        name: "Speed",
        value: 5,
        min: 5,
        upgradeCost: 1
    },
    {
        name: "Perception",
        value: 5,
        min: 5,
        upgradeCost: 1
    }
];

export { attributePointsByLevel, getAttributePointsForLevel, pointSummary, attributes };
