export default function keyboardControl (callbacksById) {
  const allStopwatches = document.querySelectorAll('.stopwatch');

  let currentStopwatchId = allStopwatches[0].id;

  function handleMouseEvent (e) {
    currentStopwatchId = e.target.id;
  }

  allStopwatches.forEach(el => {
    el.addEventListener('mouseenter', handleMouseEvent);
    el.addEventListener('mouseleave', handleMouseEvent);
  });

  function handleKeyDown (e) {
    if (Object.keys(callbacksById).length) {
      if (e.code === 'KeyS') {
        callbacksById[currentStopwatchId].toggleState();
      } else if (e.code === 'KeyR') {
        callbacksById[currentStopwatchId].resetState();
      } else if (e.code === 'KeyL') {
        callbacksById[currentStopwatchId].setLap();
      }
    }
  }

  document.addEventListener('keydown', handleKeyDown);
}
