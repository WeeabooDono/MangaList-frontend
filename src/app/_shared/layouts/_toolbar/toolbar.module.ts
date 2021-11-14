import { NgModule } from '@angular/core';
import {
  ToolbarComponent,
  ToolbarLeftDirective,
  ToolbarLogoDirective,
  ToolbarNavDirective,
  ToolbarRightDirective,
} from './toolbar.component';
import { AngularMaterialModule } from '@shared/angular-material.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarLeftDirective,
    ToolbarRightDirective,
    ToolbarLogoDirective,
    ToolbarNavDirective,
  ],
  exports: [
    ToolbarComponent,
    ToolbarLeftDirective,
    ToolbarRightDirective,
    ToolbarLogoDirective,
    ToolbarNavDirective],
  imports: [AngularMaterialModule],
})
export class ToolbarModule {
}
