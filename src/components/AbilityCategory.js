import React, { useState } from 'react';

import UpgradeComponent from './upgrades/UpgradeComponent';


function AbilityCategory({ category, abilities, upgradeBehavior }) {
    const [totalPoints, setTotalPoints] = useState(0);

    function pointsChanged({ value }) {
        setTotalPoints(totalPoints => totalPoints + value);
    }

    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item p-0 py-1 my-1">
                <a
                    className="btn d-flex justify-content-between align-items-center bg-primary text-light py-2 px-3"
                    data-toggle="collapse"
                    href={ "#" + category.toLowerCase() }
                    role="button"
                    aria-expanded="true"
                    aria-controls={ category.toLowerCase() }>
                    <h5 className="m-0">{ category }</h5>
                    <span>{ totalPoints }</span>
                </a>
                <div id={ category.toLowerCase() } className="collapse pt-3">
                    {
                        abilities.map((ability, i) =>
                            <UpgradeComponent
                                key={ i }
                                upgrade={ ability }
                                upgradeBehavior={ upgradeBehavior }
                                parentCallback={ pointsChanged } />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default AbilityCategory;
