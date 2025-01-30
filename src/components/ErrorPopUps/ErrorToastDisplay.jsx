import { ErrorToast } from "./ErrorToast";

/**
 * @component Renders the error popups for the organizer pages.
 * @param {Array} errorsArray - Contains all the errors to display.
 * @returns {React.JSX.Element}
 */
export function ErrorToastDisplay({ errorsArray }) {
  /**
   * @component Maps through and renders all errors in the errorsArray as toast popups.
   * @returns
   */
  const RenderErrorToasts = () => {
    return errorsArray.map((error) => (
      <ErrorToast
        key={error.name}
        error={error}
        isErrorToastDisplayed={error?.message !== undefined}
      />
    ));
  };

  return (
    <>
      <RenderErrorToasts />
    </>
  );
}
