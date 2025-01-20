/**
 * @function Converts first character of the passed in string to a capital.
 * @returns {string}
 */
function capitalizeString(string) {
  return string[0].toUpperCase() + string.substring(1, string.length);
}

/**
 * @function Converts the passed in string to a valid query string.
 * @returns {string}
 */
export function convertToValidQueryString(name) {
  let regexPattern = /\W+/g;
  return name.replace(regexPattern, "%20");
}

/**
 * @function Appends query parameters to the end of a URL.
 * @param {string} baseURL - Main URL that the queries will be appended to.
 * @param {object} baseURL - An object of the various queries that will be appended to the end of the URL, parameter name is the key and parameter value is the value.
 * @returns {string}
 */
export function appendQueriesParameters(baseURL, queries) {
  let fetchURL = `${baseURL}?`;
  for (const [key, value] of Object.entries(queries)) {
    fetchURL += `${key}=${value}&`;
  }
  return fetchURL.substring(0, fetchURL.length - 1);
}

/**
 * @function Converts the passed in string to a title by replacing all '_' with spaces and capitalizing each word.
 * @param {string}
 * @returns {string}
 */
export function convertToTitle(originalString) {
  let convertedString = originalString.toLowerCase();
  let convertedStringArray = convertedString.split("_");
  return convertedStringArray
    .map((word) => {
      return capitalizeString(word);
    })
    .join(" ");
}

/**
 * @function Converts a string written in spinal-tap to a title string where each word is capitalized.
 * @param {type} variable - description.
 * @returns
 */
export function convertFromSpinalTap(originalString) {
  let convertedString = originalString.toLowerCase();
  let convertedStringArray = convertedString.split("-");
  return convertedStringArray
    .map((word) => {
      return capitalizeString(word);
    })
    .join(" ");
}
