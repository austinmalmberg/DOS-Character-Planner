import React, { useState, useReducer } from 'react';

import Navbar from './components/Navbar';
import CharacterLevel from './components/CharacterLevel';

import AttributeContainer from './components/AttributeContainer';

import CharacterSummary from './components/CharacterSummary';

function logReducer(logs, { key, log }) {
    const updateLogs = { ...logs };
    updateLogs[key] = log;
    return updateLogs;
}

function App() {
    const [level, setLevel] = useState(1);
    const [logs, logsDispatcher] = useReducer(logReducer, {});

    return (
        <div>
            <header className="mb-3">
                < Navbar />
            </header>
            <div className="container-fluid">
                <div>
                    < CharacterLevel level={ level } setLevel={ setLevel } />
                </div>
                <div className="row container-fluid">
                    < AttributeContainer
                        level={ level }
                        logsDispatcher={ logsDispatcher } />
                </div>
                <div className="row container-fluid">
                    {
                        Object.entries(logs).map(([k, v]) => (
                            <div key={ k }>
                                <h4>{ k }</h4>
                                <p>{ v.map(e => e.name).join(", ") }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default App;