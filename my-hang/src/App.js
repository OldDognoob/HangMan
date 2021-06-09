import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  // our side effects
  useEffect(() => {
    const handleKeydown = event => {
      // destructure them equal to an event
      const { key, keyCode } = event;
      // if it a letter key in our play board then we going to get the letter
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        // if the selected word includes the letter
        if (selectedWord.includes(letter)) {
          //if the current correctLetters does not include the letter
          if (!correctLetters.includes(letter)) {
            // the current letters will create a new array were we add our new letter
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          //if it does not include wrong letter we need to modify it
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    // every time this will re render it would add an event listener
    window.addEventListener('keydown', handleKeydown);
    // because we will have a lot of event listeners we need to make a clean up 
    // the function inside return is going to clean up the event listener
    // and so every time we only have one event listener running
    return () => window.removeEventListener('keydown', handleKeydown);
    // we adding dependencies here 
    //so any time this will update this function will be called
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;