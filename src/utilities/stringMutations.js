function capitalizeString(string) {
    return string[0].toUpperCase() + string.substring(1, string.length)
}

export function convertToValidQueryString(name) {
    let regexPattern = /\W+/g;
    return name.replace(regexPattern, '%20')
}

export function appendQueriesParameters(baseURL, queries) {
    let fetchURL = `${baseURL}?`;
    for (const [key, value] of Object.entries(queries)) {
        fetchURL += `${key}=${value}&`;
    };
    return fetchURL.substring(0, fetchURL.length - 1);
}

export function convertToSentence(originalString) {
    let convertedString = originalString.toLowerCase();
    let convertedStringArray = convertedString.split('_');
    return convertedStringArray.map(word => {
        return capitalizeString(word)
    }).join(' ')
}