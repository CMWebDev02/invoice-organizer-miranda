import { useEffect } from "react";

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
    }, [...dependencies])
}