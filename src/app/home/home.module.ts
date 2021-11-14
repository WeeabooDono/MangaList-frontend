import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
    ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {
}
