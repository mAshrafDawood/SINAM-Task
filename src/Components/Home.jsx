import React from 'react';

import StandardButton from './Buttons';

/**
 * The main component for the application's homepage
 * 
 * @param {function} handleTypeView -> Function to call when the Type Faster button is clicked
 * @param {function} handleStatsView -> Function to call when the Show Statistics button is clicked
 * @returns {JSX.Element} Home component
 */
export const Home = ({ handleTypeView, handleStatsView }) => {
    return (
        <div className="flex flex-row justify-around items-center w-full h-full max-md:flex-col">
            <StandardButton
                text="Type Faster!"
                onClick={handleTypeView}
            />
            <StandardButton
                text="Show Statistics"
                onClick={handleStatsView}
            />
        </div>
    );
};

export default Home;
