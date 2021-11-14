import { CriteriaDTO } from '@shared/models/tools/criteria.model';

export interface PagerDTO {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PagedListDTO<T> {
  items: T[];
  total: number;
  pager: PagerDTO;
}

export interface PagedSearchDTO<C extends CriteriaDTO> {
  pager: PagerDTO;
  criteria: C;
}
