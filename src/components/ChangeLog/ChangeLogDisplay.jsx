import { ChangeInfo } from "./ChangeInfo.jsx";
import { UseUndoFetch } from "../../hooks/UseUndoFetch.jsx";

/**
 * @component Renders the various changelog entries and handles the undo action post request.
 * @param {string} endPoint - Base endpoint url of the server.
 * @param {Array} changeLog - Array containing the various changelog entries.
 * @param {Function} alterChangeLog - Setter function for altering the changelog array stored in state.
 * @param {boolean} showUndoButtons - Denotes if the undo button elements should be rendered for each changelog entry.
 * @returns {React.JSX.Element}
 */
export function ChangeLogDisplay({
  endPoint,
  changeLog,
  alterChangeLog,
  showUndoButtons,
}) {
  // Initializes a post request to that can be made to the backend to undo the actions of a changelog entry.
  const {
    isLoading: isUndoingAction,
    errorOccurred: undoActionError,
    triggerFetchPostRequest: triggerChangeLogPostRequest,
  } = UseUndoFetch({ fetchURLBase: `${endPoint}/undo-action`, alterChangeLog });

  /**
   * @function Triggers the undo post request and passes the necessary information to make the undo action request.
   * @param {Object} undoObj - Object containing the necessary information to undo the specified changelog entry.
   * @param {string} id - Unique id string to denote which changelog entry is being undone.
   * @param {string} action - Denotes the type of action being undone.
   * @returns {void}
   */
  function undoChange(undoObj, id, action) {
    let userResult = confirm("Are You Sure You Want to Undo This Change?");
    if (!userResult) return;

    triggerChangeLogPostRequest({
      action: action,
      actionId: id,
      undoInfo: JSON.stringify(undoObj),
    });
  }

  /**
   * @component Renders the changelog entries in a list. In the case the changelog array is empty, a message saying so is displayed instead.
   * @returns {React.JSX.Element}
   */
  const RenderChangeLog = () => {
    return changeLog.length === 0 ? (
      <h2>No Changes To Display</h2>
    ) : (
      changeLog.map((change) => (
        <ChangeInfo
          key={`changeLog-item-${change.id}`}
          info={change}
          undoChange={undoChange}
          isButtonDisabled={isUndoingAction}
          showUndoButtons={showUndoButtons}
        />
      ))
    );
  };

  return (
    <>
      {undoActionError && <h3>{undoActionError}</h3>}
      <RenderChangeLog />
    </>
  );
}
