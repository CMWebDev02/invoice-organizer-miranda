import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';

export function YearSelector({isDisabled}) {
    const currentYear = new Date().getFullYear();
    const [ queryParameters, setQueryParameters ] = useSearchParams();
    const [ selectedYear, setSelectedYear ] = useState(queryParameters.get('year') ? queryParameters.get('year') : selectedYear);

    useEffect(() => {
        if (selectedYear) {
            setQueryParameters(prevParameters => {
                prevParameters.set('year', selectedYear)
                return prevParameters
            })
        }
    }, [selectedYear, setQueryParameters, queryParameters])

    return (
        <div>
            <label></label>
            <input type='number'
                min={currentYear - 10} max={currentYear + 10}
                    onChange={(e) => setSelectedYear(e.target.value)}
                        value={selectedYear} disabled={isDisabled} />
        </div>
    )
}