/* eslint-disable react/prop-types */
import styled from "styled-components";

const ToggleButtons = ({
  plots = [],
  selectedPlots = [],
  onToggleClick = () => {},
}) => {
  return (
    <ToggleContrainer>
      {plots.map((plot, index) => {
        return (
          <Toggle
            key={plot.title}
            className={selectedPlots.includes(index) ? "active" : "inactive"}
            onClick={() => onToggleClick(index)}
          >
            {plot.title}
          </Toggle>
        );
      })}
    </ToggleContrainer>
  );
};

const ToggleContrainer = styled.div`
  margin-bottom: 10px;
`;

const Toggle = styled.button`
  font-size: small;
  // font-weight: bold;
  border: 1px solid black;
  padding: 4px 8px;
  border-radius: 2px;
  margin: 0 2px 4px;
  cursor: pointer;
  font-weight: bold;

  &.active {
    background: var(--black);
    color: var(--white);
  }

  &.inactive {
    background: var(--light-gray);
    color: var(--black);
    // border-color: transparent;
  }

  &:hover {
    background: var(--dark-green);
    color: var(--white);
  }
`;

export default ToggleButtons;
