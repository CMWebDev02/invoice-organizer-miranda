import Stack from "react-bootstrap/esm/Stack";

import styles from './styles/LoginInputStyles.module.css';

/**
 * @component Renders an input for a user to enter their password or username,
 * depending on the value of the type property.
 * @param {string} type - Denotes the type of input element.
 * @param {RefObject} inputRef - Provides a reference to store access to the input element.
 * @param {string} labelName - Label indicator for the input and used to provide an id value to the input.
 * @param {boolean} isDisabled - Denotes if the input should be disabled.
 * @returns
 */
export function LoginInput({ type, inputRef, labelName, isDisabled }) {
  const placeHolderText = `Enter ${labelName.toLowerCase()}...`;
  return (
    <Stack direction="horizontal" className="">
      <label htmlFor={`input-${labelName}`} className="w-25">{labelName}:</label>
      <input
        type={type}
        ref={inputRef}
        placeholder={placeHolderText}
        id={`input-${labelName}`}
        disabled={isDisabled}
        className={`${styles.userInput} w-75`}
      />
    </Stack>
  );
}
