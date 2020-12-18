
const LOG_ACTIONS = {
    ADD_UPGRADE: 'add-upgrade',
    REMOVE_ENTRIES: 'remove-entries',
    REMOVE_FIRST: 'remove-first-entry'
};

function logReducer(log, { type, payload }) {
    switch (type) {
        case LOG_ACTIONS.ADD_UPGRADE:
            return [payload, ...log];
        case LOG_ACTIONS.REMOVE_ENTRIES:
            return log.slice(payload);
        case LOG_ACTIONS.REMOVE_FIRST:
            const firstIndex = log.findIndex(entry => entry.name === payload.name);
            return [...log.slice(0, firstIndex), ...log.slice(firstIndex + 1)];
        default:
            throw new Error('Invalid action type');
    }
}

export { LOG_ACTIONS, logReducer };
