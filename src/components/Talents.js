import React, { useState, useEffect } from 'react';

const talentPointsByLevel = [2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0];

function Talents({ level }) {
    const getAvailablePoints = function(level) {
        return talentPointsByLevel.slice(0, level).reduce((a, b) => a + b, 0);
    }

    const [available, setAvailable] = useState(getAvailablePoints(level));
    const [used, setUsed] = useState(0);

    useEffect(() => {
        setAvailable(getAvailablePoints(level) - used);
    }, [level, used]);

    return (
        <>
            <div className="text-center">
                <h2>Talents</h2>
                <h4>Available: { available }</h4>
            </div>
        </>
    );
}

export default Talents;
