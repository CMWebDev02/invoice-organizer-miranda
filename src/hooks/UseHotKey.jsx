import { act, useEffect } from "react";

/**
 * @component Initializes a keyboard hotkey that can be triggered by holding the control key and the shift key before pressing the trigger key.
 * @prams {string} triggerKey - Keyboard key that will trigger the action prop to occur.
 * @prams {Function} action - Function that will trigger once the triggerKey, control key, and shift keys are pressed.
 * @prams {array} variablesCheck - Array of variables that will be check for a truthy value, if any of the variables are truthy, the action Function is not executed.
 * @prams {array} dependencies - Array of variables that will be used as the dependencies for the triggerKey to be initialized.
 * @returns {void}
 */
export function UseHotKey({triggerKey, action, variablesCheck, dependencies}) {
    // Creates the keyboard shortcut to handle the quick file sort.
    useEffect(() => {
        for (const variable of variablesCheck) {
            if (variable) {
                return;
            }
        }

        function activateShortCut(e) {
            if (e.key === triggerKey && e.ctrlKey& e.shiftKey) {
                action();
            }
        }

        addEventListener('keydown', activateShortCut);

        return () => {
            removeEventListener('keydown', activateShortCut);
        }
    }, [...dependencies, action, triggerKey, variablesCheck])
}