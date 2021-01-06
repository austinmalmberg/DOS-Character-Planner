import Model from '../models/Skills';

import Container from './utils/Container';
import ContainerHeader from './utils/ContainerHeader';

import SkillListGroup from './SkillListGroup';

function SkillManager() {
    return (
        <Container classNames="w-100">
            <ContainerHeader name={ "Skills" } />
            {
                Model.skills.map(skill => (
                    <SkillListGroup key={ skill.name } skill={ skill } />
                ))
            }
        </Container>
    );
}

export default SkillManager;
