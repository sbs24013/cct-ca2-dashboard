// https://cssloaders.github.io/

import styled, { keyframes } from "styled-components";

export default function Loader() {
  return <LoaderContainer className="loader"></LoaderContainer>;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg) scale(0.2);
    border-radius: 10%;
  }
  50% {
    transform: rotate(180deg) scale(1.5);
    border-radius: 50%;
  }
  100% {
    transform: rotate(360deg) scale(0.2);
    border-radius: 10%;
  }
`;

const LoaderContainer = styled.span`
  width: 24px;
  height: 24px;
  background: var(--white);
  border: 2px solid var(--light-gray);
  animation: ${rotate} 1s linear infinite;
`;
