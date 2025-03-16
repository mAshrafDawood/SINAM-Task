

/* 
 * Hook for managing the words.json file by retrieving a given number of random words from it
 *
 * @returns {Object} Object containing functions for managing words
 */
export const useWords = () => {

    /**
     * @param {number} wordCount -> Number of words to retrieve
     * @returns {Array} Array of random words of length wordCount
     */
    const getRandomWords = async (wordCount) => {
        const words = require('../words.json');
        let res = [];
        for (let i = 0; i < wordCount; i++) {
            res.push(words[Math.floor(Math.random() * words.length)]);
        }
        return res;
    };

    return { getRandomWords };
};

export default useWords;
