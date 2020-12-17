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

