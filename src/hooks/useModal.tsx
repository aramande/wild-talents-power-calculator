import { useState } from 'react'

function useModal(): [boolean, (state?: boolean) => void] {
  const [show, setShown] = useState(false);

  function toggle(state?: boolean) {
    if(state !== undefined) setShown(state);
    else setShown(oldShowState => !oldShowState);
  }

  return [
    show,
    toggle
  ];
}

export default useModal;
