'use strict';

import createStopwatch from './stopwatch.js';
import lapList from './lapList.js';

const callbacksById = {};
const setCallbacksById = (id, callbacks) => {
  callbacksById[id] = callbacks;
};

const { addListItem, clearLapList } = lapList();

// to test with multiply stopwatches you can call this function again
createStopwatch({
  addListItem,
  clearLapList,
  setCallbacksById,
});

// below is all for keyboard control
const allStopwatches = document.querySelectorAll('.stopwatch');

let currentStopwatchId = allStopwatches[0].id;

function handleMouseOver (e) {
  const fromElement = e.relatedTarget;
  if (fromElement && e.currentTarget.contains(fromElement)) {
    return;
  }
  currentStopwatchId = e.target.id;
}

function handleMouseOut (e) {
  const toElement = e.relatedTarget;
  if (toElement && e.currentTarget.contains(toElement)) {
    return;
  }
  currentStopwatchId = e.target.id;
}

allStopwatches.forEach(el => {
  el.addEventListener('mouseover', handleMouseOver);
  el.addEventListener('mouseout', handleMouseOut);
});

function handleKeyDown (e) {
  if (Object.keys(callbacksById).length) {
    if (e.keyCode === 83) {
      callbacksById[currentStopwatchId].toggleState();
    } else if (e.keyCode === 82) {
      callbacksById[currentStopwatchId].resetState();
    } else if (e.keyCode === 76) {
      callbacksById[currentStopwatchId].setLap();
    }
  }
}

document.addEventListener('keydown', handleKeyDown);
