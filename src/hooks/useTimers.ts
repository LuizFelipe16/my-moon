import { useQuery } from "react-query";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from "../services/api";

type DataResponseTimer = {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

type ListItem = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  date_formatted: string;
}

type GetListItemsResponse = {
  totalCount: number;
  timers: ListItem[];
}

export async function getTimersList(page: number): Promise<GetListItemsResponse> {
  const { data, headers } = await api.get('/timers', {
    params: {
      page,
    }
  });

  // const totalCount = Number(headers['x-total-count']);

  const list: DataResponseTimer[] = data.data;
  const totalCount = list.length;

  const timers = list.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    created_at: item.created_at,
    date_formatted: format(
      new Date(item.created_at),
      "dd 'de' MMM',' yyyy",
      { locale: ptBR }
    ),
  }));

  return {
    timers,
    totalCount,
  };
}

export function useTimers(page: number) {
  return useQuery(['timers', page], () => getTimersList(page), {
    staleTime: 1000 * 60 * 10, // 10 seconds
  });
}