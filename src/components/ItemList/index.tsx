import { memo } from 'react';
import Link from "next/link";
import { ListItemStyled } from "./styles";

interface IItemList {
  item: {
    name: string;
    description: string;
    url: string;
    status: string;
    id: string;
    created_at?: string;
  }
}

function ItemListComponent({ item }: IItemList) {
  return (
    <ListItemStyled>
      <div className={`list_item_image`}>
        <img src={!item.url ? "/capa.jpg" : item.url} alt={`Capa ${item.name}`} />
      </div>

      <div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>

      <Link href={`/ViewItemList/${item.id}`} passHref>
        <button type="button">
          Ver
        </button>
      </Link>
    </ListItemStyled>
  );
}

export const ItemList = memo(ItemListComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.item, nextProps.item);
});