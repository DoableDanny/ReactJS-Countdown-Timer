import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  // Allows us to keep a mutable variable (interval) between renders for the full lifetime of the component. Mutating it won't cause re-renders like useState would.
  let interval = useRef();

  // Returns an object so can access days, hrs, mins, or secs remaining.
  function getTimeRemaining(endTime) {
    // Date.parse converts date to millisecs since Jan 1970. Total = millis remaining from now until the deadline.
    const total = Date.parse(endTime) - Date.parse(new Date());
    // 1). Total millis remaing / 1000 = Total secs remaining.
    // 2). Divide the total seconds by 60 and grab the remainder. You don’t want all of the seconds, just those remaining after the minutes have been counted: (t/1000) % 60.
    // 3). Round this down to the nearest whole number. This is because you want complete seconds, not fractions of seconds: Math.floor( (t/1000) % 60 )
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;

    return {
      total,
      days,
      hoursString,
      minutesString,
      secondsString,
    };
  }

  // Date and time when timer reaches 0
  const deadline = 'October 03, 2020 23:00:00';

  function startTimer() {
    interval = setInterval(() => {
      setTimerDays(getTimeRemaining(deadline).days);
      setTimerHours(getTimeRemaining(deadline).hoursString);
      setTimerMinutes(getTimeRemaining(deadline).minutesString);
      setTimerSeconds(getTimeRemaining(deadline).secondsString);
    }, 1000);
  }

  // componentDidMount and componentWillUnmount (return)
  useEffect(() => {
    startTimer();
    return () => clearInterval(interval.current);
  });

  return (
    <section className='timer-container'>
      <section className='timer'>
        <div>
          <i class='material-icons'>timer</i>
          <h2>Countdown Timer</h2>
          <p>Countdown to a very special date!</p>
        </div>

        <div>
          <section>
            <p>{timerDays}</p>
            <p>
              <small>Days</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerHours}</p>
            <p>
              <small>Hours</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerMinutes}</p>
            <p>
              <small>Minutes</small>
            </p>
          </section>
          <span>:</span>
          <section>
            <p>{timerSeconds}</p>
            <p>
              <small>Seconds</small>
            </p>
          </section>
        </div>
      </section>
    </section>
  );
}

export default App;
