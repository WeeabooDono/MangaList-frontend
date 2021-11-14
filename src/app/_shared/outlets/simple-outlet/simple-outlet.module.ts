import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleOutletComponent } from '@shared/outlets/simple-outlet/simple-outlet.component';

@NgModule({
  imports: [RouterModule],
  declarations: [SimpleOutletComponent],
  exports: [SimpleOutletComponent],
})
export class SimpleOutletModule {
}
