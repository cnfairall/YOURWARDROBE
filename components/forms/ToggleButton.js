import { useEffect, useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function IsTopToggle() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    setIsTop(true);
  }, []);
  return (
    <>
      <ToggleButtonGroup
        value={isTop}
        exclusive
        onChange={setIsTop()}
      >
        <ToggleButton
          value={true}
        >
          TOP
        </ToggleButton>
        <ToggleButton
          value="false"
        >
          BOTTOM
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default IsTopToggle;
