import styled from 'styled-components';

export const PostStyled = styled.main`
  width: 100vw;
  min-height: 100vh;
  background: var(--gray-800);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .banner {
    width: 100vw;
    height: 30rem;
    object-fit: cover;
    background: #fff;
  }

  .post {
    width: 55vw;
    height: auto;

    padding: 0.369rem 1.369rem 3.369rem 1.369rem;
    margin-top: 3.5rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    > h1 {
      font-size: 3rem;
      color: var(--gray-100);
      font-weight: bold;

      margin-bottom: 1.25rem;
    }

    .info {
      width: 100%;
      height: auto;

      display: flex;
      flex-direction: row;
      gap: 25px;

      color: var(--gray-100);
      
      div {
        display: flex;
        gap: 8px;
      }

      .last_publication_date {
        font-size: 0.85rem;
        color: var(--gray-100);
      }
    }

    .content {
      width: 100%;

      margin-top: 3.5rem;

      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      h1 {
        font-size: 1.3rem;
        color: var(--gray-100);
        font-weight: bold;

        margin-bottom: 1rem;
      }

      p {
        font-size: 1.1rem;
        color: var(--gray-100);
        font-weight: 100;
      }

      div {
        color: var(--gray-100);
        display: flex;
        flex-direction: column;
        gap: 1.05rem;
      }
    }
  }
`;