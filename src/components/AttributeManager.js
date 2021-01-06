import React, { memo, useContext } from 'react';

import Model from '../models/Attributes';

import { LevelContext, AttributeContext } from './CharacterPlanner';

import Container from './utils/Container';

import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';
import UpgradeComponent from './upgrades/UpgradeComponent';

function AttributeManager({ dispatch }) {
    const level = useContext(LevelContext);
    const attributes = useContext(AttributeContext);

    const availablePoints = Model.pointsByLevel[level - 1] - attributes.pointsUsed;

    return (
        <Container classNames="col-md mr-md-2">
            <UpgradeContainerHeader name={ Model.name } availablePoints={ availablePoints }/>
            {
                Model.attributes.map((attribute, i) => (
                    < UpgradeComponent
                        key={ i }
                        upgrade={ attribute }
                        availablePoints={ availablePoints }
                        value={ attributes[attribute.name] }
                        upgradeBehavior={ Model.behavior }
                        dispatch={ dispatch }
                        htmlTooltip={ true }
                    />
                ))
            }
        </Container>
    );
}

export default memo(AttributeManager);
