
/**
 * Hook for managing the statistics stored in localStorage
 * 
 * @returns {Object} Object containing functions for managing statistics
 */
export const useStatStore = () => {
    /**
     * @returns {void} Clears all statistics from localStorage
     */
    const clearStats = async () => {
        return localStorage.clear();
    }

    /**
     * Adds new statistics to localStorage
     * 
     * @param {number} totalNumberOfWords -> Total number of words
     * @param {number} numberOfWordsTyped -> Number of words typed
     * @param {number} wordsPerMinute -> Words per minute
     * @returns {void}
     */
    const addStats = async (totalNumberOfWords, numberOfWordsTyped, wordsPerMinute) => {
        const currentStats = localStorage.getItem('stats') || '[]';
        const stats = JSON.parse(currentStats);
        stats.push({
            totalNumberOfWords,
            numberOfWordsTyped,
            wordsPerMinute,
            date: new Date().toISOString()
        });
        return localStorage.setItem('stats', JSON.stringify(stats));
    }

    /**
     * @returns {Array} Array of statistics objects
     */
    const getStats = async () => {
        const currentStats = localStorage.getItem('stats') || '[]';
        return JSON.parse(currentStats);
    }

    return {clearStats, addStats, getStats}
}

export default useStatStore;
