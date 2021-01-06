import React from 'react';

import Container from './utils/Container';
import ContainerHeader from './utils/ContainerHeader';

function CharacterSummary({ attributeLog, abilitiesLog, talentLog }) {
    return (
        <Container classNames="h-100">
            <ContainerHeader name={ "Summary" } />
            <h5>Attributes</h5>
            <ol>
            {
                attributeLog.slice().reverse().map((entry, i) => (
                    <li key={ i }>{ entry.name }</li>
                ))
            }
            </ol>

            <h5>Abilities</h5>
            <ol>
            {
                abilitiesLog.slice().reverse().map((entry, i) => (
                    <li key={ i }>{ entry.name }</li>
                ))
            }
            </ol>

            <h5>Talents</h5>
            <ol>
            {
                talentLog.slice().reverse().map((talent, i) => (
                    <li key={ i }>{ talent }</li>
                ))
            }
            </ol>
        </Container>
    );
}

export default CharacterSummary;
