import { useQuery } from "react-query";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from "../services/api";

type ContentItem = {
  title: string;
  description: string;
  date: string;
  date_formatted: string;
  id: string;
  season: number;
}

type GetContentItemsResponse = {
  totalCount: number;
  contents: ContentItem[];
}

interface getContentItemsProps {
  page: number;
  id: string;
}

export async function getContentItems({ page, id }: getContentItemsProps): Promise<GetContentItemsResponse> {
  const { data, headers } = await api.get(`/contents/${id}`, {
    params: {
      page,
    }
  });

  // const totalCount = Number(headers['x-total-count']);

  const contents: ContentItem[] = data.data;
  const totalCount = contents.length;

  const items = contents.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    date: item.date,
    date_formatted: format(
      new Date(item.date),
      "dd 'de' MMM',' yyyy",
      { locale: ptBR }
    ),
    season: Number(item.season),
  }));

  return {
    contents: items,
    totalCount
  };
}

export function useContents(page: number, id: string) {
  return useQuery([`content-items-${id}`, page], () => getContentItems({ page, id }), {
    staleTime: 1000 * 60 * 10, // 10 min
  });
}