import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';

export function YearSelector({isDisabled}) {
    const currentYear = new Date().getFullYear();
    const [ queryParameters, setQueryParameters ] = useSearchParams();

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