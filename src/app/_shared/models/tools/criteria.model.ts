export interface CriteriaDTO { }

export interface MangaCriteriaDTO extends CriteriaDTO {
  title: string;
}

export interface GenreCriteriaDTO extends CriteriaDTO {
  name: string;
}
