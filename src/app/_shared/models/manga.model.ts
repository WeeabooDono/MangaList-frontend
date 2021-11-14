import { Genre } from '@shared/models/genre.model';

export interface Manga {
  id: number;
  title: string;
  description: string;
  author: string;
  image: string;
}

export interface MangaDTO {
  title?: string;
  description?: string;
  author?: string;
  image?: string;
  genres?: Genre[];
}

export const pageSizeOptions = [6, 9, 15, 30, 60, 90];
export const defaultPageSize = pageSizeOptions[1];
export const defaultPage = 0;
