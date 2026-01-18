// utils/nodeHelpers.js
// Helper utilities for node operations

/**
 * Detects variables in text using {{variableName}} pattern
 * Enforces JavaScript variable naming rules
 * @param {string} text - Text to search for variables
 * @returns {string[]} - Array of unique variable names
 */
export const detectVariables = (text) => {
    if (!text) return [];

    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const detectedVariables = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const varName = match[1];
        if (!detectedVariables.includes(varName)) {
            detectedVariables.push(varName);
        }
    }

    return detectedVariables;
};

/**
 * Shallow comparison of two objects by specific keys
 * More performant than JSON.stringify
 * @param {object} obj1 
 * @param {object} obj2 
 * @param {string[]} keys - Keys to compare
 * @returns {boolean}
 */
export const shallowCompareKeys = (obj1, obj2, keys) => {
    if (!obj1 || !obj2) return obj1 === obj2;

    for (const key of keys) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
};

/**
 * Create a shallow comparison function for React.memo
 * Compares id, selected, and specific data fields
 * @param {string[]} dataKeys - Specific data keys to compare
 * @returns {function}
 */
export const createNodeComparison = (dataKeys = []) => {
    return (prevProps, nextProps) => {
        // Check basic props
        if (prevProps.id !== nextProps.id ||
            prevProps.selected !== nextProps.selected) {
            return false;
        }

        // If no specific keys, do shallow compare of entire data
        if (dataKeys.length === 0) {
            return prevProps.data === nextProps.data;
        }

        // Compare specific data keys
        return shallowCompareKeys(
            prevProps.data,
            nextProps.data,
            dataKeys
        );
    };
};
