import React, { useState } from 'react';

import Model from '../models/Skills';

import Container from './utils/Container';
import ContainerHeader from './utils/ContainerHeader';

import SkillListGroup from './SkillListGroup';

const SpellBehaviorContext = React.createContext();

function SkillManager() {
    return (
        <Container classNames="w-100">
            <ContainerHeader name={ "Skills" } />
            <SpellBehaviorContext.Provider value={Model.spellBehavior}>
                {
                    Model.skills.map((skill, i) => (
                        <SkillListGroup skill={ skill } />
                    ))
                }
            </SpellBehaviorContext.Provider>
        </Container>
    );
}

export default SkillManager;
export { SpellBehaviorContext };
