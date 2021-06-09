import React from 'react'

const WrongLetters = ({ wrongLetters }) => {

  // if it is greater than zero and add a paragraph saying wrong letters
  // we mapping the letter and the index we adding the span in every single time
  // each letter will be inside this span, where we might need also a comma
  // in our reduce we have the previous and current values
  // so if previous values are equal null then we have our current else we have our previous
  // adding a coma in between and then we have our current value
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && 
          <p>Wrong</p>
        }
        {wrongLetters
          .map((letter, i) => <span key={i}>{letter}</span>)
          .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
      </div>
    </div>
  )
}

export default WrongLetters