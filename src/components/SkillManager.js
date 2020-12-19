import React, { useState } from 'react';

import Model from '../models/Skills';

import Container from './utils/Container';
import ContainerHeader from './utils/ContainerHeader';

const initialState = {
    schools: Model.schools,

}

function SkillManager() {
    const [state, setState] = useState(initialState);

    const style = {
        // filter: 'grayscale(100%)'
    }

    return (
        <Container classNames="w-100">
            <ContainerHeader name={ "Skills" } />
            <img disabled={ false } src={'./images/avatar_of_storms.png'} />
        </Container>
    );
}

export default SkillManager;
