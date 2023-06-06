'use strict';

const generateUniqueId = () =>
  Math.floor(Math.random() * Date.now()).toString(16);

export default function createStopwatch (props) {
  let interval = null;

  const stopwatchElement = document.createElement('div');
  stopwatchElement.classList.add('stopwatch');
  stopwatchElement.id = generateUniqueId();
  document.getElementById('root').prepend(stopwatchElement);

  const displayElement = document.createElement('div');
  displayElement.classList.add('stopwatchDisplay');
  displayElement.innerHTML = '0 : 0 : 0 : 0 ';

  const controlPanel = document.createElement('div');
  controlPanel.classList.add('controlPanel');

  stopwatchElement.append(displayElement, controlPanel);

  const toggleButton = document.createElement('button');
  toggleButton.innerHTML = 'Старт';

  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Сброс';

  const lapButton = document.createElement('button');
  lapButton.innerHTML = 'Круг';

  controlPanel.append(toggleButton, resetButton, lapButton);

  let [ms, s, m, h] = [0, 0, 0, 0];

  function displayTimer () {
    ms += 1;
    if (ms === 100) {
      ms = 0;
      s++;
      if (s === 60) {
        s = 0;
        m++;
        if (m === 60) {
          m = 0;
          h++;
        }
      }
    }
    displayElement.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
  }

  function setStopped () {
    toggleButton.innerHTML = 'Старт';
    clearInterval(interval);
    interval = null;
  }

  function toggleState () {
    if (interval) {
      return setStopped();
    }
    toggleButton.innerHTML = 'Стоп';
    interval = setInterval(displayTimer, 10);
  }

  function resetState () {
    setStopped();
    [ms, s, m, h] = [0, 0, 0, 0];
    displayElement.innerHTML = '0 : 0 : 0 : 0 ';
    props?.clearLapList();
  }

  function setLap () {
    // if the stopwatch is stopped then no laps are added
    interval && props?.addListItem(displayElement.innerHTML);
  }

  toggleButton.addEventListener('click', toggleState);
  resetButton.addEventListener('click', resetState);
  lapButton.addEventListener('click', setLap);

  if (props?.setCallbacksById) {
    props.setCallbacksById(stopwatchElement.id, {
      toggleState,
      resetState,
      setLap,
    });
  }
}
