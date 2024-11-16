import { useEffect, useState } from 'react'


export function YearSelector({yearControls, isDisabled}) {
    const [ selectedYear, setSelectedYear ] = yearControls;
    const [ currentYear, setCurrentYear ] = useState(0);
    

    useEffect(() => {
        const calculatedDate = new Date()
        const calculatedYear = calculatedDate.getFullYear()

        setCurrentYear(calculatedYear);
        setSelectedYear(calculatedYear)
    }, [setSelectedYear])

    return (
        <div>
            <label></label>
            <input type='number'
                min={currentYear - 10} max={currentYear + 10}
                    onChange={(e) => {setSelectedYear(e.target.value)}}
                        value={selectedYear} disabled={isDisabled} />
        </div>
    )
}