import styled from 'styled-components';

export const SidebarComponent = styled.aside`
  width: 10vw;
  height: 100%;
  background: var(--gray-700);
  position: relative;
  left: 0;
  top: 0;

  padding: 1rem 0.5rem 1rem 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  .route {
    width: auto;
    height: auto;
    padding: 1.5rem;

    background: var(--gray-900);
    color: var(--gray-100);
    border-radius: 50%;
 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;

    font-size: 1.5rem;
    
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background: var(--purple-500);
      color: var(--gray-100);
    }
  }

`;