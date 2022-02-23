import styled from 'styled-components';

export const ListItemStyled = styled.div`
    width: 16rem;
    height: 24rem;
    background: var(--purple-500);
    border-radius: 0.5rem;
    padding: 0.5rem;

    margin-left: 0.5rem;
    /* margin-top: 0.8rem; */

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    
    transition: 0.2s;
    
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

      .list_item_image {
        img {
          transform: scale(1.2);
        }
      }
    }

    .list_item_image {
      width: 100%;
      height: 15rem;
      overflow: hidden;
      border-radius: 0.5rem 0.5rem 0 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
  
        transition: 0.2s;
      }
    }

    h1 {
      font-size: 1.4rem;
    }

    p {
      font-size: 1rem;
    }

    button {
      width: 100%;
      height: 2.4rem;
      border-radius: 0.25rem;
      background: var(--gray-900);
      color: var(--purple-500);

      transition: 0.2s;

      &:hover {
        color: var(--gray-100);
        background: var(--purple-800);
      }
    }
`;