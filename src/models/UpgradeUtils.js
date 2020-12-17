
function addUpgrade() {
    console.log('upgrade utils')
}

class UpgradeModel {
    constructor({ name, defaults, pointsByLevel, handleUpgrade, handleDowngrade }) {
        this.name = name;
        this.defaults = defaults || [];
        this.pointsByLevel = pointsByLevel || [];
        this.handleUpgrade = (upgrade) => ({ ...upgrade, value: upgrade.value + 1 });
        this.handleDowngrade = (upgrade) => ({...upgrade, value: upgrade.value - 1 });
    }
}

const STATE_ACTIONS = Object.freeze({
    ADD_UPGRADE: 'add-upgrade',
    REMOVE_UPGRADE: 'remove-upgrade',
    POINTS_CHANGED: 'points-changed'
});

class UpgradeModelInitializer {
    constructor(model) {
        this.model = model;
        this.initialState = {
            /*
            * An array of upgrade objects:
            * {
            *    name: <string>,
            *    value: <Number>,
            *    min: <Number>,
            *    cost: <Number>
            * }
            */
            upgrades: model.defaults,

            // An array for tracking upgrades
            log: [],

            // An object for tracking points used
            points: {
                total: 0,
                used: 0
            }
        };
    }

    stateReducer(state, { type, payload }) {
        let modifierFunction;
        switch (type) {
            case STATE_ACTIONS.ADD_UPGRADE:
                modifierFunction = this.addUpgrade;
                break;
            case STATE_ACTIONS.REMOVE_UPGRADE:
                modifierFunction = this.removeUpgrade;
                break;
            case STATE_ACTIONS.POINTS_CHANGED:
                // no need to modify the state if points do not change
                if (state.points.used === payload.points.total)
                    return state;
                else if (state.points.used < payload.points.total)
                    return {
                        ...state,
                        points: {
                            ...state.points,
                            total: payload.points.total
                        }
                    }

                modifierFunction = this.handleOverflow;
                break;
            default:
                throw new Error('Upgrade state reducer error');
        }

        return modifierFunction(state, payload);
    }

    addUpgrade(state, { name, cost }) {
        return {
            ...state,
            upgrades: state.upgrades.map(upgrade => {
                if (upgrade.name === name)
                    return this.model.handleUpgrade(upgrade);
                return upgrade;
            }),
            points: { ...state.points, used: state.points.used + cost },
            log: [ { name, cost }, ...state.log ]
        };
    }

    removeUpgrade(state, { name }) {
        const matchingEntryIndex = state.log.findIndex(entry => entry.name === name);

        return {
            ...state,
            upgrades: state.upgrades.map(upgrade => {
                if (upgrade.name === name)
                    return this.model.handleDowngrade(upgrade);
                return upgrade;
            }),
            points: { ...state.points, used: state.points.used - state.log[matchingEntryIndex].cost },
            log: [...state.log.slice(0, matchingEntryIndex), ...state.log.slice(matchingEntryIndex + 1)]
        };
    }

    handleOverflow(state, { points }) {
        let count = 0;
        let removedCost = 0;
        while (count < state.log.length && state.points.used - removedCost > points.total) {
            removedCost += state.log[count++].cost;
        }

        const removedEntries = state.log.slice(0, count);

        return {
            ...state,
            upgrades: state.upgrades.map(upgrade => {
                const removeCount = removedEntries.filter(entry => entry.name === upgrade.name).length;
                return { ...upgrade, value: upgrade.value - removeCount };
            }),
            points: { ...state.points, used: state.points.used - removedCost },
            log: state.log.slice(count)
        };
    }
}

export { UpgradeModel, STATE_ACTIONS, UpgradeModelInitializer };