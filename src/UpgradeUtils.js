export const upgradeBehavior = {
    upgradeState: (state) => ({ ...state, value: state.value + 1 }),
    downgradeState: (state) => ({ ...state, value: state.value - 1 }),
};

export const UPGRADE_ACTIONS = Object.freeze({
    ADD_UPGRADE: 'add-upgrade',
    REMOVE_UPGRADE: 'remove-upgrade',
    LEVEL_CHANGED: 'rollback-upgrades'
});

export const upgradeState = {
    log: [],
    pointsUsed: 0
};

export function upgradeReducer(state, { type, payload }) {
    switch(type) {
        case UPGRADE_ACTIONS.ADD_UPGRADE:
            return addUpgrade(state, payload);
        case UPGRADE_ACTIONS.REMOVE_UPGRADE:
            return removeUpgrade(state, payload);
        case UPGRADE_ACTIONS.LEVEL_CHANGED:
            if (payload.diff >= 0)
                return state;

            return rollbackUpgrades(state, payload);
        default:
            throw new Error('Invalid type sent to attributeReducer');
    }
}


function addUpgrade(state, { name, cost }) {
    return {
        ...state,
        [name]: state[name] + 1,
        log: [
            { name, cost },
            ...state.log
        ],
        pointsUsed: state.pointsUsed + cost
    };
}


function removeUpgrade(state, { name }) {
    const { log } = state;

    const firstIndex = log.findIndex(entry => entry.name === name);
    const entry = log[firstIndex];

    return {
        ...state,
        [name]: state[name] - 1,
        log: [
            ...log.slice(0, firstIndex),
            ...log.slice(firstIndex + 1)
        ],
        pointsUsed: state.pointsUsed - entry.cost
    }
}

function rollbackUpgrades(state, { diff }) {
    const { log } = state;

    const modifiedUpgrades = {};
    let index = 0;
    let totalCost = 0;
    while (index < log.length && totalCost + diff < 0) {
        const { name, cost } = log[index++];

        if (!modifiedUpgrades[name])
            modifiedUpgrades[name] = state[name];

        modifiedUpgrades[name] -= 1;
        totalCost += cost;
    }

    return {
        ...state,
        ...modifiedUpgrades,
        log: log.slice(index),
        pointsUsed: state.pointsUsed - totalCost,
    }
}
