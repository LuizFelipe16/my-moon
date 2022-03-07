import { useQuery } from "react-query";
import { api } from "../services/api";

type Clock = {
  id: string;
  title: string;
  description: string;
  date: string;
  date_formatted: string;
  hours: number;
  minutes: number;
  time: number;
}

type GetClocksResponse = {
  totalCount: number;
  clocks: Clock[];
}

interface getClocksProps {
  page: number;
  id: string;
}

export async function getClocks({ page, id }: getClocksProps): Promise<GetClocksResponse> {
  const { data, headers } = await api.get(`/timers/clocks/${id}`, {
    params: {
      page,
    }
  });

  // const totalCount = Number(headers['x-total-count']);

  const clocks: Clock[] = data.data;
  const totalCount = clocks.length;

  return {
    clocks,
    totalCount
  };
}

export function useClocks(page: number, id: string) {
  return useQuery([`clocks-timer-${id}`, page], () => getClocks({ page, id }), {
    staleTime: 1000 * 60 * 10, // 10 min
  });
}