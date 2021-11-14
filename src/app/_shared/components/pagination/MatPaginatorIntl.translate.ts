import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorIntlTranslate extends MatPaginatorIntl {

  private static readonly TRANSLATE_KEY_PREFIX = 'shared.paginator.';
  private static readonly ITEMS_PER_PAGE_LABEL = 'items-per-page-label';
  private static readonly FIRST_PAGE_LABEL = 'first-page-label';
  private static readonly LAST_PAGE_LABEL = 'last-page-label';
  private static readonly NEXT_PAGE_LABEL = 'next-page-label';
  private static readonly PREVIOUS_PAGE_LABEL = 'previous-page-label';
  private static readonly RANGE_LABEL = 'range-page-label';

  private rangeLabel: string = '{{ start }} - {{ end }} de {{ length }}'; // Placeholder to remind use what we translate

  constructor(private translate: TranslateService) {
    super();
    this.getAndInitTranslation();
  }

  private getAndInitTranslation(): void {
    this.translate.stream([
      MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.ITEMS_PER_PAGE_LABEL,
      MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.FIRST_PAGE_LABEL,
      MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.LAST_PAGE_LABEL,
      MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.NEXT_PAGE_LABEL,
      MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.PREVIOUS_PAGE_LABEL,
      MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.RANGE_LABEL,
    ]).subscribe(translations => {
      this.itemsPerPageLabel = translations[MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.ITEMS_PER_PAGE_LABEL];
      this.firstPageLabel = translations[MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.FIRST_PAGE_LABEL];
      this.lastPageLabel = translations[MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.LAST_PAGE_LABEL];
      this.nextPageLabel = translations[MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.NEXT_PAGE_LABEL];
      this.previousPageLabel = translations[MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.PREVIOUS_PAGE_LABEL];
      this.rangeLabel = translations[MatPaginatorIntlTranslate.TRANSLATE_KEY_PREFIX + MatPaginatorIntlTranslate.RANGE_LABEL];
      this.changes.next();
    });
  }

  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return this.rangeLabelFormat(0, 0, 0);
    }
    length = Math.max(length, 0);
    const start = page * pageSize;
    const end = start < length ? Math.min(start + pageSize, length) : start + pageSize;
    return this.rangeLabelFormat(start + 1, end, length);
  };

  private rangeLabelFormat(start: number, end: number, length: number) {
    return this.rangeLabel
      .replace('{{ start }}', start.toString())
      .replace('{{ end }}', end.toString())
      .replace('{{ length }}', length.toString());
  }
}
