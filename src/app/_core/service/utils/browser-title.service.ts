import { Injectable } from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, take, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BrowserTitleService extends Destroyed implements Destroyed {

  private readonly appName: string;
  private pageTitle!: string;
  private browserTitle!: string;

  constructor(private title: Title, private router: Router, private route: ActivatedRoute, private translate: TranslateService) {
    super();
    this.appName = BrowserTitleService.capitalise(this.title.getTitle());
    this.router.events
      .pipe(takeUntil(this.destroyed), filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.title.setTitle(this.appName);
        let r = this.route;
        while (r.firstChild) {
          r = r.firstChild;
        }
        this.setTitleIfExists(r);
      });
  }

  private static capitalise(string: string) {
    if(!string) {
      return string;
    }
    return string[0].toUpperCase() + string.substr(1);
  }

  private setTitleIfExists(r: ActivatedRoute) {
    this.title.setTitle(this.appName);

    r.data.subscribe((data) => {
      if(data.browserTitle) {
        if(data.browserTitle.title) {
          this.translate
            .get(data.browserTitle.title)
            .subscribe((translation) => {
              this.browserTitle = translation;
              this.setTitle(this.browserTitle, data.browserTitle.after);
            });
        } else if (data.browserTitle.inherit && r.parent) {
          this.setTitleIfExists(r.parent);
        }
      }
    });
  }

  private setTitle(pageTitle: string, after?: boolean) {
    this.pageTitle = pageTitle;
    if(this.pageTitle) {
      if(after) {
        this.title.setTitle(`${this.appName} - ${this.pageTitle}`);
      } else {
        this.title.setTitle(`${this.pageTitle} - ${this.appName}`);
      }
    } else {
      this.title.setTitle(this.appName);
    }
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    super.ngOnDestroy();
    this.title.setTitle(this.appName);
  }
}
