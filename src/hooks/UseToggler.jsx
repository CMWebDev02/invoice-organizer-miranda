import { useState } from "react"

export function UseToggler({initialValue}) {
    const [ isActive, setIsActive ] = useState(initialValue)    

    function toggleIsActive() {
        setIsActive(prevValue => !prevValue);
    }

    return { isActive, toggleIsActive }
}