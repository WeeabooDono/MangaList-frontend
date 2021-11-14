import { ActivatedRoute, Router } from '@angular/router';
import { Destroyed } from '@core/hooks/destroyed';

export abstract class NavigationRouter extends Destroyed {
  protected constructor(protected router: Router, protected route: ActivatedRoute) {
    super();
  }

  public navigateBack() {
    window.history.back();
  }

  public navigateToHome() {
    this.router.navigate(['/']);
  }
}
