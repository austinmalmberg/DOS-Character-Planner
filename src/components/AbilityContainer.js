import React from 'react';

import UpgradeComponent from './upgrades/UpgradeComponent';

function AbilityContainer({ category, abilities }) {

    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item p-0 py-1 my-1">
                <a
                    className="btn text-left d-block bg-primary text-light"
                    data-toggle="collapse"
                    href={ "#" + category.toLowerCase() }
                    role="button"
                    aria-expanded="true"
                    aria-controls={ category.toLowerCase() }>
                    <h5 className="m-1">{ category }</h5>
                </a>
                <div id={ category.toLowerCase() } className="collapse pt-3">
                    {
                        abilities.map((ability, i) =>
                            <UpgradeComponent key={ i } upgrade={ ability } />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default AbilityContainer;
