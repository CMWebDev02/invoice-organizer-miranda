import { useEffect } from 'react';
import Stack from 'react-bootstrap/esm/Stack';
import { useSearchParams } from 'react-router';

export function YearSelector({isDisabled, styles}) {
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const currentYear = new Date().getFullYear();
    const yearOffSet = 5;

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
            <input type='number' className={styles.userInput}
                min={currentYear - yearOffSet} max={currentYear + yearOffSet}
                    onChange={changeYear} value={queryParameters.get('year') || currentYear} disabled={isDisabled} />
        </Stack>
    )
}