import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Destroyed } from '@core/hooks/destroyed';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent extends Destroyed implements OnInit {
  @HostBinding('class.search') isSearch: boolean;

  @Input()
  public label!: string;

  @Input()
  public loading: boolean = false;

  @Input()
  private debounceTime: number = 500;

  @Output()
  public searchValue: EventEmitter<string> = new EventEmitter<string>();

  public searchCtrl: FormControl = new FormControl(null);

  constructor() {
    super();
    this.isSearch = true;
  }

  public ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(debounceTime(this.debounceTime), takeUntil(this.destroyed$)).subscribe(this.searchValue);
  }
}
