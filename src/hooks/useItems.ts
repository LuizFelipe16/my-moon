import { useQuery } from "react-query";
import { api } from "../services/api";

type DataListItem = {
  name: string;
  description: string;
  url: string;
  status: string;
  id: string;
  seasons: number;
}

type ListItem = {
  name: string;
  description: string;
  url: string;
  status: string;
  id: string;
  seasons: number;
  seasons_formatted: Array<number>;
}

type GetListItemsResponse = {
  totalCount: number;
  totalCountCompleted: number;
  totalCountNotCompleted: number;
  items: ListItem[];
}

export async function getListItems(page: number): Promise<GetListItemsResponse> {
  const { data, headers } = await api.get('/lists', {
    params: {
      page,
    }
  });

  // const totalCount = Number(headers['x-total-count']);

  const lists: DataListItem[] = data.data;
  const totalCount = lists.length;

  let totalCountCompleted = 0;
  let totalCountNotCompleted = 0;

  const items = lists.map(item => {
    const seasons_formatted = [];

    for (let i = 1; i <= item.seasons; i++) {
      seasons_formatted.push(i);
    }

    if (Boolean(item.status) === true) totalCountCompleted++
    else totalCountNotCompleted++

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      url: item.url,
      status: item.status,
      seasons: item.seasons,
      seasons_formatted: seasons_formatted
    }
  });

  return {
    items: items,
    totalCount,
    totalCountCompleted,
    totalCountNotCompleted
  };
}

export function useItems(page: number) {
  return useQuery(['items', page], () => getListItems(page), {
    staleTime: 1000 * 60 * 10, // 10 seconds
  });
}