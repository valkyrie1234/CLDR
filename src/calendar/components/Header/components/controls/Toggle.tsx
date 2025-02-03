import { FC } from 'react';
import { ToggleContainer, Slider, ToggleLabel, StyledToggle } from './styles';

interface IToggle {
    showToggle: boolean;
    toggleRangeMode: () => void;
    range: boolean;
};

const Toggle: FC<IToggle> = ({
    range,
    showToggle,
    toggleRangeMode,
}) => {
  return showToggle && (
    <ToggleContainer>
      <StyledToggle>
        <input
          type="checkbox"
          checked={range}
          onChange={toggleRangeMode}
        />
        <Slider />
      </StyledToggle>
      <ToggleLabel>{range ? "Диапазон" : "Одна дата"}</ToggleLabel>
    </ToggleContainer>
  )
};

export default Toggle;
