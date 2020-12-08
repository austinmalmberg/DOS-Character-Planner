import React, { useState } from 'react';

import Navbar from './components/Navbar';
import CharacterLevel from './components/CharacterLevel';
import AttributeContainer from './components/AttributeContainer';
import Talents from './components/Talents';
import Abilities from './components/Abilities';

function App() {
    const [level, setLevel] = useState(1);

    return (
        <div>
            <header className="mb-3">
                < Navbar />
            </header>
            <div className="container-fluid">
                <div className="col-4">
                    < CharacterLevel level={ level } setLevel={ setLevel }/>
                </div>
                <div className="row container-fluid my-3">
                    <div className="col container border py-3 mr-2">
                        < Abilities level={ level } />
                    </div>
                    <div className="col container border py-3 mx-2">
                        < AttributeContainer level={ level } />
                    </div>
                    <div className="col container border py-3 ml-2">
                        < Talents level={ level } />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
