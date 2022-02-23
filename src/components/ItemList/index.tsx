import Link from "next/link";
import { ListItemStyled } from "./styles";

interface IItemList {
  item: {
    email: string;
    name: string;
    description: string;
    status?: string;
    // type?: string;
    id: string;
  }
}

export const ItemList = ({ item }: IItemList) => {
  return (
    <ListItemStyled>
      <div className={`list_item_image`}>
        <img src="/capa.jpg" alt={`Capa ${item.name}`} />
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