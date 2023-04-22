import { useState } from 'react'

function useTrigger(): [boolean, () => void] {
  const [isTriggered, setTriggered] = useState(false);

  function trigger() {
    setTriggered(oldTriggerState => !oldTriggerState);
  }

  return [
    isTriggered,
    trigger
  ];
}

export default useTrigger;
