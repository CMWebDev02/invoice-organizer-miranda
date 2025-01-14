import { useEffect, useRef } from 'react';
import Stack from 'react-bootstrap/esm/Stack';
import { useSearchParams } from 'react-router';
import { UseHotKey } from '../../hooks/UseHotKey';

export function YearSelector({isDisabled, styles}) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const yearInputRef = useRef();
    const currentYear = new Date().getFullYear();
    const yearOffSet = 5;

    const yHotKey = UseHotKey({triggerKey: 'Y', action: focusYearInput, variablesCheck: [], dependencies: []});

    function focusYearInput() {
        yearInputRef.current.select()
    }

    function checkFocus(e) {
        if (e.key === "Escape") {
            yearInputRef.current.blur();
        }
    }

    useEffect(() => {
        if (queryParameters.get('year') == null) {
            setQueryParameters(prevParameters => {
                prevParameters.set('year', new Date().getFullYear())
                return prevParameters;
            })
        }
    }, [queryParameters, setQueryParameters])

    function changeYear(e) {
        setQueryParameters(prevParameters => {
            prevParameters.set('year', e.target.value);
            return prevParameters;
        })
    }

    return (
        <Stack direction='horizontal' gap={1} className={`${styles.userInputContainer} ${styles.yearSelectorContainer} ms-auto`}>
            <label>Year:</label>
            <input type='number' className={styles.userInput} ref={yearInputRef}
                min={currentYear - yearOffSet} max={currentYear + yearOffSet} onKeyDown={checkFocus}
                    onChange={changeYear} value={queryParameters.get('year') || currentYear} disabled={isDisabled} />
        </Stack>
    )
}