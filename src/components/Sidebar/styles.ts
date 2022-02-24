import styled from 'styled-components';

export const SidebarComponent = styled.aside`
  width: 9vw;
  height: 100%;
  background: var(--purple-800);
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
    
    font-size: 1.5rem;
    color: var(--gray-100);
    
    background: var(--gray-900);
    cursor: pointer;
    border-radius: 50%;
    padding: 1.5rem;
 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    
    transition: 0.2s;
    
    &:hover {
      color: var(--gray-100);
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      background: var(--purple-500);
    }
  }
`;