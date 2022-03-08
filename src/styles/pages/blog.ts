import styled from 'styled-components';

export const Blog = styled.div`
  width: 100vw;
  min-height: 100vh;

  padding: 5rem;
  background: var(--gray-800);

  background-attachment: fixed;
  background: url("/blog.png");
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;