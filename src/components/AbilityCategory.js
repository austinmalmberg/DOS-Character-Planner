import React, { useContext } from 'react';

import Model from '../models/Abilities';

import { AbilityContext } from './CharacterPlanner';

import UpgradeComponent from './upgrades/UpgradeComponent';


function AbilityCategory({ categoryName, availablePoints, dispatch }) {
    const abilityValues = useContext(AbilityContext);

    const abilities = Model.abilities[categoryName];

    const categoryPoints = abilities.reduce((total, ability) => total + abilityValues[ability.name], 0);

    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item p-0 py-1 my-1">
                <a
                    className="btn d-flex justify-content-between align-items-center bg-primary text-light py-2 px-3"
                    data-toggle="collapse"
                    href={ "#" + categoryName.toLowerCase() }
                    role="button"
                    aria-expanded="true"
                    aria-controls={ categoryName.toLowerCase() }>
                    <h5 className="m-0">{ categoryName }</h5>
                    <span>{ categoryPoints }</span>
                </a>
                <div id={ categoryName.toLowerCase() } className="collapse pt-3">
                    {
                        abilities.map((ability, i) =>
                            <UpgradeComponent
                                key={ i }
                                upgrade={ ability }
                                upgradeBehavior={ Model.behavior }
                                availablePoints={ availablePoints }
                                value={ abilityValues[ability.name] }
                                dispatch={ dispatch }
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default AbilityCategory;
