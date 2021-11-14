import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { }

  public registerSvgIcons() {
    this.iconRegistry.addSvgIcon('logo', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/logo.svg'));

    /**
     * Errors
     */
    this.iconRegistry.addSvgIcon('403', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/error/403.svg'));
    this.iconRegistry.addSvgIcon('404', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/error/404.svg'));

    /**
     * Language
     */
    this.iconRegistry.addSvgIcon('fr', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/lang/fr.svg'));
    this.iconRegistry.addSvgIcon('us', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/lang/us.svg'));
  }
}
