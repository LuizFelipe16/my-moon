import styled from 'styled-components';

export const Home = styled.div`
  width: 100vw;
  height: 100vh;

  background-attachment: fixed;
  background: url("/assets/home.png");
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;

  div.container_full_gray {
    width: 100%;
    height: 100%;

    /* background: #1A202C4c; */

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;