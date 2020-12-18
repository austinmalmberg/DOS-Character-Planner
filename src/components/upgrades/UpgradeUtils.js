import React from 'react';

/**
 * UpgradeCotext.Provider should pass an object that contains the following:
 *     isUpgradeAvailable - a function that takes the upgrade as an argument
 *         and returns a boolean value indicating wether an upgrade is available
 *         Usually if points available >= upgrade cost.
 *     handleAddUpgrade - a function that takes the upgrade as an argument.
 *         This function should handle state updates.
 *     handleRemoveUpgrade - a function that takes the upgrade as an argument
 *         This function should handle state updates.
*/
const UpgradeContext = React.createContext();
const PointContext = React.createContext();

const UPGRADE_ACTIONS = Object.freeze({
    ADD_UPGRADE: 'add-upgrade',
    REMOVE_UPGRADE: 'remove-upgrade',
    LEVEL_CHANGED: 'level-changed'
});

export { UpgradeContext, PointContext, UPGRADE_ACTIONS };
