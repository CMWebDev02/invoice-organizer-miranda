import { useEffect, useRef } from 'react';
import Stack from 'react-bootstrap/esm/Stack';
import { useSearchParams } from 'react-router';
import { UseHotKey } from '../../../hooks/UseHotKey';
import styles from '../styles/DirectoryDisplayStyles.module.css'

export function YearSelector({isDisabled, yearOffSet}) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const yearInputRef = useRef();
    const currentYear = new Date().getFullYear();

    UseHotKey({triggerKey: 'Y', action: focusYearInput, variablesCheck: [], dependencies: []});

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
            <label htmlFor='year-input'>Year:</label>
            <input id='year-input' type='number' className={styles.userInput} ref={yearInputRef}
                min={currentYear - yearOffSet} max={currentYear + yearOffSet} onKeyDown={checkFocus}
                    onChange={changeYear} value={queryParameters.get('year') || currentYear} disabled={isDisabled} />
        </Stack>
    )
}