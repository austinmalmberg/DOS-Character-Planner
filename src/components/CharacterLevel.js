import React from 'react';

function CharacterLevel({ level, setLevel }) {

    return (
        <div className="d-flex justify-content-between align-items-center text-center col-md-6 col-lg-4">
            <div className="col-8">
                <h4>Character Level</h4>
                <input
                    className="w-100"
                    type="range"
                    min={ 1 }
                    max={ 20 }
                    value={ level }
                    onInput={ (event) => setLevel(Number(event.target.value)) }
                />
            </div>
            <div className="col">
                <span className="display-4">{ level }</span>
            </div>
        </div>
    );
}

export default CharacterLevel;
