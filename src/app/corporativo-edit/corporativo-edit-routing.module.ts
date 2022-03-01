import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporativoEditComponent } from './corporativo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporativoEditComponent,
    data: {
      title: 'Corporativo'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativoEditRoutingModule { }
