import React, { useState } from 'react';

import Home from './Home';
import TypeFasterMain from './TypeFasterMain';
import Statistics from './Statistics';

/**
 * This components acts as a main router between components by selecting which ones to be displayed
 * 
 * @returns {JSX.Element} Content manager component
 */
export const ContentManager = () => {
    const [currentView, setCurrentView] = useState('home'); //Can only be one of the following for now [type, stats, home]

    const handleTypeView = async () => {
        setCurrentView('type');
    };

    const handleStatsView = async () => {
        setCurrentView('stats');
    };

    const handleHomeView = async() => {
        setCurrentView('home');
    }


    return (
        <div className="w-full h-full">
            {
                currentView === 'home' && <Home
                    handleTypeView={handleTypeView}
                    handleStatsView={handleStatsView}
                />
            }
            {
                currentView === 'type' && <TypeFasterMain 
                    handleHomeView={handleHomeView}
                />
            }
            {
                currentView === 'stats' && <Statistics 
                    handleHomeView={handleHomeView}
                />
            }
        </div>
    );
};

export default ContentManager;