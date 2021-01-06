import React, { memo, useContext } from 'react';

import Model, { CATEGORIES } from '../models/Abilities';

import Container from './utils/Container';

import UpgradeContainerHeader from './upgrades/UpgradeContainerHeader';

import { LevelContext, AbilityContext } from './CharacterPlanner';
import AbilityCategory from './AbilityCategory';


function AbilityManager({ dispatch }) {
    const level = useContext(LevelContext);
    const abilityValues = useContext(AbilityContext);

    const availablePoints = Model.pointsByLevel[level - 1] - abilityValues.pointsUsed;

    return (
        <Container classNames="h-100">
            <UpgradeContainerHeader name={ Model.name } availablePoints={ availablePoints }/>
            {
                Object.values(CATEGORIES).map((categoryName, i) => (
                    <AbilityCategory
                        key={ i }
                        categoryName={ categoryName }
                        availablePoints={ availablePoints }
                        dispatch={ dispatch }
                    />
                ))
            }
        </Container>
    );
}

export default memo(AbilityManager);
