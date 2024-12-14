import { useReducer } from "react"

export function UseToggler({ initialValue }) {
    const [ value, alterValue ] = useReducer(reducerFunction, { isActive: initialValue })    

    function reducerFunction(currentState, action) {
        switch (action.type) {
            case 'SET_ACTIVE': {
                return {
                    isActive: true
                } 
            };
            case 'SET_DISABLED': {
                return {
                    isActive: false
                } 
            }  
            default: {
                throw new Error('Invalid Action!')
            };
        }
    }

    return { value, alterValue }
}