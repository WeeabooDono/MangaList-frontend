import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Destroyed } from '@core/hooks/destroyed';
import { BrowserTitleService } from '@core/service/utils/browser-title.service';
import { ErrorManagerService } from '@core/service/error/error-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends Destroyed {

  constructor(
    private translate: TranslateService,
    private browserTitleService: BrowserTitleService,
    private errorManagerService: ErrorManagerService,
  ) {
    super();
    this.translate.addLangs(['fr']);
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}
