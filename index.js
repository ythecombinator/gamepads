"use strict";
const { useState, useEffect, useLayoutEffect } = require("react");

// ~
// Utils
// ~

const getGamepadsData = () => navigator.getGamepads();

const objectToArray = list => Object.keys(list).map(i => list[i]);

// ~
// Hook
// ~

function useGamepads(shouldPoll = false) {
  const [readGamepads, setGamepads] = useState([]);
  let raf;

  useLayoutEffect(() => {
    const onChange = () => {
      const data = getGamepadsData();
      setGamepads(data);

      if (shouldPoll) {
        raf = requestAnimationFrame(onChange);
      }
    };

    window.addEventListener("gamepadconnected", onChange);
    window.addEventListener("gamepaddisconnected", onChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("gamepadconnected", onChange);
      window.removeEventListener("gamepaddisconnected", onChange);
    };
  }, []);

  const mapped = objectToArray(readGamepads);

  return mapped;
}

module.exports = useGamepads;
