import React, { useContext } from 'react';

import Model from '../models/Talents';

import Container from './utils/Container';
import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import Talent from './Talent';
import { LevelContext, TalentContext } from './CharacterPlanner';


function TalentManager({ dispatch }) {
    const level = useContext(LevelContext);
    const talents = useContext(TalentContext);

    const availablePoints = Model.pointsByLevel[level - 1] - Object.values(talents).filter(talent => talent.selected).length;

    return (
        <Container classNames="d-flex flex-column col-md ml-md-2 mb-md-0" style={{ maxHeight: 332 }}>
            <UpgradeContainerHeader name={ Model.name } availablePoints={ availablePoints } />
            <div className="flex-grow-1 overflow-auto">
                {
                    Object.keys(Model.talents).map(name => (
                        <Talent
                            key={ name }
                            name={ name }
                            dispatch={ dispatch }
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default TalentManager;
