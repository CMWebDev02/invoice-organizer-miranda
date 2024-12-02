import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';

export function YearSelector({isDisabled}) {
    const currentYear = new Date().getFullYear();
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    useEffect(() => {
        // Checks if the year query is already imbedded in the URL, and if so sets the current value of the selector to it.
        if (queryParameters.get('year')) {
            setQueryParameters(prevParameters => {
                prevParameters.set('year', queryParameters.get('year'))
                return prevParameters
            })
        } else { // Otherwise, the current year is calculated and the query string is injected into the url.
            setQueryParameters(prevParameters => {
                prevParameters.set('year', new Date().getFullYear())
                return prevParameters
            })
        }
    }, [setQueryParameters, queryParameters])

    function changeYear(e) {
        setQueryParameters(prevParameters => {
            prevParameters.set('year', e.target.value)
            return prevParameters
        })
    }

    return (
        <div>
            <label></label>
            <input type='number'
                min={currentYear - 10} max={currentYear + 10}
                    onChange={changeYear} value={queryParameters.get('year')} disabled={isDisabled} />
        </div>
    )
}