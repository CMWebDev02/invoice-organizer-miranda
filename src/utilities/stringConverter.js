export function convertToValidQueryString(name) {
    let regexPattern = /\W+/g;
    return name.replace(regexPattern, '%20')
}