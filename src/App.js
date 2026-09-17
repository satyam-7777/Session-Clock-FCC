import { useEffect, useRef, useState } from "react";

const initialBreakLength = 5;
const initialSessionLength = 25;

function App() {
  const [breakLength, setBreakLength] = useState(initialBreakLength);
  const [sessionLength, setSessionLength] = useState(initialSessionLength);
  const [timeLeft, setTimeLeft] = useState(initialSessionLength * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        }

        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }

        if (timerLabel === "Session") {
          setTimerLabel("Break");
          return breakLength * 60;
        }

        setTimerLabel("Session");
        return sessionLength * 60;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timerLabel, breakLength, sessionLength]);

  function handleBreakDecrement() {
    if (isRunning) return;
    setBreakLength((prev) => Math.max(1, prev - 1));
  }

  function handleBreakIncrement() {
    if (isRunning) return;
    setBreakLength((prev) => Math.min(60, prev + 1));
  }

  function handleSessionDecrement() {
    if (isRunning) return;
    setSessionLength((prev) => {
      const newLength = Math.max(1, prev - 1);
      setTimeLeft(newLength * 60);
      return newLength;
    });
  }

  function handleSessionIncrement() {
    if (isRunning) return;
    setSessionLength((prev) => {
      const newLength = Math.min(60, prev + 1);
      setTimeLeft(newLength * 60);
      return newLength;
    });
  }

  function handleStartStop() {
    setIsRunning((prev) => !prev);
  }

  function handleReset() {
    setIsRunning(false);
    setBreakLength(initialBreakLength);
    setSessionLength(initialSessionLength);
    setTimeLeft(initialSessionLength * 60);
    setTimerLabel("Session");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function formatTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div className="app-container">
      <NavBar />
      <main className="main-container">
        <SessionSection
          handleBreakIncrement={handleBreakIncrement}
          handleBreakDecrement={handleBreakDecrement}
          breakLength={breakLength}
          handleSessionIncrement={handleSessionIncrement}
          handleSessionDecrement={handleSessionDecrement}
          sessionLength={sessionLength}
        />
        <TimerSection
          timerLabel={timerLabel}
          handleStartStop={handleStartStop}
          handleReset={handleReset}
          formatTime={formatTime}
          isRunning={isRunning}
        />
      </main>
      <AudioSection audioRef={audioRef} />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navbar">
      <h1>25 + 5 CLOCK</h1>
      <p>Focus for a while, Take a break, Repeat</p>
    </nav>
  );
}

function BreakCard({ handleBreakIncrement, handleBreakDecrement, breakLength }) {
  return (
    <div className="duration-card">
      <h2 id="break-label">Break Duration</h2>

      <div className="duration-control">
        <button id="break-decrement" className="control-btn" onClick={handleBreakDecrement}>
          −
        </button>

        <span id="break-length">{breakLength}</span>

        <button id="break-increment" className="control-btn" onClick={handleBreakIncrement}>
          +
        </button>
      </div>
    </div>
  );
}

function SessionCard({ handleSessionIncrement, handleSessionDecrement, sessionLength }) {
  return (
    <div className="duration-card">
      <h2 id="session-label">Session Duration</h2>

      <div className="duration-control">
        <button id="session-decrement" className="control-btn" onClick={handleSessionDecrement}>
          −
        </button>

        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" className="control-btn" onClick={handleSessionIncrement}>
          +
        </button>
      </div>
    </div>
  );
}

function SessionSection({
  handleBreakIncrement,
  handleBreakDecrement,
  breakLength,
  handleSessionIncrement,
  handleSessionDecrement,
  sessionLength,
}) {
  return (
    <section className="duration-section">
      <BreakCard
        handleBreakIncrement={handleBreakIncrement}
        handleBreakDecrement={handleBreakDecrement}
        breakLength={breakLength}
      />
      <SessionCard
        handleSessionIncrement={handleSessionIncrement}
        handleSessionDecrement={handleSessionDecrement}
        sessionLength={sessionLength}
      />
    </section>
  );
}

function AudioSection({ audioRef }) {
  return <audio id="beep" ref={audioRef} src="/beep.mp3" />;
}

function TimerSection({ formatTime, timerLabel, handleStartStop, handleReset, isRunning }) {
  return (
    <section className="timer-section">
      <div className="timer-card">
        <p className="timer-status">CURRENT TIMER</p>

        <h2 id="timer-label">{timerLabel}</h2>

        <div id="time-left">{formatTime()}</div>

        <div className="timer-controls">
          <button id="start_stop" className="btn" onClick={handleStartStop}>
            {isRunning ? "Pause" : "Start"}
          </button>

          <button id="reset" className="btn reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
