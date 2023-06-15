'use strict';

import createStopwatch from './stopwatch.js';
import lapList from './lapList.js';
import keyboardControl from './keyboardControl.js';

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

// enable keyboard control
keyboardControl(callbacksById);
