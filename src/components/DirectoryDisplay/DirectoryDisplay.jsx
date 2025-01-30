import React, { useEffect, useState } from "react";
import { UseFetchGetRequest } from "../../hooks/UseFetchGetRequest";
import { DirectoryList } from "./DirectoryList";
import { useSearchParams } from "react-router";
import Stack from "react-bootstrap/esm/Stack";
import styles from "./styles/DirectoryDisplayStyles.module.css";

/**
 * @component Houses all the components and logic for displaying the directory option and for handling the get request to the backend.
 * @param {string} endPoint - Base endpoint url of the server.
 * @param {Function} directoryFilter - Value used to filter directories.
 * @param {Dispatch} updateIsLoadingBoolean - Reducer dispatch function to update if any fetching event is occurring.
 * @param {Function} sortFile - Triggers the file sort get request.
 * @param {string} fetchKey - String associated with React Query get request.
 * @param {boolean} showQuickTransferButtons - Denotes if the quick transfer button should be displayed or not.
 * @returns {React.JSX.Element}
 */
export function DirectoryDisplay({
  endPoint,
  directoryFilter,
  updateIsLoadingBoolean,
  sortFile,
  fetchKey,
  showQuickTransferButtons,
}) {
  const { isLoading, errorOccurred, fetchData } = UseFetchGetRequest({
    fetchURL: `${endPoint}/get-directories`,
    key: fetchKey,
  });
  const [allDirectories, setAllDirectories] = useState([]);
  const [queryParameters, setQueryParameters] = useSearchParams();

  // Initializes the query parameter for the selectedDirectory.
  useEffect(() => {
    if (queryParameters.get("selectedDirectory") == null) {
      setQueryParameters((prevParameters) => {
        prevParameters.set("selectedDirectory", "");
        return prevParameters;
      });
    }
  }, [queryParameters, setQueryParameters]);

  // Updates the directories state with the data received from the get request.
  useEffect(() => {
    if (fetchData) {
      setAllDirectories(fetchData.directoriesArray);
    }
  }, [fetchData]);

  // Updates the isLoadingBoolean reducer function with the current value of the isLoading boolean.
  useEffect(() => {
    updateIsLoadingBoolean({ name: "directoriesLoading", value: isLoading });
  }, [isLoading]);

  /**
   * @function Sets the current directory to the value received from the event elements id property.
   * @param {Event} e - Event that triggered the function.
   * @returns {void}
   */
  function setSelectedDirectory(e) {
    let targetID;

    // Checks if the event has a target property.
    if (e?.target === undefined) {
      targetID = e;
    } else {
      // Stop any related element from triggering this function as well.
      e.stopPropagation();

      // Checks what element of the directory option triggered the function.
      //? The id tag is associated with the div element of the component so the parent element is called on an element until the div element is reached.
      if (e.target.tagName === "SPAN") {
        targetID = e.target.parentElement.parentElement.id;
      } else if (e.target.tagName === "P") {
        targetID = e.target.parentElement.id;
      } else {
        targetID = e.target.id;
      }
    }

    // Sets the selected directory as the targetID
    setQueryParameters((prevParameters) => {
      prevParameters.set("selectedDirectory", targetID);
      return prevParameters;
    });
  }

  /**
   * @component Renders the directory list or any errors that might have occurred.
   * @param {type} variable - description .
   * @returns
   */
  const RenderDirectoryList = () => {
    return errorOccurred ? (
      <h2>{errorOccurred}</h2>
    ) : (
      <DirectoryList
        showQuickTransferButtons={showQuickTransferButtons}
        selectDirectory={setSelectedDirectory}
        selectedDirectory={queryParameters.get("selectedDirectory")}
        directoryFilter={directoryFilter}
        directories={allDirectories}
        sortFile={sortFile}
      />
    );
  };

  return (
    <Stack
      className={`${styles.directoryDisplay} p-1 h-75 overflow-auto w-100 d-flex flex-row flex-wrap align-items-start align-content-start`}
    >
      {isLoading && <h2>Gathering Customer Folders</h2>}
      <RenderDirectoryList />
    </Stack>
  );
}
