export function getFirstTwoLetters(str: string) {
    // Split the string into words
    const words = str.trim().split(/\s+/);
    // Get the first letter of the first two words and return them
    return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
}
