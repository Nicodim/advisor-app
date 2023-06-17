import styled, { keyframes } from 'styled-components';

export const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoaderSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #375a7f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 0.8s linear infinite;
`;
