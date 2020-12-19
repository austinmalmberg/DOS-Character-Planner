import React from 'react';

import Container from './utils/Container';
import ContainerHeader from './utils/ContainerHeader';

function CharacterSummary({ logs }) {
    return (
        <Container classNames="h-100">
            <ContainerHeader name={ "Summary" } />
            {
                Object.keys(logs).filter(key => logs[key].length > 0).map((logName, i) => (
                    <div key={ i }>
                        <h5>{ logName }</h5>
                        <p>{ logs[logName].map(entry => entry.name).join(", ") }</p>
                    </div>
                ))
            }
        </Container>
    );
}

export default CharacterSummary;
