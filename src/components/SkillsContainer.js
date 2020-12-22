import React, { useState } from 'react';

import Model from '../models/Skills';

import Container from './utils/Container';
import ContainerHeader from './utils/ContainerHeader';

import SkillManager from './SkillManager';

const SpellBehaviorContext = React.createContext();

function SkillsContainer() {
    return (
        <Container classNames="w-100">
            <ContainerHeader name={ "Skills" } />
            <SpellBehaviorContext.Provider value={Model.spellBehavior}>
                {
                    Model.skills.map((skill, i) =>
                        <SkillManager key={ i } index={ i } skill={ skill } / >
                    )
                }
            </SpellBehaviorContext.Provider>
        </Container>
    );
}

export default SkillsContainer;
export { SpellBehaviorContext };
