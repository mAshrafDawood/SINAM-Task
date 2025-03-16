import React from 'react';
import { Home } from 'lucide-react';

/**
 * Standard button component
 * 
 * @param {string} text -> Text to display on the button
 * @param {function} onClick -> Function to call when the button is clicked
 * @returns {JSX.Element} Button component
 */
export const StandardButton = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-[#2c2e31] text-white p-6 rounded-md hover:text-[#e2b714] w-1/3 h-1/3 text-2xl font-semibold max-sm:text-base"
        >
            {text}
        </button>
    );
};


/**
 * Home button component
 * 
 * @param {function} handleHomeView -> Function to call when the button is clicked
 * @returns {JSX.Element} Home button component
 */
export const HomeButton = ({ handleHomeView }) => {
    return (<Home
        onClick={handleHomeView}
        size={50}
        className="cursor-pointer bg-[#2c2e31] p-3 rounded-full text-white fixed bottom-2 left-2 hover:text-[#e2b714]"
    />)
};


/**
 * Word amount button component
 * 
 * @param {number} wordCount -> Number of words
 * @param {function} onClick -> Function to call when the button is clicked
 * @param {boolean} isActive -> Whether the current word amount is active (The button is active or not)
 * @returns {JSX.Element} Word amount button component
 */
export const WordAmountButton = ( {wordCount, onClick, isActive = false} ) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#2c2e31] text-white py-1 px-4 rounded-md hover:text-[#e2b714] text-lg font-semibold max-sm:text-base border-r-2 hover:border-[#e2b714] ${isActive ? 'border-[#e2b714] text-[#e2b714]' : ''} rounded-r-lg`}
        >
            {wordCount} words
        </button>
    );
};

export default StandardButton;