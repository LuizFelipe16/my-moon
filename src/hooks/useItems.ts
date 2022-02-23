import { useQuery } from "react-query";
import { api } from "../services/api";

type ListItem = {
  email: string;
  name: string;
  description: string;
  status?: string;
  // type?: string;
  id: string;
}

type GetListItemsResponse = {
  totalCount: number;
  items: ListItem[];
}

export async function getListItems(page: number): Promise<GetListItemsResponse> {
  const { data, headers } = await api.get('/lists', {
    params: {
      page,
    }
  });


  const totalCount = Number(headers['x-total-count']);

  const lists: ListItem[] = data.data;

  return {
    items: lists,
    totalCount
  };
}

export function useItems(page: number) {
  return useQuery(['items', page], () => getListItems(page), {
    staleTime: 1000 * 60 * 10, // 10 seconds
  });
}