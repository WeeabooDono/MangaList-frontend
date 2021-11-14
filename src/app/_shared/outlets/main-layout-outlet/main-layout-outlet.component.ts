import { BaseOutlet } from '../base-outlet';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main-layout-outlet',
  templateUrl: 'main-layout-outlet.component.html',
})
export class MainLayoutOutletComponent extends BaseOutlet {

  constructor(protected route: ActivatedRoute, protected cd: ChangeDetectorRef) {
    super(route, cd);
  }

}
