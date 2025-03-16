import React, { useState, useEffect } from 'react';
import { HomeButton } from './Buttons';
import useStatStore from '../Hooks/StatStore';

/**
 * Statistics component
 * 
 * @param {function} handleHomeView -> Function to call when the Home button is clicked
 * @returns {JSX.Element} Statistics component
 */
export const Statistics = ({ handleHomeView }) => {
    const { getStats, clearStats } = useStatStore();
    const [stats, setStats] = useState([]);

    useEffect(() => {
        // Fetch stored stats on component mount
        getStats().then((retrievedStats) => setStats(retrievedStats));
    }, []);

    const handleClearStats = async () => {
        // Clear stats and update state asynchronously
        clearStats().then(() => setStats([]));
    };

    return (
        <div className="relative w-full h-full">
            <HomeButton handleHomeView={handleHomeView} />

            <div className="text-white relative top-8 text-lg">
                <h2 className="text-2xl font-semibold mb-4">Your Typing Stats</h2>
                {/** Show the table only if there are stats present, else show no stats message defined below */}
                {stats.length > 0 ? (
                    <table className="w-full bg-[#2c2e31] m-auto border-collapse border border-gray-500">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 p-2">Date</th>
                                <th className="border border-gray-500 p-2">Total Words</th>
                                <th className="border border-gray-500 p-2">Words Typed</th>
                                <th className="border border-gray-500 p-2">WPM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((stat, idx) => (
                                <tr key={idx}>
                                    <td className="border border-gray-500 p-2">{new Date(stat.date).toLocaleString()}</td>
                                    <td className="border border-gray-500 p-2">{stat.totalNumberOfWords}</td>
                                    <td className="border border-gray-500 p-2">{stat.numberOfWordsTyped}</td>
                                    <td className="border border-gray-500 p-2">{stat.wordsPerMinute}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-[#e2b714] mt-4">No stats to display yet!</p>
                )}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={handleClearStats}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                    Clear Stats
                </button>
            </div>
        </div>
    );
};

export default Statistics;