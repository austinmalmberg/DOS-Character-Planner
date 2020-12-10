import React, { useState, useMemo } from 'react';

import AttributeContainer from './attributes/AttributeContainer';
import Abilities from './abilities/Abilities';
import CharacterLevel from './components/CharacterLevel';
import Navbar from './components/Navbar';
import Talents from './components/Talents';
import { getAttributePointsForLevel } from './models/Attributes';

function App() {
    const [level, setLevel] = useState(1);

    // a variable to track the number of available points awarded at any given level
    const attributePoints = useMemo(() => getAttributePointsForLevel(level), [level]);
    const [attributeLog, setAttributeLog] = useState([]);

    return (
        <div>
            <header className="mb-3">
                < Navbar />
            </header>
            <div className="container-fluid">
                <div>
                    < CharacterLevel level={ level } setLevel={ setLevel }/>
                </div>
                <div className="row container-fluid">
                    <div className="col-md mx-2 my-3 px-2 py-3 border">
                        < Abilities level={ level } />
                    </div>
                    <div className="col-md mx-2 my-3 px-2 py-3 border">
                        < AttributeContainer points={ attributePoints } setAttributeLog={ setAttributeLog } />
                    </div>
                    <div className="col-xl mx-2 my-3 px-2 py-3 border">
                        < Talents level={ level } />
                    </div>
                    <div>
                        {
                            attributeLog.map((entry, i) => (
                                <p key={ i }>{ entry.name }</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
