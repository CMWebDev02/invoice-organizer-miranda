import Stack from "react-bootstrap/esm/Stack";
import styles from "../styles/ChangeLogStyles.module.css";

/**
 * @component Renders the filter options for the changelog page.
 * @param {Function} alterDisplayedChanges - Setter function for altering the current changelog based on the filter value.
 * @param {string} currentFilter - Current value for the changelog filter.
 * @param {string} className - Style object property that handles styling the component.
 * @returns {React.JSX.Element}
 */
export function FilterOptions({
  alterDisplayedChanges,
  currentFilter,
  className,
}) {
  const filterOptionsArray = [
    "File Transfer",
    "Folder Creation",
    "Undo Action",
  ];

  /**
   * @component Renders the various filter options buttons.
   * @returns {React.JSX.Element}
   */
  const RenderFilterOptions = () => {
    return filterOptionsArray.map((option) => (
      <button
        key={option}
        onClick={alterDisplayedChanges}
        name={option}
        className={`${
          currentFilter == option && styles.selectedFilter
        } interfaceButton`}
      >
        {option}
      </button>
    ));
  };

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className={`${className} d-flex justify-content-center`}
    >
      <RenderFilterOptions />
    </Stack>
  );
}
