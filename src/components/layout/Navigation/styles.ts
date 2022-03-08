import styled from 'styled-components';

export const Alink = styled.a`
    font-weight: 400;
    font-size: 1.3rem;
    cursor: pointer;

    transition: 0.2s;

    &:hover {
      color: var(--purple-300);
    }

    &:first-child {
      font-weight: 900;
      font-size: 2rem;
    }
    &:last-child {
      width: 12rem;
      text-align: center;
      border-radius: 14rem;
      background: var(--purple-400);
      padding: 0.5rem;
      position: absolute;
      right: 6rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      
      &:hover {
        color: #fff;
        background: var(--purple-500);
      }
    }
`;