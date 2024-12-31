import { useReducer, useState } from "react"

export function UseToggler({ initialValue }) {
    const [ value, alterValue ] = useReducer(reducerFunction, { isDisabled: initialValue })    
    const [ booleansArray, setBooleansArray ] = useState([])

    /* 
        Construct an array,
        Have this array be appended with the various booleans that I want to have checked
        Create a function that will loop through this array and check if any of the booleans are true
        If any boolean is true, the reducer function's SET_DISABLED should be called, if even one boolean is flagged as true the loop can be exited.
        else, the reducer function's SET_ENABLED should be called.
    */

    function reducerFunction(currentState, action) {
        switch (action.type) {
            case 'SET_DISABLED': {
                return {
                    isDisabled: true
                } 
            };
            case 'SET_ENABLED': {
                return {
                    isDisabled: false
                } 
            }  
            default: {
                throw new Error('Invalid Action!')
            };
        }
    }

    return { value, alterValue }
}