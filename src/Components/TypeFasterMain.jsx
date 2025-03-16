import React, { useState, useRef, useEffect } from 'react';
import { HomeButton, WordAmountButton } from './Buttons';
import { useWords } from '../Hooks/Words'
import { useStatStore } from '../Hooks/StatStore'


const possibleWordCounts = [5, 10, 20, 30]; //Possible word counts for the game

/**
 * The main component for the Type Faster game
 * 
 * @param {function}
 * @returns {JSX.Element} Type Faster main component
 */
export const TypeFasterMain = ({ handleHomeView }) => {

    const [totalWordCount, setTotalWordCount] = useState(possibleWordCounts[0]);
    const [wordList, setWordList] = useState([]);
    const [isGameActive, setIsGameActive] = useState(false);
    const [gameStartTimeStamp, setGameStartTimeStamp] = useState(0);
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const [reset, setRest] = useState(false);

    /**
     * Current word index and character index
     * Using both states and refs to prevent racing conditions and ensure smooth updates for both UI and background values
     */
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

    const currentWordIndexRef = useRef(0);
    const currentCharacterIndexRef = useRef(0);

    const {
        getRandomWords
    } = useWords();

    const {
        addStats
    } = useStatStore();

    useEffect(() => {
        // New word set on resets
        getRandomWords(totalWordCount).then((words) => setWordList(words));
    }, [reset]);


    /**
     * Reset the game state
     * 
     * @returns {void}
     */
    const startOverFacade = async () => {
        currentWordIndexRef.current = 0;
        currentCharacterIndexRef.current = 0;
        setCurrentWordIndex(0);
        setCurrentCharacterIndex(0);
        setRest(!reset);
    }

    /**
     * Toggle game state and calculate stats
     * 
     * @returns {void}
     */
    const toggleIsGameActive = async () => {
        if (isGameActive && gameStartTimeStamp !== 0) {
            const gameDurationInMinutes = ((Date.now() - gameStartTimeStamp) / 1000 / 60);
            const temp = currentWordIndexRef.current / gameDurationInMinutes; // Calculate the value here to prevent racing conditions
            setWordsPerMinute(temp);
            addStats(totalWordCount, currentWordIndexRef.current, temp);
            startOverFacade();
        }
        if (!isGameActive) setGameStartTimeStamp(Date.now());
        setIsGameActive(!isGameActive);
    };


    /**
     * Handle keydown events for typing and game start
     * 
     * @returns {void}
     */
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && !isGameActive) {
            toggleIsGameActive();
            return;
        }

        if (!isGameActive) return;

        /**
         * Handle character typing
         */
        if (event.key === wordList[currentWordIndexRef.current][currentCharacterIndexRef.current]) {
            setCurrentCharacterIndex(++currentCharacterIndexRef.current);
            if (currentCharacterIndexRef.current >= wordList[currentWordIndexRef.current].length) {
                setCurrentWordIndex(++currentWordIndexRef.current);
                currentCharacterIndexRef.current = 0;
                setCurrentCharacterIndex(0);
                if (currentWordIndexRef.current >= wordList.length) {
                    toggleIsGameActive();
                }
            }
        }
    };

    return (
        <div
            className='relative w-full h-full'
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <HomeButton handleHomeView={handleHomeView} />

            <div className='w-fit bg-[#2c2e31] m-auto relative top-4'>
                {possibleWordCounts.map((wordCountIterator, idx) => (
                    <WordAmountButton
                        key={idx}
                        wordCount={wordCountIterator}
                        onClick={async () => {
                            setTotalWordCount(wordCountIterator);
                            getRandomWords(wordCountIterator).then((words) => setWordList(words))
                        }}
                        isActive={wordCountIterator === totalWordCount}
                    />
                ))}

            </div>

            <div className='text-white relative top-8 text-lg'>
                Your current words per minute: {wordsPerMinute}
            </div>

            <div className={`${!isGameActive ? 'text-[#e2b714]' : 'text-emerald-400'} relative top-10 text-lg`}>
                {!isGameActive ? 'Press enter to start!' : 'Type Faster!'}
            </div>

            <div className="text-white text-2xl font-semibold max-sm:text-base flex flex-wrap justify-around w-3/4 m-auto relative top-1/2 -translate-y-1/2">
                {/** Word display divided according to display already written charachters and charachters yet to be writted */}
                {wordList.map((word, wordIndex) => (
                    <span key={wordIndex} className="flex">
                        {word.split("").map((char, charIndex) => {
                            const isTyped =
                                wordIndex < currentWordIndex ||
                                (wordIndex === currentWordIndex && charIndex < currentCharacterIndex);
                            const isCurrent =
                                wordIndex === currentWordIndex && charIndex === currentCharacterIndex;

                            return (
                                <span
                                    key={charIndex}
                                    className={`${isTyped
                                        ? "text-emerald-400" // Green for typed characters
                                        : isCurrent
                                            ? "text-[#e2b714]" // Yellow for the current character
                                            : "text-white" // White for untyped characters
                                        }`}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TypeFasterMain;