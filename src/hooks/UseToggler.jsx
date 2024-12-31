import { useEffect, useReducer, useState } from "react"

export function UseToggler({ initialValue }) {
    const [ value, alterValue ] = useReducer(reducerFunction, { isDisabled: initialValue })    
    const [ booleansArray, setBooleansArray ] = useState([])

    function reducerFunction(currentState, action) {
        switch (action.type) {
            case 'SET_DISABLED': {
                return {
                    isDisabled: true
                } 
            };
            case 'SET_ENABLED': {
                console.log('value false')
                return {
                    isDisabled: false
                } 
            }  
            default: {
                throw new Error('Invalid Action!')
            };
        }
    }

    /* Have this function check if the current passed in object is already contained within the array, if not add the object to the array,
    if it is, update the current value within the array to the new value from the passed in object. */
    function checkForExistingBooleanObject(booleanName, array) {
        for (const object of array) {
            if (object?.name == booleanName) return true;
        }

        return false
    }

    /**
     * @function Checks if the value property of an object is true, and the object are passed in via an array.  
     * @param {type} variable - Array of objects that contain a value property that is checked by the function.
     * @returns boolean. The boolean is true if at least one of the object's value property is true and returns false if all of the value properties of the passed in objects are false.
     */
    function checkIfTrue(array) {
        for (const object of array) {
            if (object.value) return true;
        }

        return false;
    }

    /**
     * @function Checks all objects' values within the passed in array using the checkIfTrue function and updates the reducer value appropriately.
     * @param {Array} array - Array of objects that contain a value property, this is the property that is check by the checkIfTrue function.
     */
    function checkBooleanValues(array) {
        let isResultTrue = checkIfTrue(array);
        if (isResultTrue) {
            alterValue({type: 'SET_DISABLED'})
        } else {
            alterValue({type: 'SET_ENABLED'});
        }
    }

    /* 
        Construct an array,
        Have this array be appended with the various booleans that I want to have checked
        Create a function that will loop through this array and check if any of the booleans are true
        If any boolean is true, the reducer function's SET_DISABLED should be called, if even one boolean is flagged as true the loop can be exited.
        else, the reducer function's SET_ENABLED should be called.
    */

    function updateBoolean(booleanObject) {
        // Calls the function to update the current state, state is required since the values within this array will need to persist across any rerenders.
        setBooleansArray(prevBooleans => {
            // A new variable is initialized to store the array that will be returned once its boolean values are checked.
            let newArray;
            // A check is made to see if the passed in object already has an existing entry within the array.
                // The object's name and the previous value of the booleansArray is passed through.
                    //! The previous value pulled from the function needs to be passed through and checked since the state is being updated by this function so accessing the state variable itself would contained old data.
            let isBoolObjectWithinArray = checkForExistingBooleanObject(booleanObject.name, prevBooleans);

            if (isBoolObjectWithinArray) {
                // If the boolean object is within the array then the object instance in the array is updated.
                newArray = prevBooleans.map(object => {
                    if (object.name == booleanObject.name) {
                        return {...object, value: booleanObject.value};
                    } else {
                        return object;
                    };
                });
            } else {
                // If the boolean object is not within the array then the object is added to the array.
                newArray = [...prevBooleans, booleanObject]
            }

            // The current values are then passed to the checkBooleanValues function to update the reducer function before being returned and stored in state.
            checkBooleanValues(newArray);
            return newArray
        })
    }

    return { value, updateBoolean }
}