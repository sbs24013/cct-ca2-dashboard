import styled from "styled-components";

const Box = styled.div`
  background: white;
  overflow: hidden;
  border-radius: 5px;
  min-height: 200px;
  min-width: 300px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  flex-basis: fit-content;
  flex-direction: column;
  .plot-title {
    margin: 1rem 1rem 0;
    font-size: 1rem;
    text-wrap: balance;
    text-align: center;
  }
`;

export default Box;
