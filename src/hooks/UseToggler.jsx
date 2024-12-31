import { useReducer } from "react"

export function UseToggler({ initialValue }) {
    const [ value, alterValue ] = useReducer(reducerFunction, { isDisabled: initialValue })    

    function reducerFunction(currentState, action) {
        switch (action.type) {
            case 'SET_ACTIVE': {
                return {
                    isDisabled: true
                } 
            };
            case 'SET_DISABLED': {
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