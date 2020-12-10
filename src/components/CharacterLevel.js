import React from 'react';

function CharacterLevel({ level, setLevel }) {
    const minLevel = 1;
    const maxLevel = 20;

    return (
        <div className="d-flex justify-content-between align-items-center text-center col-md-6 col-lg-4">
            <div className="col-8">
                <h4>Character Level</h4>
                <input
                    className="w-100"
                    type="range"
                    min={ minLevel }
                    max={ maxLevel }
                    defaultValue={ level }
                    onInput={ (e) => setLevel(Number(e.target.value)) }
                />
            </div>
            <div className="col">
                <span className="display-4">{ level }</span>
            </div>
        </div>
    );
}

export default CharacterLevel;
