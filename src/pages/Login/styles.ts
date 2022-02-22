import styled from 'styled-components';

export const Login = styled.main`
  width: 100vw;
  height: 100vh;

  background-attachment: fixed;
  background: url("/bg-moon.png");
  object-fit: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  div.container_full_gray {
    width: 100%;
    height: 100%;

    background: #1A202CB3;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 100%;
    height: 2.9rem;

    color: var(--purple-600);
    background: var(--gray-900);
    border-radius: 0.26rem;
    border: 0.12rem solid var(--purple-600);

    font-size: 1.1rem;
    font-weight: bold;

    display: flex;
    gap: 0.25rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    transition: 0.2s;

    &:hover {
      color: var(--gray-900);
      background: var(--purple-600);
    }
  }
`;