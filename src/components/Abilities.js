import React, { useState, useEffect } from 'react';

import AbilityCategory from './abilities/AbilityCategory';

const abilityPointsByLevel = [5, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

const abilityCategories = [
    {
        name: "Weapons",
        abilities: [
            {
                name:'Bow'
            }
        ]
    },
    {
        name: "Defence",
        abilities: []
    },
    {
        name: "Skills",
        abilities: []
    },
    {
        name: "Personality",
        abilities: []
    },
    {
        name: "Craftsmanship",
        abilities: []
    },
    {
        name: "Nasty Deeds",
        abilities: []
    }
];

function Abilities({ level }) {
    const getAvailablePoints = (level) => {
        return abilityPointsByLevel.slice(0, level).reduce((a, b) => a + b, 0);
    }

    const [available, setAvailable] = useState(getAvailablePoints(level));
    const [used, setUsed] = useState(0);

    /* ON LEVEL CHANGED */
    useEffect(() => {
        setAvailable(getAvailablePoints(level) - used);
    }, [level, used]);

    return (
        <>
            <div className="text-center">
                <h2>Abilities</h2>
                <h4>Available: { available }</h4>
            </div>
            <div className="container">
                {
                    abilityCategories.map(abilityCategory => (
                        < AbilityCategory key={ abilityCategory.name } abilityCategory={ abilityCategory } />
                    ))
                }
            </div>
        </>
    );
}

export default Abilities;
