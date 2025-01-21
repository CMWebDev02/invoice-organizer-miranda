import { useReducer, useState } from "react";

/**
 * @component Initializes a custom hook that toggles the current state of a boolean based on the values of booleans within an array.
 * @props {boolean} initialValue - The initial value of the boolean being stored in state.
 * @returns {object & Dispatch} Returns an object that contains the value of the main boolean and a dispatcher function to append boolean values to the checked booleansArray.
 */
export function UseToggler({ initialValue }) {
  // Initializes a reducer function to control and store the main boolean.
  const [value, alterValue] = useReducer(reducerFunction, {
    isDisabled: initialValue,
  });
  // Initializes the state array that will store all booleans used to determine the value of the main boolean.
  const [booleansArray, setBooleansArray] = useState([]);

  /**
   * @function Reducer function that updates the state of the main boolean based on the passed in action.
   * @param {boolean} currentState - Contains the current value stored in state.
   * @param {object} action - Action object containing the action type to be executed.
   * @returns {void}
   */
  function reducerFunction(currentState, action) {
    switch (action.type) {
      case "SET_DISABLED": {
        return {
          isDisabled: true,
        };
      }
      case "SET_ENABLED": {
        return {
          isDisabled: false,
        };
      }
      default: {
        throw new Error("Invalid Action!");
      }
    }
  }

  /**
   * @function Checks if the passed in nameString is already contained within the array.
   * @param {string} booleanName - String of the boolean's variable name.
   * @param {Array<object>} array - Snapshot of the current booleans array.
   * @returns {boolean} Returns true if the name is already contained within the array and false if not.
   */
  function checkForExistingBooleanObject(booleanName, array) {
    for (const object of array) {
      if (object?.name === booleanName) return true;
    }

    return false;
  }

  /**
   * @function Checks if the value property of an object is true, and the object are passed in via an array.
   * @param {array} array - Array of objects that contain a value property that is checked by the function.
   * @returns {boolean} The boolean is true if at least one of the object's value property is true and returns false if all of the value properties are false.
   */
  function checkIfTrue(array) {
    for (const object of array) {
      if (object.value) return true;
    }

    return false;
  }

  /**
   * @function Checks all objects' values within the passed in array using the checkIfTrue function and updates the reducer value appropriately.
   * @param {Array<object>} array - Array of booleans that contain a value property, this is the property that is check by the checkIfTrue function.
   * @returns {void}
   */
  function checkBooleanValues(array) {
    let isResultTrue = checkIfTrue(array);
    if (isResultTrue) {
      alterValue({ type: "SET_DISABLED" });
    } else {
      alterValue({ type: "SET_ENABLED" });
    }
  }

  /**
   * @function Updates the boolean array with the passed in boolean object, either the object's value property will be used to update the existing array element or the boolean object will be appended to the array.
   * @param {object} booleanObject - Object containing a name key and a value key.
   * @returns {void}
   */
  function updateBoolean(booleanObject) {
    // Calls the function to update the current state, state is required since the values within this array will need to persist across any rerenders.
    setBooleansArray((prevBooleans) => {
      // A new variable is initialized to store the array that will be returned once its boolean values are checked.
      let newArray;
      // A check is made to see if the passed in object already has an existing entry within the array.
      // The object's name and the previous value of the booleansArray is passed through.
      //! The previous value pulled from the function needs to be passed through and checked since the state is being updated by this function so using the state variable itself would result in old data being used.
      let isBoolObjectWithinArray = checkForExistingBooleanObject(
        booleanObject.name,
        prevBooleans
      );

      if (isBoolObjectWithinArray) {
        // If the boolean object is within the array then the object instance in the array is updated.
        newArray = prevBooleans.map((object) => {
          if (object.name === booleanObject.name) {
            return { ...object, value: booleanObject.value };
          } else {
            return object;
          }
        });
      } else {
        // If the boolean object is not within the array then the object is added to the array.
        newArray = [...prevBooleans, booleanObject];
      }

      // The current values are then passed to the checkBooleanValues function to update the reducer function before being returned and stored in state.
      checkBooleanValues(newArray);
      return newArray;
    });
  }

  return { value, updateBoolean };
}
